<script lang="ts">
  import Check from '@lucide/svelte/icons/check';
  import { Combobox as ComboboxPrimitive } from '@shardsui/svelte/combobox';
  import type { ComponentProps, Snippet } from 'svelte';
  import { cn } from '$lib/utils';

  type Props = Omit<ComponentProps<typeof ComboboxPrimitive.Item>, 'children'> & {
    label?: string;
    children?: Snippet<[{ highlighted: boolean; selected: boolean; disabled: boolean }]>;
  };

  let {
    ref = $bindable(null),
    class: className,
    label,
    value,
    children: childrenProp,
    ...restProps
  }: Props = $props();
</script>

<ComboboxPrimitive.Item
  bind:ref
  {value}
  class={cn(
    "grid min-h-8 in-data-[side=none]:min-w-[calc(var(--anchor-width)+1.25rem)] cursor-default grid-cols-[1rem_minmax(0,1fr)] items-center gap-2 rounded-sm py-1 ps-2 pe-4 text-base outline-none data-disabled:pointer-events-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:opacity-64 sm:min-h-7 sm:text-sm [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
    className
  )}
  data-slot="combobox-item"
  {...restProps}
>
  {#snippet children(state)}
    <span class="col-start-1 flex items-center justify-center">
      <ComboboxPrimitive.ItemIndicator>
        <Check size={24} />
      </ComboboxPrimitive.ItemIndicator>
    </span>
    <span class="wrap-anywhere col-start-2 min-w-0">
      {#if childrenProp}
        {@render childrenProp(state)}
      {:else}
        {label || String(value)}
      {/if}
    </span>
  {/snippet}
</ComboboxPrimitive.Item>
