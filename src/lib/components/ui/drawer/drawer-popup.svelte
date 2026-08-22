<script lang="ts">
  import XIcon from '@lucide/svelte/icons/x';
  import { Drawer as DrawerPrimitive } from '@shardsui/svelte/drawer';
  import type { ComponentProps, Snippet } from 'svelte';
  import { getContext } from 'svelte';
  import { buttonVariants } from '$lib/components/ui/button/button-variants';
  import { cn, type WithoutChildren } from '$lib/utils';
  import DrawerBackdrop from './drawer-backdrop.svelte';
  import DrawerBar from './drawer-bar.svelte';
  import DrawerClose from './drawer-close.svelte';
  import DrawerPortal from './drawer-portal.svelte';
  import DrawerViewport from './drawer-viewport.svelte';

  type DrawerPosition = 'right' | 'left' | 'top' | 'bottom';

  type Props = Omit<ComponentProps<typeof DrawerPrimitive.Popup>, 'children'> & {
    children?: Snippet;
    showCloseButton?: boolean;
    position?: DrawerPosition;
    variant?: 'default' | 'straight' | 'inset';
    showBar?: boolean;
    portalProps?: WithoutChildren<ComponentProps<typeof DrawerPortal>>;
  };

  let {
    ref = $bindable(null),
    class: className,
    children,
    showCloseButton = false,
    position: positionProp,
    variant = 'default',
    showBar = false,
    portalProps,
    ...restProps
  }: Props = $props();

  const ctx = getContext<{ position: () => DrawerPosition } | undefined>('drawer-position');
  const position = $derived(positionProp ?? ctx?.position() ?? 'bottom');
</script>

<DrawerPortal {...portalProps}>
  <DrawerBackdrop />
  <DrawerViewport {position} {variant}>
    <DrawerPrimitive.Popup
      bind:ref
      class={cn(
        'relative flex max-h-full min-h-0 w-full min-w-0 flex-col bg-popover not-dark:bg-clip-padding text-popover-foreground shadow-lg/5 outline-none transition-[transform,box-shadow,height,background-color] duration-450 ease-[cubic-bezier(0.32,0.72,0,1)] will-change-transform [--peek:calc(--spacing(6)-1px)] [--scale-base:calc(max(0,1-(var(--nested-drawers)*var(--stack-step))))] [--scale:clamp(0,calc(var(--scale-base)+(var(--stack-step)*var(--stack-progress))),1)] [--shrink:calc(1-var(--scale))] [--stack-peek-offset:max(0px,calc((var(--nested-drawers)-var(--stack-progress))*var(--peek)))] [--stack-progress:clamp(0,var(--drawer-swipe-progress),1)] [--stack-step:0.05] before:pointer-events-none before:absolute before:inset-0 before:shadow-[0_1px_--theme(--color-black/4%)] after:pointer-events-none after:absolute after:bg-popover data-swiping:select-none data-nested-drawer-open:overflow-hidden data-nested-drawer-open:bg-[color-mix(in_srgb,var(--popover),var(--color-black)_calc(2%*(var(--nested-drawers)-var(--stack-progress))))] data-ending-style:shadow-transparent data-starting-style:shadow-transparent data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] dark:data-nested-drawer-open:bg-[color-mix(in_srgb,var(--popover),var(--color-black)_calc(6%*(var(--nested-drawers)-var(--stack-progress))))] dark:before:shadow-[0_-1px_--theme(--color-white/6%)]',
        'touch-none',
        position === 'bottom' &&
          'transform-[translateY(calc(var(--drawer-snap-point-offset)+var(--drawer-swipe-movement-y)))] data-ending-style:transform-[translateY(calc(100%+env(safe-area-inset-bottom,0px)+var(--inset)))] data-starting-style:transform-[translateY(calc(100%+env(safe-area-inset-bottom,0px)+var(--inset)))] row-start-2 -mb-[max(0px,calc(var(--drawer-snap-point-offset,0px)+clamp(0,1,var(--drawer-snap-point-offset,0px)/1px)*var(--drawer-swipe-movement-y,0px)))] border-t pb-[max(0px,calc(env(safe-area-inset-bottom,0px)+var(--drawer-snap-point-offset,0px)+clamp(0,1,var(--drawer-snap-point-offset,0px)/1px)*var(--drawer-swipe-movement-y,0px)))] not-data-starting-style:not-data-ending-style:transition-[transform,box-shadow,height,background-color,margin,padding] after:inset-x-0 after:top-full after:h-(--bleed) has-data-[slot=drawer-bar]:pt-2 data-ending-style:mb-0 data-starting-style:mb-0 data-ending-style:pb-0 data-starting-style:pb-0',
        position === 'top' &&
          'data-starting-style:transform-[translateY(calc(-100%-var(--inset)))] data-ending-style:transform-[translateY(calc(-100%-var(--inset)))] transform-[translateY(var(--drawer-swipe-movement-y))] border-b after:inset-x-0 after:bottom-full after:h-(--bleed) has-data-[slot=drawer-bar]:pb-2',
        position === 'left' &&
          'data-starting-style:transform-[translateX(calc(-100%-var(--inset)))] data-ending-style:transform-[translateX(calc(-100%-var(--inset)))] transform-[translateX(var(--drawer-swipe-movement-x))] w-[calc(100%-(--spacing(12)))] max-w-md border-e after:inset-y-0 after:end-full after:w-(--bleed) has-data-[slot=drawer-bar]:pe-2',
        position === 'right' &&
          'transform-[translateX(var(--drawer-swipe-movement-x))] data-ending-style:transform-[translateX(calc(100%+var(--inset)))] data-starting-style:transform-[translateX(calc(100%+var(--inset)))] col-start-2 w-[calc(100%-(--spacing(12)))] max-w-md border-s after:inset-y-0 after:start-full after:w-(--bleed) has-data-[slot=drawer-bar]:ps-2',
        variant !== 'straight' &&
          cn(
            position === 'bottom' && 'rounded-t-2xl',
            position === 'top' &&
              'rounded-b-2xl **:data-[slot=drawer-footer]:rounded-b-[calc(var(--radius-2xl)-1px)]',
            position === 'left' &&
              'rounded-e-2xl **:data-[slot=drawer-footer]:rounded-ee-[calc(var(--radius-2xl)-1px)]',
            position === 'right' &&
              'rounded-s-2xl **:data-[slot=drawer-footer]:rounded-es-[calc(var(--radius-2xl)-1px)]'
          ),
        variant === 'default' &&
          cn(
            position === 'bottom' && 'before:rounded-t-[calc(var(--radius-2xl)-1px)]',
            position === 'top' && 'before:rounded-b-[calc(var(--radius-2xl)-1px)]',
            position === 'left' && 'before:rounded-e-[calc(var(--radius-2xl)-1px)]',
            position === 'right' && 'before:rounded-s-[calc(var(--radius-2xl)-1px)]'
          ),
        variant === 'inset' &&
          'before:hidden sm:rounded-2xl sm:border sm:after:bg-transparent sm:before:rounded-[calc(var(--radius-2xl)-1px)] sm:**:data-[slot=drawer-footer]:rounded-b-[calc(var(--radius-2xl)-1px)]',
        variant === 'straight' && '[--stack-step:0]',
        (position === 'bottom' || position === 'top') &&
          'h-(--drawer-height,auto) [--height:max(0px,calc(var(--drawer-frontmost-height,var(--drawer-height))))] data-nested-drawer-open:h-(--height)',
        position === 'bottom' &&
          'data-nested-drawer-open:transform-[translateY(calc(var(--drawer-swipe-movement-y)-var(--stack-peek-offset)-(var(--shrink)*var(--height))))_scale(var(--scale))] origin-[50%_calc(100%-var(--inset))]',
        position === 'top' &&
          'data-nested-drawer-open:transform-[translateY(calc(var(--drawer-swipe-movement-y)+var(--stack-peek-offset)+(var(--shrink)*var(--height))))_scale(var(--scale))] origin-[50%_var(--inset)]',
        position === 'left' &&
          'data-nested-drawer-open:transform-[translateX(calc(var(--drawer-swipe-movement-x)+var(--stack-peek-offset)))_scale(var(--scale))] origin-right',
        position === 'right' &&
          'data-nested-drawer-open:transform-[translateX(calc(var(--drawer-swipe-movement-x)-var(--stack-peek-offset)))_scale(var(--scale))] origin-left',
        className
      )}
      data-slot="drawer-popup"
      {...restProps}
    >
      {@render children?.()}
      {#if showCloseButton}
        <DrawerClose
          aria-label="Close"
          class={cn(buttonVariants({ size: 'icon', variant: 'ghost' }), 'absolute end-2 top-2')}
        >
          <XIcon />
        </DrawerClose>
      {/if}
      {#if showBar}
        <DrawerBar {position} />
      {/if}
    </DrawerPrimitive.Popup>
  </DrawerViewport>
</DrawerPortal>
