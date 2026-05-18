import type { ParamMatcher } from '@sveltejs/kit';

import { COSSUI_DIRECTORIES } from '$lib/registry/componentRegistry.components';

export const match = ((
  param: string
): param is (typeof COSSUI_DIRECTORIES)[keyof typeof COSSUI_DIRECTORIES]['directory'] => {
  return Object.values(COSSUI_DIRECTORIES).some(({ directory }) => directory === param);
}) satisfies ParamMatcher;
