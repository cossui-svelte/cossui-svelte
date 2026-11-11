import type { PageLoad } from './$types';

export const load: PageLoad = () => {
  return {
    SEO: {
      description:
        'Accessible Svelte components ported from coss ui, powered by ShardsUI and styled with Tailwind CSS. Designed for developers and AI, with source code you can make your own.',
      title: 'A modern Svelte UI component library – coss ui-svelte'
    }
  };
};
