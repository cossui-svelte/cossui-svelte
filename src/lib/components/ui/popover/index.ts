import { Popover as PopoverPrimitive } from 'bits-ui';

const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverClose = PopoverPrimitive.Close;

export { default as PopoverDescription } from './popover-description.svelte';
export { default as PopoverPopup, default as PopoverContent } from './popover-popup.svelte';
export { default as PopoverTitle } from './popover-title.svelte';
export { Popover, PopoverClose, PopoverPrimitive, PopoverTrigger };
