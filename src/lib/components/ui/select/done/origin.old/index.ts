/* eslint-disable perfectionist/sort-named-exports */

import { Select as SelectPrimitive } from 'bits-ui';
import Content from './origin.old/select-content.svelte';
import GroupHeading from './origin.old/select-group-heading.svelte';
import Item from './origin.old/select-item.svelte';
import ScrollDownButton from './origin.old/select-scroll-down-button.svelte';
import ScrollUpButton from './origin.old/select-scroll-up-button.svelte';
import Separator from './origin.old/select-separator.svelte';
import Trigger from './origin.old/select-trigger.svelte';

const Root = SelectPrimitive.Root;
const Group = SelectPrimitive.Group;

export {
  Content,
  Content as SelectContent,
  Group,
  Group as SelectGroup,
  GroupHeading,
  GroupHeading as SelectGroupHeading,
  Item,
  Item as SelectItem,
  Root,
  //
  Root as Select,
  ScrollDownButton,
  ScrollDownButton as SelectScrollDownButton,
  ScrollUpButton,
  ScrollUpButton as SelectScrollUpButton,
  Separator,
  Separator as SelectSeparator,
  Trigger,
  Trigger as SelectTrigger
};
