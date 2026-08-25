import { error } from '@sveltejs/kit';
import { allParticles } from '$lib/registry/registry-particles';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => {
  return Object.keys(allParticles).map((id) => ({ id }));
};

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
