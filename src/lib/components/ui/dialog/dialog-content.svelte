<script lang="ts">
  import XIcon from '@lucide/svelte/icons/x';
  import { Dialog as DialogPrimitive } from '@shardsui/svelte/dialog';
  import type { ComponentProps, Snippet } from 'svelte';
  import { buttonVariants } from '$lib/components/ui/button';
  import { cn, type WithoutChildren } from '$lib/utils';
  import DialogOverlay from './dialog-backdrop.svelte';
  import DialogPortal from './dialog-portal.svelte';

  type Props = Omit<ComponentProps<typeof DialogPrimitive.Popup>, 'children'> & {
    size?: 'default' | 'sm';
    bottomStickOnMobile?: boolean;
    portalProps?: WithoutChildren<ComponentProps<typeof DialogPortal>>;
    children: Snippet;
    showCloseButton?: boolean;
  };

  let {
    ref = $bindable(null),
    class: className,
    bottomStickOnMobile = true,
    size = 'default',
    portalProps,
    children,
    showCloseButton = true,
    ...restProps
  }: Props = $props();
</script>

<DialogPortal {...portalProps}>
  <DialogOverlay />
  <DialogPrimitive.Popup
    bind:ref
    data-slot="dialog-popup"
    data-size={size}
    class={cn(
      // Fixed full-screen layer
      'fixed z-50 flex w-full flex-col gap-0 p-0 outline-none group/dialog-content',
      // Appearance
      'bg-popover text-popover-foreground ring-1 ring-foreground/10',
      // Animation base
      'transition-[scale,opacity,translate] duration-200 ease-in-out will-change-transform',
      'data-starting-style:opacity-0 data-ending-style:opacity-0',
      // Desktop (sm+): centered dialog with zoom
      'sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2',
      'sm:rounded-xl',
      'data-[size=default]:sm:max-w-lg data-[size=sm]:sm:max-w-xs',
      'sm:data-starting-style:scale-95 sm:data-ending-style:scale-95',
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
  >
    {@render children?.()}
    {#if showCloseButton}
      <DialogPrimitive.Close
        aria-label="Close"
        class={cn(buttonVariants({ variant: 'ghost', size: 'icon-sm' }), 'absolute end-2 top-2')}
        data-slot="dialog-close"
      >
        <XIcon />
        <span class="sr-only">Close</span>
      </DialogPrimitive.Close>
    {/if}
  </DialogPrimitive.Popup>
</DialogPortal>
