import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
import CheckboxItem from './dropdown-menu-checkbox-item.svelte';
import Content from './dropdown-menu-content.svelte';
import Item from './dropdown-menu-item.svelte';
import Label from './dropdown-menu-label.svelte';
import RadioItem from './dropdown-menu-radio-item.svelte';
import Separator from './dropdown-menu-separator.svelte';
import Shortcut from './dropdown-menu-shortcut.svelte';
import SubContent from './dropdown-menu-sub-content.svelte';
import SubTrigger from './dropdown-menu-sub-trigger.svelte';

const Sub = DropdownMenuPrimitive.Sub;
const Root = DropdownMenuPrimitive.Root;
const Trigger = DropdownMenuPrimitive.Trigger;
const Group = DropdownMenuPrimitive.Group;
const RadioGroup = DropdownMenuPrimitive.RadioGroup;
const GroupHeading = DropdownMenuPrimitive.GroupHeading;

export {
  CheckboxItem,
  CheckboxItem as DropdownMenuCheckboxItem,
  Content,
  Content as DropdownMenuContent,
  Group as DropdownMenuGroup,
  Group,
  GroupHeading as DropdownMenuGroupHeading,
  GroupHeading,
  Item as DropdownMenuItem,
  Item,
  Label as DropdownMenuLabel,
  Label,
  RadioGroup as DropdownMenuRadioGroup,
  RadioGroup,
  RadioItem as DropdownMenuRadioItem,
  RadioItem,
  Root as DropdownMenu,
  Root,
  Separator as DropdownMenuSeparator,
  Separator,
  Shortcut as DropdownMenuShortcut,
  Shortcut,
  Sub as DropdownMenuSub,
  Sub,
  SubContent as DropdownMenuSubContent,
  SubContent,
  SubTrigger as DropdownMenuSubTrigger,
  SubTrigger,
  Trigger as DropdownMenuTrigger,
  Trigger
};
