import { Tooltip as TooltipPrimitive } from '@shardsui/svelte/tooltip';

export { default as Tooltip } from './tooltip.svelte';
export { default as TooltipPopup, default as TooltipContent } from './tooltip-popup.svelte';
export { default as TooltipProvider } from './tooltip-provider.svelte';
export { default as TooltipTrigger } from './tooltip-trigger.svelte';
export const TooltipHandle = TooltipPrimitive.Handle;
export { TooltipPrimitive };
