import { error } from '@sveltejs/kit';
import {
  type BlocCategory,
  blocCategories,
  blocsInCategory
} from '$lib/components/blocs/bloc-metadata';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => blocCategories.map(({ slug }) => ({ category: slug }));

export const load: PageLoad = ({ params }) => {
  const category = blocCategories.find((c) => c.slug === params.category);

  if (!category) {
    error(404, 'Category not found');
  }

  return {
    blocs: blocsInCategory(category.slug as BlocCategory),
    SEO: {
      description: `${category.name} blocs built with coss ui-svelte.`,
      title: `${category.name} blocs - coss ui`
    }
  };
};
