<script lang="ts">
  import Check from '@lucide/svelte/icons/check';
  import { Select as SelectPrimitive } from '@shardsui/svelte/select';
  import type { ComponentProps, Snippet } from 'svelte';
  import { cn } from '$lib/utils';

  type Props = Omit<ComponentProps<typeof SelectPrimitive.Item>, 'children'> & {
    label?: string;
    children?: Snippet<[{ highlighted: boolean; selected: boolean }]>;
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

<SelectPrimitive.Item
  bind:ref
  {value}
  class={cn(
    "grid min-h-8 cursor-default grid-cols-[1rem_1fr] items-center gap-2 rounded-sm py-1 ps-2 pe-4 text-base outline-none data-disabled:pointer-events-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:opacity-64 sm:min-h-7 sm:text-sm [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
    className
  )}
  data-slot="select-item"
  {...restProps}
>
  {#snippet children(state)}
    <span class="col-start-1 flex items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check size={24} />
      </SelectPrimitive.ItemIndicator>
    </span>
    <span class="col-start-2 flex min-w-0 items-center gap-2">
      {#if childrenProp}
        {@render childrenProp(state)}
      {:else}
        {label || String(value)}
      {/if}
    </span>
  {/snippet}
</SelectPrimitive.Item>
