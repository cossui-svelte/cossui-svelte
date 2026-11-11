import { allParticles } from '#lib/registry/registry-particles.js';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
  const particleCount = Object.keys(allParticles).length;

  return {
    SEO: {
      description: `Explore ${particleCount} ready-to-use UI patterns built from coss ui components. Copy the code, customize the details, and make them part of your product.`,
      title: 'Build more with Particles – coss ui'
    }
  };
};
