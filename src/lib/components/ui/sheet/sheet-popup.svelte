<script lang="ts">
  import X from '@lucide/svelte/icons/x';
  import { Dialog as SheetPrimitive } from '@shardsui/svelte/dialog';
  import type { ComponentProps, Snippet } from 'svelte';
  import { buttonVariants } from '$lib/components/ui/button/button-variants';
  import { cn, type WithoutChildren } from '$lib/utils';
  import SheetBackdrop from './sheet-backdrop.svelte';
  import SheetViewport from './sheet-viewport.svelte';

  type Props = Omit<ComponentProps<typeof SheetPrimitive.Popup>, 'children'> & {
    children?: Snippet;
    showCloseButton?: boolean;
    side?: 'right' | 'left' | 'top' | 'bottom';
    variant?: 'default' | 'inset';
    closeProps?: WithoutChildren<ComponentProps<typeof SheetPrimitive.Close>>;
    portalProps?: WithoutChildren<ComponentProps<typeof SheetPrimitive.Portal>>;
  };

  let {
    ref = $bindable(null),
    class: className,
    children,
    side = 'right',
    variant = 'default',
    showCloseButton = true,
    closeProps,
    portalProps,
    ...restProps
  }: Props = $props();
</script>

<SheetPrimitive.Portal {...portalProps}>
  <SheetBackdrop />
  <SheetViewport {side} {variant}>
    <SheetPrimitive.Popup
      bind:ref
      class={cn(
        'relative flex max-h-full min-h-0 w-full min-w-0 flex-col bg-popover not-dark:bg-clip-padding text-popover-foreground shadow-lg/5 transition-[opacity,translate] duration-200 ease-in-out will-change-transform before:pointer-events-none before:absolute before:inset-0 before:shadow-[0_1px_--theme(--color-black/4%)] data-ending-style:opacity-0 data-starting-style:opacity-0 max-sm:before:hidden dark:before:shadow-[0_-1px_--theme(--color-white/6%)]',
        side === 'bottom' &&
          'row-start-2 border-t data-ending-style:translate-y-8 data-starting-style:translate-y-8',
        side === 'top' &&
          'border-b data-ending-style:-translate-y-8 data-starting-style:-translate-y-8',
        side === 'left' &&
          'w-[calc(100%-(--spacing(12)))] max-w-md border-e data-ending-style:-translate-x-8 data-starting-style:-translate-x-8',
        side === 'right' &&
          'col-start-2 w-[calc(100%-(--spacing(12)))] max-w-md border-s data-ending-style:translate-x-8 data-starting-style:translate-x-8',
        variant === 'inset' &&
          'before:hidden sm:rounded-2xl sm:border sm:before:rounded-[calc(var(--radius-2xl)-1px)] sm:**:data-[slot=sheet-footer]:rounded-b-[calc(var(--radius-2xl)-1px)]',
        className
      )}
      data-slot="sheet-popup"
      {...restProps}
    >
      {@render children?.()}
      {#if showCloseButton}
        <SheetPrimitive.Close
          aria-label="Close"
          class={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'absolute end-2 top-2')}
          data-slot="sheet-close"
          {...closeProps}
        >
          <X />
        </SheetPrimitive.Close>
      {/if}
    </SheetPrimitive.Popup>
  </SheetViewport>
</SheetPrimitive.Portal>
