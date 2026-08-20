<script lang="ts">
  import { Toggle as TogglePrimitive } from '@shardsui/svelte/toggle';
  import type { ComponentProps } from 'svelte';
  import { cn } from '$lib/utils';
  import { type ToggleSize, type ToggleVariant, toggleVariants } from './toggle-variants';

  type ToggleProps = ComponentProps<typeof TogglePrimitive> & {
    variant?: ToggleVariant;
    size?: ToggleSize;
  };

  let {
    ref = $bindable(null),
    pressed = $bindable(false),
    class: className,
    size = 'default',
    variant = 'default',
    ...restProps
  }: ToggleProps = $props();
</script>

<TogglePrimitive
  bind:ref
  bind:pressed
  data-slot="toggle"
  class={cn(toggleVariants({ size, variant }), className)}
  {...restProps}
/>
