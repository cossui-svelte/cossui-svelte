/* eslint-disable perfectionist/sort-named-exports */

import { Select as SelectPrimitive } from 'bits-ui';

export { default as SelectContent, default as SelectPopup } from './select-content.svelte';
export { default as SelectGroupLabel } from './select-group-label.svelte';
export { default as SelectItem } from './select-item.svelte';
export { default as SelectScrollDownButton } from './select-scroll-down-button.svelte';
export { default as SelectScrollUpButton } from './select-scroll-up-button.svelte';
export { default as SelectSeparator } from './select-separator.svelte';
export { default as SelectTrigger } from './select-trigger.svelte';
export { type SelectTriggerVariants, selectTriggerVariants } from './select-trigget-variants';
export { default as SelectValue } from './select-value.svelte';

const { Root: Select, Group: SelectGroup } = SelectPrimitive;

export { Select, SelectGroup };
