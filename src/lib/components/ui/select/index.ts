/* eslint-disable perfectionist/sort-named-exports */

import { Select as SelectPrimitive } from 'bits-ui';
import Content from './select-content.svelte';
import GroupHeading from './select-group-label.svelte';
import Item from './select-item.svelte';
import ScrollDownButton from './select-scroll-down-button.svelte';
import ScrollUpButton from './select-scroll-up-button.svelte';
import Separator from './select-separator.svelte';
import Trigger from './select-trigger.svelte';
import Value from './select-value.svelte';

const { Root: Select, Group: SelectGroup } = SelectPrimitive;

export { type SelectTriggerVariants, selectTriggerVariants } from './select-trigget-variants';
export {
  Content as SelectContent,
  Content as SelectPopup,
  GroupHeading as SelectGroupLabel,
  Item as SelectItem,
  ScrollDownButton as SelectScrollDownButton,
  ScrollUpButton as SelectScrollUpButton,
  Select,
  SelectGroup,
  SelectPrimitive,
  Separator as SelectSeparator,

  Trigger as SelectTrigger,
  Value as SelectValue
};
