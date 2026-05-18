import type { COSSUIComponent, COSSUIDirectory } from '$lib/registry/componentRegistry.types';

import {
  type AvailableCOSSUIComponent,
  ComponentAPIError,
  type ComponentAPIResponseJSON
} from './components.handler';
import { API_V1_COMPONENTS_ROUTE } from './components.route';

const fetchFromAPI = async <T>(fetch: typeof globalThis.fetch, directory: COSSUIDirectory) => {
  const response = await fetch(`${API_V1_COMPONENTS_ROUTE}/${directory}.json`);
  if (!response.ok)
    throw new ComponentAPIError(
      `API request for "${directory}" failed: ${response.status} ${response.statusText}`
    );
  return response.json() as T;
};

//Sadly we need to fetch all directories at once, because it is not possible
//to prerender all the component routes in advance.
//Cloudflare Pages has a limit of 100 routes, so we need to make sure we don't hit that limit.
//With this way, we just mimic that for better DX.

export const fetchComponentsFromAPI = (
  fetch: typeof globalThis.fetch,
  directory: COSSUIDirectory
) => fetchFromAPI<ComponentAPIResponseJSON>(fetch, directory);

export const fetchComponentFromAPI = async (
  fetch: typeof globalThis.fetch,
  { directory, id }: { directory: COSSUIDirectory; id: COSSUIComponent }
) => {
  const { components } = await fetchFromAPI<ComponentAPIResponseJSON>(fetch, directory);
  const [component] = components.filter((c): c is AvailableCOSSUIComponent => {
    if (c.id !== id) return false;
    if (c.availability !== 'available') return false;
    return true;
  });

  if (!component) throw new ComponentAPIError(`Component ${id} not found in ${directory}`);

  return {
    componentMetadata: component
  };
};
