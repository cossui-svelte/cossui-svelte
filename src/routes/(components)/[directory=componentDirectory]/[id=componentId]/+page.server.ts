import { fetchComponentFromAPI } from '$data/api/components/components.js';
import type { PageServerLoad } from './$types.js';

export const load = (async ({ fetch, params }) => {
  const { directory, id } = params;

  const { componentMetadata } = await fetchComponentFromAPI(fetch, {
    directory,
    id
  });

  return {
    componentMetadata
  };
}) satisfies PageServerLoad;
