<script lang="ts">
  import { RadioGroup, RadioPrimitive } from '$lib/components/ui/radio-group';
  import {
    segmentedControlItemVariants,
    segmentedControlRootClassName
  } from '$lib/components/ui/tabs/segmented-control';

  const itemClassName = segmentedControlItemVariants({
    className: 'grow',
    state: 'checked'
  });
</script>

<RadioGroup aria-label="Billing period" class={segmentedControlRootClassName} value="monthly">
  <RadioPrimitive.Root class={itemClassName} value="monthly">Monthly</RadioPrimitive.Root>
  <RadioPrimitive.Root class={itemClassName} value="yearly">Yearly</RadioPrimitive.Root>
</RadioGroup>
