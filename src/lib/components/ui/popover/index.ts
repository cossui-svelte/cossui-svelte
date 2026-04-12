import { Popover as PopoverPrimitive } from 'bits-ui';
import PopoverDescription from './popover-description.svelte';
import PopoverPopup from './popover-popup.svelte';
import PopoverTitle from './popover-title.svelte';

const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverClose = PopoverPrimitive.Close;

export {
  Popover,
  PopoverClose,
  PopoverDescription,
  PopoverPopup,
  PopoverPopup as PopoverContent,
  PopoverPrimitive,
  PopoverTitle,
  PopoverTrigger
};
