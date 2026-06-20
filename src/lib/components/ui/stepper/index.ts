// this is coming from https://github.com/max-got/originui-svelte/pull/72/changes/6245a3faf7ff518c8eaa186f24e2a539b3e7348b#diff-fe8582fb662ae00c31b63539c7d9292dec5ed6bcb8301e85c3da58eb37a754d6

import Root from './stepper.svelte';
import Description from './stepper-description.svelte';
import Indicator from './stepper-indicator.svelte';
import Item from './stepper-item.svelte';
import Separator from './stepper-separator.svelte';
import Title from './stepper-title.svelte';
import Trigger from './stepper-trigger.svelte';

export {
  Description,
  Description as StepperDescription,
  Indicator,
  Indicator as StepperIndicator,
  Item,
  Item as StepperItem,
  Root,
  Root as Stepper,
  Separator,
  Separator as StepperSeparator,
  Title,
  Title as StepperTitle,
  Trigger,
  Trigger as StepperTrigger
};
