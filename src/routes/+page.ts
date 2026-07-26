import type { PageLoad } from './$types';

export const load: PageLoad = () => {
  return {
    SEO: {
      description: 'Built for developers and AI.',
      title: 'A new, modern UI component library built on top of BitsUI - coss ui-svelte'
    }
  };
};
