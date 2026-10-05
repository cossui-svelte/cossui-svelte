import { error } from '@sveltejs/kit';
import type { Component } from 'svelte';
import { blocMetadata } from '#lib/components/blocs/bloc-metadata.js';
import type { EntryGenerator, PageLoad } from './$types';

const blocs = import.meta.glob<Component>('/src/lib/components/blocs/*/page.svelte', {
  import: 'default'
});

export const entries: EntryGenerator = () => Object.keys(blocMetadata).map((name) => ({ name }));

export const load: PageLoad = async ({ params }) => {
  const meta = blocMetadata[params.name];
  const loadBloc = blocs[`/src/lib/components/blocs/${params.name}/page.svelte`];

  if (!meta || !loadBloc) {
    error(404, 'Bloc not found');
  }

  return {
    component: await loadBloc(),
    meta,
    name: params.name,
    SEO: {
      description: meta.description,
      title: `${params.name} - coss ui blocs`
    }
  };
};
