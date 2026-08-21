<script lang="ts">
  import { Combobox as ComboboxPrimitive } from '@shardsui/svelte/combobox';
  import type { ComponentProps, Snippet } from 'svelte';
  import { cn } from '$lib/utils';
  import ComboboxChipRemove from './combobox-chip-remove.svelte';

  interface Props extends Omit<ComponentProps<typeof ComboboxPrimitive.Chip>, 'children'> {
    children?: Snippet;
    removeProps?: Omit<ComponentProps<typeof ComboboxPrimitive.ChipRemove>, 'children'>;
  }

  let { class: className, children, removeProps, ...restProps }: Props = $props();
</script>

<ComboboxPrimitive.Chip
  class={cn(
    "flex items-center rounded-[calc(var(--radius-md)-1px)] bg-accent ps-2 font-medium text-accent-foreground text-sm outline-none sm:text-xs/(--text-xs--line-height) [&_svg:not([class*='size-'])]:size-4 sm:[&_svg:not([class*='size-'])]:size-3.5",
    className
  )}
  data-slot="combobox-chip"
  {...restProps}
>
  <div class="flex items-center">
    {@render children?.()}
    <ComboboxChipRemove {...removeProps} />
  </div>
</ComboboxPrimitive.Chip>
