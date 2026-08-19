<script lang="ts">
  import { CheckboxGroup as CheckboxGroupPrimitive } from '@shardsui/svelte/checkbox-group';
  import type { ComponentProps } from 'svelte';
  import { cn } from '$lib/utils';

  let {
    ref = $bindable(null),
    value = $bindable([]),
    class: className,
    ...restProps
  }: ComponentProps<typeof CheckboxGroupPrimitive> = $props();
</script>

<CheckboxGroupPrimitive
  bind:ref
  bind:value
  class={cn('flex flex-col items-start gap-3', className)}
  {...restProps}
/>
