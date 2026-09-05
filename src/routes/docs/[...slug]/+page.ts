import { error } from '@sveltejs/kit';
import { docEntries, loadDocPage } from '$lib/docs-content';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => docEntries();

export const load: PageLoad = async ({ params }) => {
  const slugParts = params.slug ? params.slug.split('/') : [];
  const page = await loadDocPage(slugParts);

  if (!page) {
    error(404, 'Page not found');
  }

  return {
    Component: page.Component,
    metadata: page.metadata,
    raw: page.raw,
    SEO: {
      description: page.metadata.description,
      title: `${page.metadata.title} - coss ui`
    }
  };
};
