<script lang="ts" module>
  import { getContext, setContext } from 'svelte';
  import type { SegmentedControlSize } from '$lib/components/ui/tabs/segmented-control';

  export function setTabsListSize(getSize: () => SegmentedControlSize) {
    setContext('tabsListSize', getSize);
  }

  export function getTabsListSize(): SegmentedControlSize {
    const getSize = getContext<(() => SegmentedControlSize) | undefined>('tabsListSize');
    return getSize?.() ?? 'default';
  }
</script>

<script lang="ts">
  import { Tabs as TabsPrimitive } from '@shardsui/svelte/tabs';
  import type { ComponentProps, Snippet } from 'svelte';
  import { cn } from '$lib/utils';
  import TabsIndicator from './tabs-indicator.svelte';

  type TabsVariant = 'default' | 'underline';

  type Props = Omit<ComponentProps<typeof TabsPrimitive.List>, 'children'> & {
    children?: Snippet;
    variant?: TabsVariant;
    size?: SegmentedControlSize;
  };

  let {
    class: className,
    variant = 'default',
    size = 'default',
    children,
    ...restProps
  }: Props = $props();

  setTabsListSize(() => size);
</script>

<TabsPrimitive.List
  class={cn(
    'relative z-0 flex w-fit items-center justify-center gap-x-0.5 text-muted-foreground',
    'data-[orientation=vertical]:flex-col',
    variant === 'default'
      ? 'rounded-lg bg-muted p-0.5 text-muted-foreground/72'
      : 'data-[orientation=vertical]:px-1 data-[orientation=horizontal]:py-1 *:data-[slot=tabs-tab]:hover:bg-accent',
    className
  )}
  data-size={size}
  data-slot="tabs-list"
  {...restProps}
>
  {@render children?.()}
  <TabsIndicator
    class={cn(
      'absolute bottom-0 left-0 h-(--active-tab-height) w-(--active-tab-width) translate-x-(--active-tab-left) -translate-y-(--active-tab-bottom) transition-[width,translate] duration-200 ease-in-out',
      variant === 'underline'
        ? 'z-10 bg-primary data-[orientation=horizontal]:h-0.5 data-[orientation=vertical]:w-0.5 data-[orientation=vertical]:-translate-x-px data-[orientation=horizontal]:translate-y-px'
        : '-z-1 rounded-md bg-background shadow-sm/5 dark:bg-input'
    )}
    data-slot="tab-indicator"
  />
</TabsPrimitive.List>
