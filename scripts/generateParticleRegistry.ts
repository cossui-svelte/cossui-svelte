/// <reference types="node" />
import fs from 'node:fs/promises';
import path from 'node:path';
import cossuiRegistry from './registry.json' with { type: 'json' };
import { custom_particle_metadata } from './custom-particule-metadata'

const OUTPUT = path.resolve('src/lib/registry/generated-metadata.ts');

interface RegistryItem {
  name: string;
  description?: string;
  categories?: string[];
  dependencies?: string[];
  registryDependencies?: string[];
  meta?: { className?: string; colSpan?: number }; // source field names in registry.json
  type?: string;
}

const particles = (cossuiRegistry.items as RegistryItem[]).filter((item) =>
  item.name?.startsWith('p-')
);

function renderEntry(item: RegistryItem): string {
  const lines: string[] = [];
  if (item.description) lines.push(`    description: ${JSON.stringify(item.description)}`);
  if (item.categories?.length)
    lines.push(`    tags: ${JSON.stringify(item.categories.map((t) => t.replace(/ /g, '-')))}`);
  if (item.dependencies?.length) lines.push(`    npmDependencies: ${JSON.stringify(item.dependencies)}`);
  if (item.registryDependencies?.length)
    lines.push(`    registryDependencies: ${JSON.stringify(item.registryDependencies.map((d) => d.replace(/^@coss\//, '')))}`);
  if (item.meta?.className || item.meta?.colSpan) {
    const metaParts: string[] = [];
    if (item.meta.className) metaParts.push(`class: ${JSON.stringify(item.meta.className)}`);
    if (item.meta.colSpan) metaParts.push(`colSpan: ${item.meta.colSpan}`);
    lines.push(`    meta: { ${metaParts.join(', ')} }`);
  }
  return `  ${JSON.stringify(item.name)}: {\n${lines.join(',\n')}\n  }`;
}

type CustomItem = { description?: string; tags?: string[]; registryDependencies?: string[]; meta?: { class?: string; colSpan?: number } };

function renderCustomEntry(name: string, item: CustomItem): string {
  const lines: string[] = [];
  if (item.description) lines.push(`    description: ${JSON.stringify(item.description)}`);
  if (item.tags?.length) lines.push(`    tags: ${JSON.stringify(item.tags)}`);
  if (item.registryDependencies?.length)
    lines.push(`    registryDependencies: ${JSON.stringify(item.registryDependencies)}`);
  if (item.meta) {
    const metaParts: string[] = [];
    if (item.meta.class) metaParts.push(`class: ${JSON.stringify(item.meta.class)}`);
    if (item.meta.colSpan) metaParts.push(`colSpan: ${item.meta.colSpan}`);
    lines.push(`    meta: { ${metaParts.join(', ')} }`);
  }
  return `  ${JSON.stringify(name)}: {\n${lines.join(',\n')}\n  }`;
}

const customEntries = Object.entries(custom_particle_metadata).map(([name, item]) =>
  renderCustomEntry(name, item as CustomItem)
);

const body = [...particles.map(renderEntry), ...customEntries].join(',\n');

const output = `// this file is generated from one of the /scripts/
import type { ParticleMetaDefinition } from './registry-particles';

export const metadata: Record<string, ParticleMetaDefinition> = {
${body}
};
`;



await fs.writeFile(OUTPUT, output, 'utf-8');
console.log(`Written ${particles.length} entries to ${OUTPUT}`);
