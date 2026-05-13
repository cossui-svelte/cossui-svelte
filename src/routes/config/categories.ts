import componentSlugs from '$lib/content/docs/components/meta.json';
import { source } from '$lib/lib/source';

export interface ComponentCategory {
  slug: string;
  name: string;
  description?: string;
}

function slugToName(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export const categories: ComponentCategory[] = (componentSlugs.pages as string[]).map((slug) => {
  const page = source.getPage(['components', slug]);
  return {
    description: page?.data.description,
    name: slugToName(slug),
    slug
  };
});

export function getCategory(slug: string): ComponentCategory | undefined {
  return categories.find((category) => category.slug === slug);
}
