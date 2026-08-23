<script lang="ts">
  import { Radio, RadioGroup } from '$lib/components/ui/radio-group';
  import {
    segmentedControlItemVariants,
    segmentedControlRootClassName
  } from '$lib/components/ui/tabs/segmented-control';

  const itemClassName = segmentedControlItemVariants({
    className: 'grow',
    size: 'sm',
    state: 'checked'
  });
</script>

<RadioGroup aria-label="Billing period" class={segmentedControlRootClassName} value="monthly">
  <Radio class={itemClassName} value="monthly">Monthly</Radio>
  <Radio class={itemClassName} value="yearly">Yearly</Radio>
</RadioGroup>
