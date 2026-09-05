import type { Component } from 'svelte';

export interface DocTocItem {
  depth: number;
  title: string;
  url: string;
}

export interface DocMetadata {
  description?: string;
  links?: { doc?: string };
  title: string;
  toc?: DocTocItem[];
}

type DocModule = { default: Component; metadata: DocMetadata };

export interface DocPage {
  Component: Component;
  metadata: DocMetadata;
  raw: string;
}

// Bundled at build time (both compiled-component and raw-text variants of the
// same files) so pages are available in the deployed Worker, which has no
// filesystem access to read from src/ at request time.
const compiledPages = import.meta.glob<DocModule>('/src/lib/content/docs/**/*.mdx');
const rawPages = import.meta.glob('/src/lib/content/docs/**/*.mdx', {
  import: 'default',
  query: '?raw'
});

function pathToSlug(path: string): string {
  return path.replace('/src/lib/content/docs/', '').replace(/\.mdx$/, '');
}

const slugToPath = new Map(Object.keys(compiledPages).map((path) => [pathToSlug(path), path]));

export function docEntries(): { slug: string }[] {
  return [...slugToPath.keys()].map((slug) => ({ slug }));
}

export async function loadDocPage(slugParts: string[]): Promise<DocPage | undefined> {
  const path = slugToPath.get(slugParts.join('/'));
  if (!path) return undefined;

  const [mod, raw] = await Promise.all([compiledPages[path](), rawPages[path]()]);

  return { Component: mod.default, metadata: mod.metadata, raw: raw as string };
}
