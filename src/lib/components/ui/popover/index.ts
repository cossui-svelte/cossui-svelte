import { Popover as PopoverPrimitive } from 'bits-ui';

const Popover = PopoverPrimitive.Root;

export { default as PopoverClose } from './popover-close.svelte';
export { default as PopoverDescription } from './popover-description.svelte';
export { default as PopoverPopup, default as PopoverContent } from './popover-popup.svelte';
export { default as PopoverTitle } from './popover-title.svelte';
export { default as PopoverTrigger } from './popover-trigger.svelte';
export { Popover, PopoverPrimitive };
