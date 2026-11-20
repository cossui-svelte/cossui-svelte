<script lang="ts">
  import { Drawer as DrawerPrimitive } from '@shardsui/svelte/drawer';
  import type { ComponentProps } from 'svelte';
  import { cn } from '#lib/utils.js';

  type DrawerPosition = 'right' | 'left' | 'top' | 'bottom';

  let {
    ref = $bindable(null),
    class: className,
    position = 'bottom',
    variant = 'default',
    ...restProps
  }: ComponentProps<typeof DrawerPrimitive.Viewport> & {
    position?: DrawerPosition;
    variant?: 'default' | 'straight' | 'inset';
  } = $props();
</script>

<DrawerPrimitive.Viewport
  bind:ref
  class={cn(
    'fixed inset-0 z-50 touch-none [--bleed:--spacing(12)] [--inset:0px]',
    position === 'bottom' &&
      'grid grid-rows-[1fr_auto] pt-[max(--spacing(2),env(safe-area-inset-top,0px))] after:pointer-events-none after:fixed after:inset-x-0 after:bottom-0 after:h-(--bleed) after:bg-popover data-closed:after:opacity-0 has-[[data-swiping]]:after:opacity-0',
    position === 'top' && 'grid grid-rows-[auto_1fr] pb-12',
    position === 'left' && 'flex justify-start',
    position === 'right' && 'flex justify-end',
    variant === 'inset' && 'px-(--inset) sm:[--inset:--spacing(4)]',
    variant === 'inset' && position !== 'bottom' && 'pt-(--inset)',
    variant === 'inset' && position !== 'top' && 'pb-(--inset)',
    variant === 'inset' && position === 'bottom' && 'sm:after:hidden',
    className
  )}
  data-slot="drawer-viewport"
  {...restProps}
/>
