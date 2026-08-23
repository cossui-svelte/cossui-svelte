<script lang="ts">
  import { Tabs as TabsPrimitive } from '@shardsui/svelte/tabs';
  import type { ComponentProps, Snippet } from 'svelte';
  import { cn } from '$lib/utils';
  import {
    type SegmentedControlSize,
    segmentedControlItemLayoutClassName,
    segmentedControlItemSizeClassNames
  } from './segmented-control';
  import { getTabsListSize } from './tabs-list.svelte';

  type Props = Omit<ComponentProps<typeof TabsPrimitive.Tab>, 'children'> & {
    children?: Snippet;
    size?: SegmentedControlSize;
  };

  let { ref = $bindable(null), class: className, size, children, ...restProps }: Props = $props();

  const tabsListSize = getTabsListSize();
  const resolvedSize = $derived(size ?? tabsListSize());
</script>

<TabsPrimitive.Tab
  bind:ref
  class={cn(
    "relative flex shrink-0 grow cursor-pointer items-center justify-center whitespace-nowrap rounded-md border border-transparent font-medium text-base outline-none transition-[color,background-color,box-shadow] hover:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring data-disabled:pointer-events-none data-[orientation=vertical]:w-full data-[orientation=vertical]:justify-start data-active:text-foreground data-disabled:opacity-64 sm:text-sm",
    segmentedControlItemLayoutClassName,
    segmentedControlItemSizeClassNames[resolvedSize],

    className,
  )}
  data-size={resolvedSize}
  data-slot="tabs-tab"
  {...restProps}
>
  {@render children?.()}
</TabsPrimitive.Tab>
