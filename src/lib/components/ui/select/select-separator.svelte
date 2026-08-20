<script lang="ts">
  import { Select as SelectPrimitive } from '@shardsui/svelte/select';
  import type { ComponentProps } from 'svelte';
  import { cn } from '$lib/utils';

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: ComponentProps<typeof SelectPrimitive.Separator> = $props();
</script>

<SelectPrimitive.Separator
  bind:ref
  class={cn('mx-2 my-1 h-px bg-border', className)}
  data-slot="select-separator"
  {...restProps}
/>
