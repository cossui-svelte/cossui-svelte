import { Tooltip as TooltipPrimitive } from 'bits-ui';

const TooltipTrigger = TooltipPrimitive.Trigger;

export { default as Tooltip } from './tooltip.svelte';
export { default as TooltipPopup, default as TooltipContent } from './tooltip-popup.svelte';
export { default as TooltipProvider } from './tooltip-provider.svelte';
export { TooltipTrigger };
