<script lang="ts">
  import { Autocomplete as AutocompletePrimitive } from '@shardsui/svelte/autocomplete';
  import type { ComponentProps, Snippet } from 'svelte';
  import { cn } from '$lib/utils';

  type Props = Omit<ComponentProps<typeof AutocompletePrimitive.Item>, 'children'> & {
    children?: Snippet<[{ highlighted: boolean; disabled: boolean }]>;
  };

  let { class: className, children: childrenProp, ...restProps }: Props = $props();
</script>

<AutocompletePrimitive.Item
  class={cn(
    'flex min-h-8 cursor-default select-none items-center rounded-sm px-2 py-1 text-base outline-none data-disabled:pointer-events-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:opacity-64 sm:min-h-7 sm:text-sm',
    className
  )}
  data-slot="autocomplete-item"
  {...restProps}
>
  {#snippet children(state)}
    {@render childrenProp?.(state)}
  {/snippet}
</AutocompletePrimitive.Item>
