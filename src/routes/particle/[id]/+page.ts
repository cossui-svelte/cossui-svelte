import { error } from '@sveltejs/kit';
import { allParticles } from '$lib/registry/registry-particles';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
  const particle = allParticles[params.id];

  if (!particle) {
    error(404, 'Particle not found');
  }

  return {
    id: params.id,
    SEO: {
      description: particle.description || `The ${particle.name} particle.`,
      title: `${particle.name} - coss ui`
    }
  };
};
