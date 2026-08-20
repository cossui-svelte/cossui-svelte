<script lang="ts">
  import { Select as SelectPrimitive } from '@shardsui/svelte/select';
  import type { ComponentProps } from 'svelte';
  import { cn } from '$lib/utils';

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: ComponentProps<typeof SelectPrimitive.GroupLabel> = $props();
</script>

<SelectPrimitive.GroupLabel
  bind:ref
  class={cn('px-2 py-1.5 font-medium text-muted-foreground text-xs', className)}
  data-slot="select-group-label"
  {...restProps}
/>
