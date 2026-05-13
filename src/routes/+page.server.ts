import { getComponentMetaAPIResponseJSON } from '$data/api/components/_meta/_meta.query';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
  const componentsMeta = await getComponentMetaAPIResponseJSON(locals.serverClient);
  return { componentsMeta };
}) satisfies PageServerLoad;
