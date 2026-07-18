/// <reference types="node" />
/**
 * Dynamic registry metadata builder.
 *
 * Scans src/lib/components/ui/* and, for every component that has an index.ts,
 * derives (by static analysis, not manual curation):
 *   - name:                the folder name
 *   - categories:           the component's own name plus any other
 *                           $lib/components/ui/* components it references
 *   - files:                every source file reachable by following the
 *                           import/re-export graph starting at index.ts
 *   - registryDependencies: other $lib/components/ui/* components and other
 *                           vendored $lib/* modules referenced by those files
 *                           (reported as "@coss/<name>")
 *   - dependencies:         external npm packages referenced by those files
 *
 * Output shape mirrors the "registry:ui" items found in scripts/registry.json.
 *
 * Usage:
 *   tsx scripts/generateUiRegistryMeta.ts            # print JSON to stdout
 *   tsx scripts/generateUiRegistryMeta.ts -w [file]   # write to file (default: scripts/ui-registry-meta.json)
 */
import fs from 'node:fs/promises';
import path from 'node:path';

const SOURCE_DIR = path.resolve('src/lib/components/ui');
const UI_IMPORT_PREFIX = '$lib/components/ui/';
const SOURCE_EXTENSIONS = ['.ts', '.svelte', '.js'];

interface RegistryFile {
	path: string;
	type: 'registry:ui';
}

interface RegistryUiMetaEntry {
	name: string;
	type: 'registry:ui';
	categories: string[];
	files: RegistryFile[];
	registryDependencies?: string[];
	dependencies?: string[];
}

async function fileExists(p: string): Promise<boolean> {
	try {
		await fs.access(p);
		return true;
	} catch {
		return false;
	}
}

/** Resolve a relative import specifier to an actual file on disk. */
async function resolveRelative(fromFile: string, specifier: string): Promise<string | null> {
	const base = path.resolve(path.dirname(fromFile), specifier);
	const candidates = [base, ...SOURCE_EXTENSIONS.map((ext) => base + ext)];

	// `./chart-utils.js` should also resolve to the `.ts` source file it was compiled from.
	if (base.endsWith('.js')) {
		candidates.push(base.slice(0, -3) + '.ts');
	}

	for (const candidate of candidates) {
		if (await fileExists(candidate)) return candidate;
	}
	return null;
}

/** Extract every module specifier referenced via `import`/`export ... from` in a file. */
function extractSpecifiers(content: string): string[] {
	const specifiers = new Set<string>();
	const fromRegex = /\bfrom\s*['"]([^'"]+)['"]/g;
	const sideEffectRegex = /^\s*import\s*['"]([^'"]+)['"]/gm;

	for (const match of content.matchAll(fromRegex)) specifiers.add(match[1]);
	for (const match of content.matchAll(sideEffectRegex)) specifiers.add(match[1]);

	return [...specifiers];
}

function toPackageName(specifier: string): string {
	const segments = specifier.split('/');
	return specifier.startsWith('@') ? segments.slice(0, 2).join('/') : segments[0];
}

async function analyzeComponent(componentDir: string, componentName: string): Promise<RegistryUiMetaEntry> {
	const indexPath = path.join(componentDir, 'index.ts');

	const visitedFiles = new Set<string>();
	const uiCategories = new Set<string>();
	const registryDependencies = new Set<string>();
	const dependencies = new Set<string>();
	const queue: string[] = [indexPath];

	while (queue.length > 0) {
		const file = queue.shift()!;
		if (visitedFiles.has(file)) continue;
		visitedFiles.add(file);

		const content = await fs.readFile(file, 'utf-8');

		for (const specifier of extractSpecifiers(content)) {
			if (specifier.startsWith('.')) {
				const resolved = await resolveRelative(file, specifier);
				if (resolved && resolved.startsWith(componentDir) && !visitedFiles.has(resolved)) {
					queue.push(resolved);
				}
				continue;
			}

			if (specifier.startsWith(UI_IMPORT_PREFIX)) {
				const depName = specifier.slice(UI_IMPORT_PREFIX.length).split('/')[0];
				if (depName && depName !== componentName) {
					registryDependencies.add(depName);
					uiCategories.add(depName);
				}
				continue;
			}

			// other top-level $lib/* folders are vendored internal modules (e.g. $lib/vaul,
			// $lib/varsel). They're reported as registryDependencies
			// but aren't ui categories, so they don't feed into `categories` below.
			// $lib/utils is the one exception: a single ubiquitous helper assumed always present.
			if (specifier.startsWith('$lib/')) {
				const depName = specifier
					.slice('$lib/'.length)
					.split('/')[0]
					.replace(/\.(ts|js)$/, '');
				if (depName && depName !== 'utils') registryDependencies.add(depName);
				continue;
			}

			// sveltekit internals, not applicable to portable ui components
			if (specifier.startsWith('$app/') || specifier.startsWith('$env/')) continue;

			// svelte itself is an implicit peer dependency, not worth reporting
			if (specifier === 'svelte' || specifier.startsWith('svelte/')) continue;

			dependencies.add(toPackageName(specifier));
		}
	}

	const files: RegistryFile[] = [
		{ path: path.relative(process.cwd(), componentDir).split(path.sep).join('/'), type: 'registry:ui' }
	];

	const categories = [componentName, ...[...uiCategories].sort()];

	const entry: RegistryUiMetaEntry = { name: componentName, type: 'registry:ui', categories, files };
	if (dependencies.size) entry.dependencies = [...dependencies].sort();
	if (registryDependencies.size)
		entry.registryDependencies = [...registryDependencies].sort().map((d) => `@coss/${d}`);

	return entry;
}

async function main(): Promise<void> {
	const writeFlag = process.argv.includes('-w');
	const writeArgIdx = process.argv.indexOf('-w');
	const outputFile =
		writeArgIdx !== -1 && process.argv[writeArgIdx + 1] && !process.argv[writeArgIdx + 1].startsWith('-')
			? process.argv[writeArgIdx + 1]
			: 'scripts/ui-registry-meta.json';

	const entries: RegistryUiMetaEntry[] = [];
	const dirents = await fs.readdir(SOURCE_DIR, { withFileTypes: true });

	for (const dirent of dirents.sort((a, b) => a.name.localeCompare(b.name))) {
		if (!dirent.isDirectory()) continue;

		const componentDir = path.join(SOURCE_DIR, dirent.name);
		if (!(await fileExists(path.join(componentDir, 'index.ts')))) continue;

		entries.push(await analyzeComponent(componentDir, dirent.name));
	}

	const json = JSON.stringify(entries, null, 2);

	if (writeFlag) {
		await fs.writeFile(outputFile, json + '\n');
		console.log(`Written ${entries.length} entries to ${outputFile}`);
	} else {
		console.log(json);
	}
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
