import { error } from '@sveltejs/kit';
import { highlighter } from '$lib/components/app/shiki';
import { blocMetadata } from '$lib/components/blocs/bloc-metadata';
import type { RequestHandler } from './$types';

export type BlocSourceFile = { path: string; html: string; raw: string };
export type BlocSourceResponse = { files: BlocSourceFile[] };

// Bundled at build time so the source is available in the deployed Worker,
// which has no filesystem access to read from src/ at request time.
const blocSources = import.meta.glob(
  ['/src/lib/components/blocs/**/*.svelte', '/src/lib/components/blocs/**/*.ts'],
  { import: 'default', query: '?raw' }
);

const ROOT = '/src/lib/components/blocs/';

export const GET: RequestHandler = async ({ params }) => {
  const name = params.name;

  if (!/^[a-z]+-[0-9]+$/.test(name)) {
    error(400, 'Invalid bloc name');
  }

  if (!blocMetadata[name]) {
    error(404, 'Bloc not found');
  }

  const prefix = `${ROOT}${name}/`;
  const paths = Object.keys(blocSources)
    .filter((p) => p.startsWith(prefix))
    // entry point first, then components, then data/helpers
    .sort((a, b) => rank(a) - rank(b) || a.localeCompare(b));

  const files = await Promise.all(
    paths.map(async (p) => {
      const raw = (await blocSources[p]()) as string;
      const html = highlighter.codeToHtml(raw, {
        lang: p.endsWith('.ts') ? 'typescript' : 'svelte',
        themes: { dark: 'github-dark-default', light: 'github-light-default' }
      });
      return { html, path: p.slice(prefix.length), raw };
    })
  );

  return new Response(JSON.stringify({ files } satisfies BlocSourceResponse), {
    headers: { 'content-type': 'application/json' }
  });
};

function rank(path: string) {
  if (path.endsWith('/page.svelte')) return 0;
  if (path.endsWith('.svelte')) return 1;
  return 2;
}
