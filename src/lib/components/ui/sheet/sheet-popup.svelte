<script lang="ts">
  import X from '@lucide/svelte/icons/x';
  import { Dialog as SheetPrimitive } from '@shardsui/svelte/dialog';
  import type { ComponentProps, Snippet } from 'svelte';
  import { cn, type WithoutChildren } from '$lib/utils';

  type Props = Omit<ComponentProps<typeof SheetPrimitive.Popup>, 'children'> & {
    children?: Snippet;
    showCloseButton?: boolean;
    side?: 'right' | 'left' | 'top' | 'bottom';
    variant?: 'default' | 'inset';
    portalProps?: WithoutChildren<ComponentProps<typeof SheetPrimitive.Portal>>;
  };

  let {
    ref = $bindable(null),
    class: className,
    children,
    side = 'right',
    variant = 'default',
    showCloseButton = true,
    portalProps,
    ...restProps
  }: Props = $props();
</script>

<SheetPrimitive.Portal {...portalProps}>
  <SheetPrimitive.Backdrop
    class="fixed inset-0 z-50 bg-black/32 backdrop-blur-sm transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0"
    data-slot="sheet-backdrop"
  />
  <div
    class={cn(
      'pointer-events-none fixed inset-0 z-50',
      side === 'bottom' && 'flex flex-col justify-end pt-12',
      side === 'top' && 'flex flex-col pb-12',
      side === 'left' && 'flex justify-start',
      side === 'right' && 'flex justify-end',
      variant === 'inset' && 'sm:p-4'
    )}
    data-slot="sheet-viewport"
  >
    <SheetPrimitive.Popup
      bind:ref
      class={cn(
        'pointer-events-auto relative flex max-h-full min-h-0 w-full min-w-0 flex-col bg-popover not-dark:bg-clip-padding text-popover-foreground shadow-lg/5 outline-none transition-[opacity,translate] duration-200 ease-in-out will-change-transform before:pointer-events-none before:absolute before:inset-0 before:shadow-[0_1px_--theme(--color-black/4%)] max-sm:before:hidden dark:before:shadow-[0_-1px_--theme(--color-white/6%)]',
        'data-starting-style:opacity-0 data-ending-style:opacity-0',
        side === 'bottom' &&
          'border-t data-starting-style:translate-y-full data-ending-style:translate-y-full',
        side === 'top' &&
          'border-b data-starting-style:-translate-y-full data-ending-style:-translate-y-full',
        side === 'left' &&
          'w-[calc(100%-3rem)] max-w-md border-e data-starting-style:-translate-x-full data-ending-style:-translate-x-full',
        side === 'right' &&
          'w-[calc(100%-3rem)] max-w-md border-s data-starting-style:translate-x-full data-ending-style:translate-x-full',
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
          class="absolute end-2 top-2 inline-flex size-8 items-center justify-center rounded-lg border border-transparent text-foreground opacity-80 hover:bg-accent sm:size-7"
          data-slot="sheet-close"
        >
          <X class="size-4" />
        </SheetPrimitive.Close>
      {/if}
    </SheetPrimitive.Popup>
  </div>
</SheetPrimitive.Portal>
