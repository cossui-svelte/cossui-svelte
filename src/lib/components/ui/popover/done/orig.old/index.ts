/* eslint-disable perfectionist/sort-named-exports */

import { Popover as PopoverPrimitive } from 'bits-ui';
import Content from './popover-content.svelte';

const Root = PopoverPrimitive.Root;
const Trigger = PopoverPrimitive.Trigger;
const Close = PopoverPrimitive.Close;

export {
  Close,
  Close as PopoverClose,
  Content,
  Content as PopoverContent,
  Root,
  //
  Root as Popover,
  Trigger,
  Trigger as PopoverTrigger
};
