<script lang="ts">
  import X from '@lucide/svelte/icons/x';
  import { Combobox as ComboboxPrimitive } from '@shardsui/svelte/combobox';
  import type { ComponentProps, Snippet } from 'svelte';
  import { cn } from '$lib/utils';

  interface Props extends Omit<ComponentProps<typeof ComboboxPrimitive.Chip>, 'children'> {
    children?: Snippet;
  }

  let { class: className, children, ...restProps }: Props = $props();
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
    <ComboboxPrimitive.ChipRemove
      aria-label="Remove"
      class="h-full shrink-0 cursor-pointer px-1.5 opacity-80 hover:opacity-100 [&_svg:not([class*='size-'])]:size-4 sm:[&_svg:not([class*='size-'])]:size-3.5"
      data-slot="combobox-chip-remove"
    >
      <X />
    </ComboboxPrimitive.ChipRemove>
  </div>
</ComboboxPrimitive.Chip>
