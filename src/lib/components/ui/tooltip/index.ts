// import Tooltip from './tooltip.svelte';
import TooltipPopup from './tooltip-popup.svelte';
// import TooltipProvider from './tooltip-provider.svelte';
// import TooltipTrigger from './tooltip-trigger.svelte';

import { Tooltip as TooltipPrimitive } from 'bits-ui';

// import TooltipContent from './tooltip-content.svelte';

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

export { Tooltip, TooltipPopup, TooltipPopup as TooltipContent, TooltipProvider, TooltipTrigger };
