<script lang="ts">
  import { Toggle as TogglePrimitive } from '@shardsui/svelte/toggle';
  import type { ComponentProps } from 'svelte';
  import { cn } from '$lib/utils';
  import { type ToggleSize, type ToggleVariant, toggleVariants } from '../toggle/toggle-variants';
  import { getToggleGroupCtx } from './toggle-group.svelte';

  let {
    ref = $bindable(null),
    class: className,
    size,
    variant,
    ...restProps
  }: ComponentProps<typeof TogglePrimitive> & {
    size?: ToggleSize;
    variant?: ToggleVariant;
  } = $props();

  const ctx = getToggleGroupCtx();
</script>

<TogglePrimitive
  bind:ref
  data-slot="toggle-group-item"
  class={cn(
    toggleVariants({
      size: ctx.size || size,
      variant: ctx.variant || variant
    }),
    className
  )}
  {...restProps}
/>
