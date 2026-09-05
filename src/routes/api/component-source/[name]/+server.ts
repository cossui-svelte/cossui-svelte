import { error } from '@sveltejs/kit';
import { highlighter } from '$lib/components/app/shiki';
import { allComponents } from '$lib/registry/generated-registry-components';
import type { RequestHandler } from './$types';

export type ComponentSourceFile = { filename: string; html: string; raw: string };

// Bundled at build time so the source is available in the deployed Worker,
// which has no filesystem access to read from src/ at request time.
const componentSources = import.meta.glob('/src/lib/components/ui/**/*.svelte', {
  import: 'default',
  query: '?raw'
});

export const GET: RequestHandler = async ({ params }) => {
  const meta = allComponents[params.name];

  if (!meta) {
    error(404, 'Component not found');
  }

  const prefix = `/src/lib/components/ui/${meta.folder}/`;
  const files = Object.entries(componentSources)
    .filter(([path]) => path.startsWith(prefix))
    .sort(([a], [b]) => a.localeCompare(b));

  if (files.length === 0) {
    error(404, 'No source files found');
  }

  const result: ComponentSourceFile[] = await Promise.all(
    files.map(async ([path, loadSource]) => {
      const filename = path.slice(prefix.length);
      const source = (await loadSource()) as string;
      const html = highlighter.codeToHtml(source, {
        lang: 'svelte',
        themes: { dark: 'github-dark-default', light: 'github-light-default' }
      });
      return { filename, html, raw: source };
    })
  );

  return new Response(JSON.stringify(result), {
    headers: { 'content-type': 'application/json' }
  });
};
