import type { Component } from 'svelte';

interface DocTocItem {
  depth: number;
  title: string;
  url: string;
}

interface DocMetadata {
  description?: string;
  links?: { doc?: string };
  title: string;
  toc?: DocTocItem[];
}

type DocModule = {
  default: Component;
  metadata: Omit<DocMetadata, 'toc'>;
  // Written by the `toc` plugin in mdsvex.config.js; absent on pages without h2/h3 headings.
  plugin_data?: { toc?: { items?: DocTocItem[] } };
};

export interface DocPage {
  Component: Component;
  metadata: DocMetadata;
  raw: string;
}

// Bundled at build time (both compiled-component and raw-text variants of the
// same files) so pages are available in the deployed Worker, which has no
// filesystem access to read from src/ at request time.
const compiledPages = import.meta.glob<DocModule>('/src/lib/components/app/content/**/*.mdx');
const rawPages = import.meta.glob('/src/lib/components/app/content/**/*.mdx', {
  import: 'default',
  query: '?raw'
});

function pathToSlug(path: string): string {
  return path
    .replace('/src/lib/components/app/content/', '')
    .replace('(root)/', '')
    .replace(/\.mdx$/, '');
}

const slugToPath = new Map(Object.keys(compiledPages).map((path) => [pathToSlug(path), path]));

export function docEntries(): { slug: string }[] {
  return [...slugToPath.keys()].map((slug) => ({ slug: slug === 'index' ? '' : slug }));
}

export async function loadDocPage(slugParts: string[]): Promise<DocPage | undefined> {
  const slug = slugParts.join('/') || 'index';
  // Nav links are `/docs/<component>`; the content lives under `components/`.
  const path = slugToPath.get(slug) ?? slugToPath.get(`components/${slug}`);
  if (!path) return undefined;

  const [mod, raw] = await Promise.all([compiledPages[path](), rawPages[path]()]);

  return {
    Component: mod.default,
    metadata: { ...mod.metadata, toc: mod.plugin_data?.toc?.items ?? [] },
    raw: raw as string
  };
}
