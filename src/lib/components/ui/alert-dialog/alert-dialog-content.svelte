<script lang="ts">
  import { AlertDialog as AlertDialogPrimitive } from '@shardsui/svelte/alert-dialog';
  import type { ComponentProps } from 'svelte';
  import { cn, type WithoutChildrenOrChild } from '$lib/utils';
  import AlertDialogOverlay from './alert-dialog-overlay.svelte';
  import AlertDialogPortal from './alert-dialog-portal.svelte';

  let {
    ref = $bindable(null),
    class: className,
    bottomStickOnMobile = true,
    size = 'default',
    portalProps,
    ...restProps
  }: ComponentProps<typeof AlertDialogPrimitive.Popup> & {
    size?: 'default' | 'sm';
    bottomStickOnMobile?: boolean;
    portalProps?: WithoutChildrenOrChild<ComponentProps<typeof AlertDialogPortal>>;
  } = $props();
</script>

<AlertDialogPortal {...portalProps}>
  <AlertDialogOverlay />

  <AlertDialogPrimitive.Viewport
    data-slot="alert-dialog-viewport"
    class={cn(
      'fixed inset-0 z-50 grid grid-rows-[1fr_auto_3fr] justify-items-center p-4',
      bottomStickOnMobile && 'max-sm:grid-rows-[1fr_auto] max-sm:p-0 max-sm:pt-12'
    )}
  >
    <AlertDialogPrimitive.Popup
      bind:ref
      data-slot="alert-dialog-popup"
      data-size={size}
      class={cn(
        // Fixed full-screen layer
        'fixed z-50 flex w-full flex-col gap-0 p-0 outline-none group/alert-dialog-content',
        // Appearance
        'bg-popover text-popover-foreground ring-1 ring-foreground/10',
        // Animation base
        'opacity-[calc(1-var(--nested-dialogs))] transition-[scale,opacity,translate] duration-200 ease-in-out will-change-transform',
        'data-starting-style:opacity-0 data-ending-style:opacity-0',
        // Desktop (sm+): centered dialog with zoom
        'sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2',
        'sm:rounded-xl',
        'data-[size=default]:sm:max-w-lg data-[size=sm]:sm:max-w-xs',
        'sm:scale-[calc(1-0.1*var(--nested-dialogs))] sm:data-starting-style:scale-95 sm:data-ending-style:scale-95',
        // Mobile: bottom sheet (when bottomStickOnMobile)
        bottomStickOnMobile && [
          'max-sm:bottom-0 max-sm:inset-x-0 max-sm:max-w-none max-sm:translate-y-0',
          'max-sm:border-t',
          'max-sm:data-starting-style:translate-y-full max-sm:data-ending-style:translate-y-full'
        ],
        // Mobile: centered (when not bottom-sticky)
        !bottomStickOnMobile && [
          'max-sm:top-1/2 max-sm:left-1/2 max-sm:-translate-x-1/2 max-sm:-translate-y-1/2',
          'max-sm:rounded-xl',
          'data-[size=default]:max-sm:max-w-xs',
          'max-sm:data-starting-style:scale-95 max-sm:data-ending-style:scale-95'
        ],
        className
      )}
      {...restProps}
    />
  </AlertDialogPrimitive.Viewport>
</AlertDialogPortal>
