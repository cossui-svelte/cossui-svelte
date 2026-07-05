import { error } from '@sveltejs/kit';
import { highlighter } from '$lib/components/app/shiki';
import { allParticles } from '$lib/registry/registry-particles';
import type { RequestHandler } from './$types';

export type SourceResponse = { html: string; raw: string };

// Bundled at build time so the source is available in the deployed Worker,
// which has no filesystem access to read from src/ at request time.
const particleSources = import.meta.glob('/src/lib/components/particles/**/*.svelte', {
  import: 'default',
  query: '?raw'
});

export const GET: RequestHandler = async ({ params }) => {
  const id = params.file;

  // validate the file parameter
  if (!/^p-[a-z0-9-]+$/.test(id)) {
    error(400, 'Invalid file parameter');
  }

  const meta = allParticles[id];

  if (!meta) {
    error(403, 'Not allowed');
  }

  const filePath = `/src/lib/components/particles/${meta.folder}/${meta.file}.svelte`;
  const loadSource = particleSources[filePath];

  if (!loadSource) {
    error(404, 'File not found');
  }

  const source = (await loadSource()) as string;

  const html = highlighter.codeToHtml(source, {
    lang: 'svelte',
    themes: { dark: 'github-dark-default', light: 'github-light-default' }
  });
  return new Response(JSON.stringify({ html, raw: source }), {
    headers: { 'content-type': 'application/json' }
  });
};
