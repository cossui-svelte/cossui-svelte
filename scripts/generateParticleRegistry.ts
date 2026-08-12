/// <reference types="node" />
import fs from 'node:fs/promises';
import path from 'node:path';
import cossuiRegistry from './registry.json' with { type: 'json' };
import { custom_particle_metadata } from '../src/lib/components/particles/custom-particle-metadata'

const OUTPUT = path.resolve('src/lib/registry/generated-particle-metadata.ts');
const PARTICLES_DIR = path.resolve('src/lib/components/particles');

// Applied to every particle that doesn't already have a meta.class from
// registry.json or custom_particle_metadata — covers the common preview sizing case.
const DEFAULT_META = {
  class: '**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]'
};

interface RegistryItem {
  name: string;
  description?: string;
  categories?: string[];
  dependencies?: string[];
  registryDependencies?: string[];
  meta?: { className?: string; colSpan?: number }; // source field names in registry.json
  type?: string;
}

interface MergedEntry {
  description?: string;
  tags?: string[];
  npmDependencies?: string[];
  registryDependencies?: string[];
  meta?: { class?: string; colSpan?: number };
}

type CustomItem = MergedEntry;

// Descriptive fields only (description/tags/meta) — dependency fields are
// discovered from the component source instead of trusted from registry.json,
// since that file mirrors an upstream React registry and its dependency data
// doesn't always match this Svelte port (e.g. react-only packages, hooks that
// don't exist here).
function toDescriptiveEntry(item: RegistryItem): MergedEntry {
  const entry: MergedEntry = {};
  if (item.description) entry.description = item.description;
  if (item.categories?.length) entry.tags = item.categories.map((t) => t.replace(/ /g, '-'));
  if (item.meta?.className || item.meta?.colSpan) {
    entry.meta = {};
    if (item.meta.className) entry.meta.class = item.meta.className;
    if (item.meta.colSpan) entry.meta.colSpan = item.meta.colSpan;
  }
  return entry;
}

// registry.json's own dependency data, used only as a fallback when a
// registry.json particle has no matching source file on disk to scan.
function fallbackDeps(item: RegistryItem): Pick<MergedEntry, 'npmDependencies' | 'registryDependencies'> {
  const deps: Pick<MergedEntry, 'npmDependencies' | 'registryDependencies'> = {};
  if (item.dependencies?.length) deps.npmDependencies = item.dependencies;
  if (item.registryDependencies?.length)
    deps.registryDependencies = item.registryDependencies.map((d) => d.replace(/^@coss\//, ''));
  return deps;
}

async function findParticleFiles(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await findParticleFiles(entryPath)));
    } else if (entry.isFile() && /^p-.*\.svelte$/.test(entry.name)) {
      files.push(entryPath);
    }
  }
  return files;
}

// Discovers real dependencies by scanning the particle's own import statements:
// - `$lib/components/ui/<slug>` imports become registryDependencies
// - `$lib/hooks/<slug>` imports become registryDependencies
// - any other bare (non-relative, non-$lib) specifier becomes an npmDependency,
//   except Svelte's own built-in modules (`svelte`, `svelte/*`)
async function discoverDeps(
  filePath: string
): Promise<Pick<MergedEntry, 'npmDependencies' | 'registryDependencies'>> {
  const source = await fs.readFile(filePath, 'utf-8');
  const specifiers = [
    ...source.matchAll(/from\s+['"]([^'"]+)['"]/g),
    ...source.matchAll(/import\s+['"]([^'"]+)['"]/g)
  ].map((m) => m[1]);

  const npmDependencies = new Set<string>();
  const registryDependencies = new Set<string>();

  for (const specifier of specifiers) {
    if (specifier.startsWith('$lib/components/ui/')) {
      const slug = specifier.slice('$lib/components/ui/'.length).split('/')[0];
      if (slug) registryDependencies.add(slug);
    } else if (specifier.startsWith('$lib/hooks/')) {
      const slug = specifier.slice('$lib/hooks/'.length).split('/')[0].replace(/\.svelte$/, '');
      if (slug) registryDependencies.add(slug);
    } else if (specifier.startsWith('$') || specifier.startsWith('.')) {
      continue; // app-internal alias or relative import
    } else if (specifier === 'svelte' || specifier.startsWith('svelte/')) {
      continue; // framework builtin, always assumed present
    } else {
      const match = specifier.match(/^(@[^/]+\/[^/]+|[^/]+)/);
      if (match) npmDependencies.add(match[1]);
    }
  }

  const deps: Pick<MergedEntry, 'npmDependencies' | 'registryDependencies'> = {};
  if (npmDependencies.size) deps.npmDependencies = [...npmDependencies].sort();
  if (registryDependencies.size) deps.registryDependencies = [...registryDependencies].sort();
  return deps;
}

function renderEntry(name: string, item: MergedEntry): string {
  const lines: string[] = [];
  if (item.description) lines.push(`    description: ${JSON.stringify(item.description)}`);
  if (item.tags?.length) lines.push(`    tags: ${JSON.stringify(item.tags)}`);
  if (item.npmDependencies?.length)
    lines.push(`    npmDependencies: ${JSON.stringify(item.npmDependencies)}`);
  if (item.registryDependencies?.length)
    lines.push(`    registryDependencies: ${JSON.stringify(item.registryDependencies)}`);
  if (item.meta?.class || item.meta?.colSpan) {
    const metaParts: string[] = [];
    if (item.meta.class) metaParts.push(`class: ${JSON.stringify(item.meta.class)}`);
    if (item.meta.colSpan) metaParts.push(`colSpan: ${item.meta.colSpan}`);
    lines.push(`    meta: { ${metaParts.join(', ')} }`);
  }
  return `  ${JSON.stringify(name)}: {\n${lines.join(',\n')}\n  }`;
}

// Merges a base list with a custom increment: plain values are added (if not
// already present), values prefixed with '-' remove the matching base value.
function mergeList(base: string[] | undefined, custom: string[] | undefined): string[] | undefined {
  if (!custom) return base;
  const result = base ? [...base] : [];
  for (const value of custom) {
    if (!value) continue; // guards against stray empty slots from hand-edited arrays, e.g. [, 'map']
    if (value.startsWith('-')) {
      const target = value.slice(1);
      const index = result.indexOf(target);
      if (index !== -1) result.splice(index, 1);
    } else if (!result.includes(value)) {
      result.push(value);
    }
  }
  return result.length ? result : undefined;
}

const orderedNames: string[] = [];
const entriesByName = new Map<string, MergedEntry>();

for (const item of cossuiRegistry.items as RegistryItem[]) {
  if (!item.name?.startsWith('p-')) continue;
  orderedNames.push(item.name);
  entriesByName.set(item.name, toDescriptiveEntry(item));
}

const particleFiles = await findParticleFiles(PARTICLES_DIR);
const fileById = new Map(particleFiles.map((filePath) => [path.basename(filePath, '.svelte'), filePath]));

// Any particle that exists on disk but isn't in registry.json yet still needs an entry.
for (const id of fileById.keys()) {
  if (!entriesByName.has(id)) {
    orderedNames.push(id);
    entriesByName.set(id, {});
  }
}

for (const name of orderedNames) {
  const filePath = fileById.get(name);
  const entry = entriesByName.get(name)!;
  const deps = filePath
    ? await discoverDeps(filePath)
    : fallbackDeps((cossuiRegistry.items as RegistryItem[]).find((i) => i.name === name) ?? { name });
  if (!filePath) console.warn(`! ${name}: no source file found, falling back to registry.json dependencies`);
  entriesByName.set(name, { ...entry, ...deps });
}

// custom_particle_metadata is an increment on top of the discovered/registry-derived
// entries: it adds particles that don't exist elsewhere, and augments/overrides
// fields on particles that do. List fields (tags, npmDependencies,
// registryDependencies) are merged via mergeList rather than replaced.
for (const [name, item] of Object.entries(custom_particle_metadata as Record<string, CustomItem>)) {
  const existing = entriesByName.get(name);
  if (existing) {
    entriesByName.set(name, {
      ...existing,
      ...item,
      tags: mergeList(existing.tags, item.tags),
      npmDependencies: mergeList(existing.npmDependencies, item.npmDependencies),
      registryDependencies: mergeList(existing.registryDependencies, item.registryDependencies)
    });
  } else {
    orderedNames.push(name);
    entriesByName.set(name, item);
  }
}

// Every particle gets a baseline tag derived from its own id (e.g. 'p-aspect-ratio-2' ->
// 'aspect-ratio'), merged in alongside any registry.json/custom tags. This guarantees every
// particle is filterable by its own component name even when it has no upstream categories
// (e.g. coss-only particles that aren't in registry.json).
for (const name of orderedNames) {
  const slugTag = name.replace(/^p-/, '').replace(/-\d+$/, '');
  const entry = entriesByName.get(name)!;
  entry.tags = mergeList(entry.tags, [slugTag]);
  if (!entry.meta?.class) entry.meta = { ...DEFAULT_META, ...entry.meta };
}

const body = orderedNames.map((name) => renderEntry(name, entriesByName.get(name)!)).join(',\n');

const output = `// this file is generated from one of the /scripts/
import type { ParticleMetaDefinition } from './registry-particles';

export const metadata: Record<string, ParticleMetaDefinition> = {
${body}
};
`;

await fs.writeFile(OUTPUT, output, 'utf-8');
console.log(`Written ${orderedNames.length} entries to ${OUTPUT}`);
