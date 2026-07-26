import { allParticles } from '$lib/registry/registry-particles';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
  const particleCount = Object.keys(allParticles).length;

  return {
    SEO: {
      description: `Discover ${particleCount} ready-to-use particles, the building blocks of your design system. Filter by category to find the perfect component for your project.`,
      title: 'Browse Particles - coss ui'
    }
  };
};
