<script lang="ts">
  import X from '@lucide/svelte/icons/x';
  import { Combobox as ComboboxPrimitive } from '@shardsui/svelte/combobox';
  import type { ComponentProps, Snippet } from 'svelte';
  import { cn } from '$lib/utils';

  interface Props extends Omit<ComponentProps<typeof ComboboxPrimitive.ChipRemove>, 'children'> {
    children?: Snippet;
  }

  let { class: className, children, ...restProps }: Props = $props();
</script>

<ComboboxPrimitive.ChipRemove
  aria-label="Remove"
  class={cn(
    "h-full shrink-0 cursor-pointer px-1.5 opacity-80 hover:opacity-100 [&_svg:not([class*='size-'])]:size-4 sm:[&_svg:not([class*='size-'])]:size-3.5",
    className
  )}
  data-slot="combobox-chip-remove"
  {...restProps}
>
  {#if children}
    {@render children()}
  {:else}
    <X />
  {/if}
</ComboboxPrimitive.ChipRemove>
