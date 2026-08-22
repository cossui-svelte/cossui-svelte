<script lang="ts">
  import { Drawer as DrawerPrimitive } from '@shardsui/svelte/drawer';
  import type { ComponentProps } from 'svelte';
  import { getContext } from 'svelte';
  import { cn } from '$lib/utils';

  type DrawerPosition = 'right' | 'left' | 'top' | 'bottom';

  let {
    ref = $bindable(null),
    class: className,
    position: positionProp,
    ...restProps
  }: ComponentProps<typeof DrawerPrimitive.SwipeArea> & {
    position?: DrawerPosition;
  } = $props();

  const ctx = getContext<{ position: () => DrawerPosition } | undefined>('drawer-position');
  const position = $derived(positionProp ?? ctx?.position() ?? 'bottom');
</script>

<DrawerPrimitive.SwipeArea
  bind:ref
  data-slot="drawer-swipe-area"
  class={cn(
    'fixed z-50 touch-none',
    position === 'bottom' && 'inset-x-0 bottom-0 h-8',
    position === 'top' && 'inset-x-0 top-0 h-8',
    position === 'left' && 'inset-y-0 left-0 w-8',
    position === 'right' && 'inset-y-0 right-0 w-8',
    className
  )}
  {...restProps}
/>
