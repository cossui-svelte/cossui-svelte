import type { Handle } from '@sveltejs/kit/hooks';
import { RequestClient } from '#data/api/helpers/RequestClient.js';

// this will configure the global fetcher
const typedServerFetch: Handle = async ({ event, resolve }) => {
  const { fetch, locals } = event;

  if (!locals.serverClient) {
    locals.serverClient = new RequestClient(fetch);
  }

  return await resolve(event);
};

export const handle: Handle = typedServerFetch;
