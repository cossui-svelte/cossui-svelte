import { Tooltip as TooltipPrimitive } from 'bits-ui';

const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;

export { default as TooltipPopup, default as TooltipContent } from './tooltip-popup.svelte';
export { Tooltip, TooltipProvider, TooltipTrigger };
