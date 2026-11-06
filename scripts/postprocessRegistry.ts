/**
 * Post-processes the shadcn-style registry JSON that `jsrepo build` writes to static/r so that
 * it installs correctly with `shadcn-svelte add <url>` (v1.8):
 *
 * 1. `registryDependencies` use bare names ("utils", "spinner"), which the CLI resolves against
 *    the shadcn-svelte registry. They are rewritten to absolute URLs of this registry.
 * 2. `target` is "$lib/components/ui/...", but the CLI joins it onto the alias of the item type
 *    (ui → components/ui, hook → hooks, lib → lib, block/component → components), producing
 *    `ui/$lib/...`. Targets are rewritten relative to that alias.
 * 3. File contents use the `#lib` / `#assets` Node subpath imports of this repo, which do not
 *    exist in consumer projects. They are rewritten to `$lib`, which the CLI maps to the
 *    consumer's own lib alias.
 *
 * Run by `pnpm gen:registry` after `jsrepo build`. Env: REGISTRY_URL (default production URL),
 * REGISTRY_DIR (default static/r).
 */
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const baseUrl = (process.env.REGISTRY_URL ?? 'https://cossui-svelte.com/r').replace(/\/$/, '');
const dir = resolve(process.env.REGISTRY_DIR ?? 'static/r');

/** Prefix (under src/lib) that each item type's CLI alias points at. */
const aliasPrefix: Record<string, string> = {
  'registry:ui': 'components/ui/',
  'registry:hook': 'hooks/',
  'registry:lib': '',
  'registry:block': 'components/',
  'registry:component': 'components/'
};

type RegistryFile = { type?: string; path: string; target?: string; content?: string };
type RegistryItem = { type?: string; registryDependencies?: string[]; files?: RegistryFile[] };

function toTarget(itemType: string, target: string): string {
  // "$assets/x.jpg" → "assets/x.jpg"; "$lib/a/b" → "a/b"
  const rel = target.replace(/^\$assets\//, 'assets/').replace(/^\$lib\//, '');
  const prefix = aliasPrefix[itemType];
  if (prefix === undefined) throw new Error(`unsupported registry item type: ${itemType}`);
  return prefix && rel.startsWith(prefix) ? rel.slice(prefix.length) : rel;
}

const toConsumerImports = (content: string) =>
  content.replace(/(['"])#lib\//g, '$1$$lib/').replace(/(['"])#assets\//g, '$1$$lib/assets/');

function processItem(item: RegistryItem) {
  if (item.registryDependencies) {
    item.registryDependencies = item.registryDependencies.map((dep) =>
      /^https?:\/\//.test(dep) ? dep : `${baseUrl}/${dep}.json`
    );
  }
  for (const file of item.files ?? []) {
    const type = file.type ?? item.type ?? '';
    if (file.target?.startsWith('$')) file.target = toTarget(type, file.target);
    if (file.content) file.content = toConsumerImports(file.content);
  }
}

let changed = 0;
for (const name of await readdir(dir)) {
  if (!name.endsWith('.json')) continue;
  const path = join(dir, name);
  const json = JSON.parse(await readFile(path, 'utf8')) as RegistryItem & { items?: RegistryItem[] };
  if (name === 'registry.json') json.items?.forEach(processItem);
  else if (json.files) processItem(json);
  else continue;
  await writeFile(path, `${JSON.stringify(json, null, 2)}\n`);
  changed++;
}
console.log(`postprocessRegistry: rewrote ${changed} files in ${dir}`);
