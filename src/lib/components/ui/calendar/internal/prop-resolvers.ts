import { boxWith } from 'svelte-toolbelt';
import { getBitsConfig } from './bits-config';

/**
 * Resolves the `locale` prop using a standard priority chain:
 * 1. The prop value (if defined)
 * 2. The config default value (if no prop value is defined)
 * 3. The fallback value `"en"` (if no config value found)
 */
export function resolveLocaleProp(getProp: () => string | undefined) {
  return boxWith(() => {
    const propValue = getProp();
    if (propValue !== undefined) return propValue;
    const option = getBitsConfig().defaultLocale.current;
    if (option !== undefined) return option;
    return 'en';
  });
}
