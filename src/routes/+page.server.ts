import { getComponentRegistry } from '$lib/registry/componentRegistry';
import type { PageServerLoad } from './$types';

export const load = (async () => {
  const componentsMeta = (await getComponentRegistry()).getRegistryMetaData();
  return { componentsMeta };
}) satisfies PageServerLoad;
