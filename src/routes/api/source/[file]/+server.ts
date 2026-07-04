import { join } from 'node:path';
import { readFile } from 'node:fs/promises';
import { error } from '@sveltejs/kit';
import { highlighter } from '$lib/components/app/shiki';

import { allParticles } from '$lib/registry/registry-particles';
import type { RequestHandler } from './$types';

export type SourceResponse = { html: string; raw: string };


export const GET: RequestHandler = async ({ params }) => {
  const id = params.file;

  console.log(id);

  // validate the file parameter
  if (!/^p-[a-z0-9-]+$/.test(id)) {
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
    console.log('Reading file:', filePath);
    const source = await readFile(filePath, 'utf-8');

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
