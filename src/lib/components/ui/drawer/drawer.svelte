<script lang="ts">
  import { Drawer as DrawerPrimitive } from '@shardsui/svelte/drawer';
  import type { ComponentProps } from 'svelte';
  import { setContext } from 'svelte';

  type Position = 'top' | 'bottom' | 'left' | 'right';

  const directionMap = {
    bottom: 'down',
    left: 'left',
    right: 'right',
    top: 'up'
  } as const satisfies Record<
    Position,
    ComponentProps<typeof DrawerPrimitive.Root>['swipeDirection']
  >;

  let {
    open = $bindable(false),
    snapPoints,
    snapPoint = $bindable(snapPoints?.[0] ?? null),
    swipeDirection,
    position = 'bottom',
    ...restProps
  }: ComponentProps<typeof DrawerPrimitive.Root> & {
    position?: Position;
  } = $props();

  setContext('drawer-position', { position: () => position });
</script>

<DrawerPrimitive.Root
  bind:open
  bind:snapPoint
  {snapPoints}
  swipeDirection={swipeDirection ?? directionMap[position]}
  {...restProps}
/>
