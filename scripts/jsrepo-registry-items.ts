/// <reference types="node" />
/**
 * Builds jsrepo {@link RegistryItem} entries from the components tracked in
 * `src/lib/registry/generated-registry-components.ts` (kept in sync via
 * `pnpm generate:registry`), sourced from `src/lib/components/ui`.
 * Used by jsrepo.config.ts (dynamic registry) — run `pnpm exec jsrepo build`.
 */
import { readdir, readFile, stat } from 'node:fs/promises';
import { resolve, relative, join } from 'node:path';
import type { RegistryItem } from 'jsrepo/config';

import { allComponents } from '../src/lib/registry/generated-registry-components';
import { metadata as particleMetadata } from '../src/lib/registry/generated-particle-metadata';
import { idToName } from '../src/lib/utils/particle-id';

async function isDirectory(path: string): Promise<boolean> {
  try {
    return (await stat(path)).isDirectory();
  } catch {
    return false;
  }
}

async function findParticleFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const entryPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await findParticleFiles(entryPath)));
    } else if (entry.isFile() && /^p-.*\.svelte$/.test(entry.name)) {
      files.push(entryPath);
    }
  }

  return files;
}

async function getHookItems(cwd: string): Promise<RegistryItem[]> {
  const hooksDir = resolve(cwd, 'src/lib/hooks');
  if (!(await isDirectory(hooksDir))) return [];

  const entries = await readdir(hooksDir, { withFileTypes: true });
  const items: RegistryItem[] = [];

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.ts')) continue;

    // e.g. use-file-upload.svelte.ts -> use-file-upload (imports use `$lib/hooks/use-file-upload.svelte`)
    const fileName = entry.name.replace(/\.ts$/, '');
    const name = fileName.replace(/\.svelte$/, '');

    const title = name
      .split('-')
      .map((w) => w[0].toUpperCase() + w.slice(1))
      .join(' ');

    items.push({
      name,
      type: 'hook',
      title,
      files: [
        {
          path: `src/lib/hooks/${entry.name}`,
          target: `$lib/hooks/${fileName}.ts`
        }
      ]
    });
  }

  return items;
}

async function getIconItems(cwd: string): Promise<RegistryItem[]> {
  const iconsDir = resolve(cwd, 'src/lib/icons');
  if (!(await isDirectory(iconsDir))) return [];

  const entries = await readdir(iconsDir, { withFileTypes: true });
  const items: RegistryItem[] = [];

  items.push({
    name: 'icon-types',
    type: 'lib',
    title: 'Icon Types',
    files: [{ path: 'src/lib/icons/types.ts', target: '$lib/icons/types.ts' }]
  });

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.svelte')) continue;

    const name = entry.name.replace(/\.svelte$/, '');

    items.push({
      name,
      type: 'component',
      title: name,
      registryDependencies: ['icon-types'],
      files: [
        {
          path: `src/lib/icons/${entry.name}`,
          target: `$lib/icons/${entry.name}`
        }
      ]
    });
  }

  return items;
}

async function getParticleBlockItems(cwd: string): Promise<RegistryItem[]> {
  const particlesDir = resolve(cwd, 'src/lib/components/particles');
  if (!(await isDirectory(particlesDir))) return [];

  const files = await findParticleFiles(particlesDir);
  const items: RegistryItem[] = [];

  for (const filePath of files) {
    const id = filePath.match(/([^/\\]+)\.svelte$/)?.[1] ?? '';
    const folder = filePath.match(/[/\\]([^/\\]+)[/\\][^/\\]+\.svelte$/)?.[1] ?? '';
    const meta = particleMetadata[id] ?? {};

    const registryItem: RegistryItem = {
      name: id,
      type: 'block',
      title: idToName(id),
      description: meta.description ?? '',
      categories: meta.tags,
      files: [
        {
          path: relative(cwd, filePath).replace(/\\/g, '/'),
          target: `$lib/components/particles/${folder}/${id}.svelte`
        }
      ]
    };

    if (meta.npmDependencies?.length) registryItem.dependencies = meta.npmDependencies;
    if (meta.registryDependencies?.length)
      registryItem.registryDependencies = meta.registryDependencies;

    items.push(registryItem);
  }

  return items;
}

export async function getRegistryItems(cwd: string): Promise<RegistryItem[]> {
  const uiDir = resolve(cwd, 'src/lib/components/ui');
  const items: RegistryItem[] = [];

  for (const [slug, meta] of Object.entries(allComponents)) {
    const componentDir = resolve(uiDir, meta.folder);
    if (!(await isDirectory(componentDir))) {
      console.warn(`! skipping ${slug} — ${relative(cwd, componentDir)} not found`);
      continue;
    }

    const registryItem: RegistryItem = {
      name: slug,
      type: 'ui',
      title: meta.name,
      description: meta.description,
      categories: [meta.category],
      files: [
        {
          path: relative(cwd, componentDir).replace(/\\/g, '/'),
          target: `$lib/components/ui/${meta.folder}`
        }
      ]
    };

    if (meta.npmDependencies?.length) registryItem.dependencies = meta.npmDependencies;
    if (meta.registryDependencies?.length)
      registryItem.registryDependencies = meta.registryDependencies;

    items.push(registryItem);
  }

  items.push({
    name: 'utils',
    type: 'lib',
    title: 'Utils',
    description:
      'Shared `cn` className helper and generic prop utility types used by every UI component.',
    files: [{ path: 'src/lib/utils.ts', target: '$lib/utils.ts' }]
  });

  items.push({
    name: 'assets',
    type: 'lib',
    title: 'Assets',
    description: 'Placeholder images used by particle examples.',
    files: [{ path: 'src/lib/assets', target: '$assets' }]
  });

  items.push(...(await getHookItems(cwd)));
  items.push(...(await getIconItems(cwd)));
  items.push(...(await getParticleBlockItems(cwd)));

  return items;
}
