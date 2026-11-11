<script lang="ts">
  import { RadioGroupPrimitive, RadioPrimitive } from '#lib/components/ui/radio-group/index.js';
  import {
    SegmentedControl,
    SegmentedControlItem
  } from '#lib/components/ui/segmented-control/index.js';
</script>

<SegmentedControl aria-label="Billing period">
  {#snippet child({ props, content })}
    <RadioGroupPrimitive {...props} value="monthly">{@render content()}</RadioGroupPrimitive>
  {/snippet}
  <SegmentedControlItem class="grow">
    {#snippet child({ props })}
      <RadioPrimitive.Root {...props} value="monthly">Monthly</RadioPrimitive.Root>
    {/snippet}
  </SegmentedControlItem>
  <SegmentedControlItem class="grow">
    {#snippet child({ props })}
      <RadioPrimitive.Root {...props} value="yearly">Yearly</RadioPrimitive.Root>
    {/snippet}
  </SegmentedControlItem>
</SegmentedControl>
