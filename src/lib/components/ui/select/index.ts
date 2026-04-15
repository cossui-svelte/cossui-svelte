/* eslint-disable perfectionist/sort-named-exports */

import { Select as SelectPrimitive } from 'bits-ui';
import Content from './select-content.svelte';
import GroupHeading from './select-group-label.svelte';
import Item from './select-item.svelte';
import ScrollDownButton from './select-scroll-down-button.svelte';
import ScrollUpButton from './select-scroll-up-button.svelte';
import Separator from './select-separator.svelte';
import Trigger, { selectTriggerVariants } from './select-trigger.svelte';
import Value from './select-value.svelte';

const Root = SelectPrimitive.Root;
const Group = SelectPrimitive.Group;

export {
  Content as SelectContent,
  Content as SelectPopup,
  Group as SelectGroup,
  GroupHeading as SelectGroupLabel,
  Item as SelectItem,
  Root as Select,
  ScrollDownButton as SelectScrollDownButton,
  ScrollUpButton as SelectScrollUpButton,
  SelectPrimitive,
  Separator as SelectSeparator,
  selectTriggerVariants,
  Trigger as SelectTrigger,
  Value as SelectValue
};
