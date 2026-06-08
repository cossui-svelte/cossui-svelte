import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { error } from '@sveltejs/kit';
import { createHighlighter } from 'shiki';
import { particles } from '$lib/registry/registry-particles';
import { type RequestHandler } from './$types';

const highlighterPromise = createHighlighter({
  langs: ['svelte'],
  themes: ['github-light', 'github-dark']
});

export const GET: RequestHandler = async ({ params }) => {
  // validate the file parameter
  if (!/^[a-z0-9-]+$/.test(params.file)) {
    error(400, 'Invalid file parameter');
  }

  const meta = particles[params.file];

  if (!meta) {
    error(403, 'Not allowed');
  }

  const filePath = join(process.cwd(), 'src/lib/components/particles', `${meta.file}.svelte`);

  try {
    const source = readFileSync(filePath, 'utf-8');
    const highlighter = await highlighterPromise;
    const html = highlighter.codeToHtml(source, {
      lang: 'svelte',
      themes: { dark: 'github-dark', light: 'github-light' }
    });
    return new Response(JSON.stringify({ html, raw: source }), {
      headers: { 'content-type': 'application/json' }
    });
  } catch {
    error(404, 'File not found');
  }
};
