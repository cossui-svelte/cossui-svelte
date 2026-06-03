import type { ParamMatcher } from '@sveltejs/kit';
import { COSSUI_DIRECTORIES } from '$lib/registry/componentRegistry.components';
import type { COSSUIReadyComponents } from '$lib/registry/componentRegistry.types';

export const match = ((param: string): param is COSSUIReadyComponents => {
  return Object.values(COSSUI_DIRECTORIES).some((route) =>
    route.components.some((componentId) => {
      const componentName = componentId.split('.');
      return !componentId.includes('.todo.') && componentName[0] === param;
    })
  );
}) satisfies ParamMatcher;
