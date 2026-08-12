/// <reference types="node" />
import fs from 'node:fs/promises';
import path from 'node:path';
import {custom_components_metadata} from '../src/lib/components/ui/custom-component-metadata';

export interface RegistryUIEntry {
    name: string;
    description: string;
    folder: string; // relative to src/lib/components/ui/
    category: "ui" | "origin-ui" | "bits-ui" | "shadcn-ui" | "extra"; // for now, just a simple category to separate "core" UI components from extra ones
    isnew: boolean; // wether this is a new component that should be highlighted in the UI
    istodo: boolean; // wether this is an identified component that needs to be worked on
    npmDependencies?: string[];
    registryDependencies?: string[];
}

export type RegistryUiData = Record<string, RegistryUIEntry>;


const SOURCE_DIR = path.resolve('src/lib/components/ui');

const writeFlag = process.argv.includes('-w');
const writeArgIdx = process.argv.indexOf('-w');
const outputFile = writeArgIdx !== -1 && process.argv[writeArgIdx + 1] && !process.argv[writeArgIdx + 1].startsWith('-')
    ? process.argv[writeArgIdx + 1]
    : 'registry-components.ts';

function toName(id: string): string {
    return id
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');
}

async function fileExists(path: string): Promise<boolean> {
    try {
        await fs.access(path);
        return true;
    } catch {
        return false;
    }
}

async function findSourceFiles(dir: string): Promise<string[]> {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const files: string[] = [];
    for (const entry of entries) {
        const entryPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            files.push(...(await findSourceFiles(entryPath)));
        } else if (
            entry.isFile() &&
            /\.(svelte|ts)$/.test(entry.name) &&
            !entry.name.endsWith('.d.ts') &&
            !/\.(test|spec)\.(svelte\.)?ts$/.test(entry.name)
        ) {
            files.push(entryPath);
        }
    }
    return files;
}

// Discovers a component's real dependencies by scanning every source file in its
// folder for import statements:
// - `$lib/components/ui/<slug>` imports (other than the component's own) become registryDependencies
// - `$lib/hooks/<slug>` imports become registryDependencies
// - any other bare (non-relative, non-$lib, non-$app) specifier becomes an npmDependency,
//   except Svelte's own built-in modules (`svelte`, `svelte/*`)
// Strips comments before scanning so text like `from "px"` inside a code comment
// isn't picked up as a real import specifier. The negative lookbehind keeps `://`
// (e.g. inside URLs in string literals) from being treated as a line comment.
function stripComments(source: string): string {
    return source.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(?<!:)\/\/.*$/gm, '');
}

async function discoverDeps(
    componentDir: string,
    selfSlug: string
): Promise<{ npmDependencies: string[]; registryDependencies: string[] }> {
    const files = await findSourceFiles(componentDir);
    const specifiers: string[] = [];
    for (const filePath of files) {
        const source = stripComments(await fs.readFile(filePath, 'utf-8'));
        specifiers.push(
            ...[...source.matchAll(/from\s+['"]([^'"]+)['"]/g)].map((m) => m[1]),
            ...[...source.matchAll(/import\s+['"]([^'"]+)['"]/g)].map((m) => m[1])
        );
    }

    const npmDependencies = new Set<string>();
    const registryDependencies = new Set<string>();

    for (const specifier of specifiers) {
        if (specifier.startsWith('$lib/components/ui/')) {
            const slug = specifier.slice('$lib/components/ui/'.length).split('/')[0];
            if (slug && slug !== selfSlug) registryDependencies.add(slug);
        } else if (specifier.startsWith('$lib/hooks/')) {
            const slug = specifier
                .slice('$lib/hooks/'.length)
                .split('/')[0]
                .replace(/\.svelte\.(js|ts)$/, '')
                .replace(/\.(js|ts)$/, '');
            if (slug) registryDependencies.add(slug);
        } else if (specifier.startsWith('$') || specifier.startsWith('.')) {
            continue; // app-internal alias (e.g. $lib/utils, $app/*) or relative import
        } else if (specifier === 'svelte' || specifier.startsWith('svelte/')) {
            continue; // framework builtin, always assumed present
        } else {
            const match = specifier.match(/^(@[^/]+\/[^/]+|[^/]+)/);
            if (match) npmDependencies.add(match[1]);
        }
    }

    return {
        npmDependencies: [...npmDependencies].sort(),
        registryDependencies: [...registryDependencies].sort()
    };
}

// Merges a base list with a custom increment: plain values are added (if not already
// present), values prefixed with '-' remove the matching base value. Lets
// custom-component-metadata.ts correct a false positive/negative from source scanning.
function mergeList(base: string[], custom: string[] | undefined): string[] {
    if (!custom) return base;
    const result = [...base];
    for (const value of custom) {
        if (!value) continue;
        if (value.startsWith('-')) {
            const index = result.indexOf(value.slice(1));
            if (index !== -1) result.splice(index, 1);
        } else if (!result.includes(value)) {
            result.push(value);
        }
    }
    return result.sort();
}

async function scanExamples(): Promise<void> {
    const categories = await fs.readdir(SOURCE_DIR, { withFileTypes: true });
    const components: RegistryUiData = {};

    for (const entry of categories.sort((a, b) => a.name.localeCompare(b.name))) {
        if (!entry.isDirectory()) continue;

        const category = entry.name;
        const componentDir = path.join(SOURCE_DIR, category);
        const indexPath = path.join(componentDir, "index.ts");
        if (await fileExists(indexPath)) {

            const meta = custom_components_metadata[category];
            const discovered = await discoverDeps(componentDir, category);
            const component: RegistryUIEntry = {
                name: toName(category),
                category: meta?.category ?? 'ui',
                description: meta?.description ?? '',
                folder: `${category}`,
                isnew: meta?.isnew ?? false,
                istodo: meta?.istodo ?? false,
                npmDependencies: mergeList(discovered.npmDependencies, meta?.npmDependencies),
                registryDependencies: mergeList(discovered.registryDependencies, meta?.registryDependencies)
            };

            components[category] = component;

        }
    }

    const json = JSON.stringify(components, null, 4)
    const output = `
/**
 * This file is auto-generated by scripts/createUiRegistry.ts
 * Do not edit this file directly.
 * To update, edit the source files in scripts/user-registry-ui-metadata.ts and run: pnpm generate:registry
 * !!!!!!!!!!
 */
export interface RegistryUIEntry {
    name: string;
    description: string;
    folder: string; // relative to src/lib/components/ui/
    category: "ui" | "origin-ui" | "bits-ui" | "shadcn-ui" | "extra"; // for now, just a simple category to separate "core" UI components from extra ones
    isnew: boolean; // whether this is a new component that should be highlighted in the UI
    istodo: boolean; // wether this is an identified component that needs to be worked on
    npmDependencies: string[];
    registryDependencies: string[];
}

export type RegistryUiData = Record<string, RegistryUIEntry>;
const allComponents: RegistryUiData = ${json};
export { allComponents };
`;

    if (writeFlag) {
        await fs.writeFile(outputFile, output);
        console.log(`Written to ${outputFile}`);
    } else {
        console.log(output);
    }
}

scanExamples().catch((err) => {
    console.error(err);
    process.exit(1);
});
