import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { error } from '@sveltejs/kit';
// import { createHighlighter } from 'shiki';
import { allParticles } from '$lib/registry/registry-particles';
import type { RequestHandler } from './$types';
import { highlighter as highlighterPromise } from '$lib/components/app/shiki';

// const highlighterPromise = createHighlighter({
//   langs: ['svelte'],
//   themes: ['github-light', 'github-dark']
// });

export const GET: RequestHandler = async ({ params }) => {
  const id = params.file;

  console.log(id);

  // validate the file parameter
  if (!/^[a-z0-9-]+$/.test(id)) {
    error(400, 'Invalid file parameter');
  }

  const meta = allParticles[id];

  console.log(meta);

  if (!meta) {
    error(403, 'Not allowed');
  }

  const filePath = join(
    process.cwd(),
    `src/lib/components/particles/${meta.folder}/${meta.file}.svelte`
  );

  console.log(filePath);

  try {
    const source = readFileSync(filePath, 'utf-8');
    const highlighter = await highlighterPromise;
    const html = highlighter.codeToHtml(source, {
      lang: 'svelte',
      themes: { dark: 'github-dark-default', light: 'github-light-default' }
    });
    return new Response(JSON.stringify({ html, raw: source }), {
      headers: { 'content-type': 'application/json' }
    });
  } catch (e) {
    console.log(e);
    error(404, 'File not found');
  }
};
