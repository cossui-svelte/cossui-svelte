/// <reference types="node" />
import fs from 'node:fs/promises';
import path from 'node:path';
import cossuiRegistry from './registry.json' with { type: 'json' };
import { custom_particle_metadata } from './custom-particule-metadata'

const OUTPUT = path.resolve('src/lib/registry/generated-particle-metadata.ts');

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

function toMergedEntry(item: RegistryItem): MergedEntry {
  const entry: MergedEntry = {};
  if (item.description) entry.description = item.description;
  if (item.categories?.length) entry.tags = item.categories.map((t) => t.replace(/ /g, '-'));
  if (item.dependencies?.length) entry.npmDependencies = item.dependencies;
  if (item.registryDependencies?.length)
    entry.registryDependencies = item.registryDependencies.map((d) => d.replace(/^@coss\//, ''));
  if (item.meta?.className || item.meta?.colSpan) {
    entry.meta = {};
    if (item.meta.className) entry.meta.class = item.meta.className;
    if (item.meta.colSpan) entry.meta.colSpan = item.meta.colSpan;
  }
  return entry;
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

const orderedNames: string[] = [];
const entriesByName = new Map<string, MergedEntry>();

for (const item of cossuiRegistry.items as RegistryItem[]) {
  if (!item.name?.startsWith('p-')) continue;
  orderedNames.push(item.name);
  entriesByName.set(item.name, toMergedEntry(item));
}

// Merges a base list with a custom increment: plain values are added (if not
// already present), values prefixed with '-' remove the matching base value.
function mergeList(base: string[] | undefined, custom: string[] | undefined): string[] | undefined {
  if (!custom) return base;
  const result = base ? [...base] : [];
  for (const value of custom) {
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

// custom_particle_metadata is an increment on top of the registry-derived entries:
// it adds particles that don't exist in registry.json, and augments/overrides
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

const body = orderedNames.map((name) => renderEntry(name, entriesByName.get(name)!)).join(',\n');

const output = `// this file is generated from one of the /scripts/
import type { ParticleMetaDefinition } from './registry-particles';

export const metadata: Record<string, ParticleMetaDefinition> = {
${body}
};
`;

await fs.writeFile(OUTPUT, output, 'utf-8');
console.log(`Written ${orderedNames.length} entries to ${OUTPUT}`);
