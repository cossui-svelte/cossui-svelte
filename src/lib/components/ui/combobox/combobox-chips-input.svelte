<script lang="ts">
  import { Combobox as ComboboxPrimitive } from '@shardsui/svelte/combobox';
  import type { ComponentProps } from 'svelte';
  import { cn } from '$lib/utils';

  interface Props extends Omit<ComponentProps<typeof ComboboxPrimitive.Input>, 'size'> {
    size?: 'sm' | 'default' | 'lg';
  }

  let { class: className, size = 'default', ...restProps }: Props = $props();
</script>

<ComboboxPrimitive.Input
  autocomplete="off"
  class={cn(
    'min-w-12 flex-1 text-base text-foreground outline-none sm:text-sm [[data-slot=combobox-chip]+&]:ps-0.5',
    size === 'sm' ? 'ps-1.5' : 'ps-2',
    className
  )}
  data-size={size}
  data-slot="combobox-chips-input"
  {...restProps}
/>
