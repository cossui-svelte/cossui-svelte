import type { Component } from 'svelte';
import { metadata } from './generated-particle-metadata';

// this one is typically done by hand
export type ParticleMetaDefinition = {
  description?: string;
  tags?: string[];
  npmDependencies?: string[];
  registryDependencies?: string[];
  meta?: { class?: string; colSpan?: number };
};

// this one is ParticleMetaDefinition enriched
export interface RegistryParticuleEntry {
  component: () => Promise<{ default: Component }>;
  description: string;
  // relative to src/lib/components/
  file: string;
  folder: string;
  meta?: { class?: string; colSpan?: number };
  name: string;
  npmDependencies: string[];
  registryDependencies: string[];
  // optional tags for categorization
  tags: string[];
}

export type RegistryParticuleData = Record<string, RegistryParticuleEntry>;

function idToName(id: string): string {
  const match = id.match(/^p-(.*)-(\d+)$/);
  if (!match) return id;
  const [, category, num] = match;
  return (
    category
      .split('-')
      .map((w, i) => (i === 0 ? w[0].toUpperCase() + w.slice(1) : w))
      .join(' ') +
    ' ' +
    num
  );
}

const modules = import.meta.glob<{ default: Component }>('../components/particles/**/p-*.svelte');

const allParticles: RegistryParticuleData = Object.fromEntries(
  Object.entries(modules).map(([path, loader]) => {
    const id = path.match(/\/([^/]+)\.svelte$/)?.[1] ?? '';
    const folder = path.match(/\/([^/]+)\/[^/]+\.svelte$/)?.[1] ?? '';
    const entry = (metadata[id] ?? {}) as unknown as RegistryParticuleEntry;
    entry.component = loader;
    entry.description ??= '';
    entry.file = id;
    entry.folder = folder;
    entry.name = idToName(id);
    entry.npmDependencies ??= [];
    entry.registryDependencies ??= [];
    entry.tags ??= [];
    return [id, entry];
  })
);

export { allParticles };
