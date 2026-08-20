<script lang="ts">
  import { Dialog as DialogPrimitive } from '@shardsui/svelte/dialog';
  import type { HTMLAttributes } from 'svelte/elements';
  import { buttonVariants } from '$lib/components/ui/button';
  import { cn, type WithElementRef } from '$lib/utils';

  let {
    ref = $bindable(null),
    class: className,
    children,
    variant = 'default',
    showCloseButton = false,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    variant?: 'default' | 'bare';
    showCloseButton?: boolean;
  } = $props();
</script>

<div
  bind:this={ref}
  data-slot="dialog-footer"
  class={cn(
    'flex flex-col-reverse gap-2 px-6 sm:flex-row sm:justify-end sm:rounded-b-[calc(var(--radius-2xl)-1px)] max-sm:[&_button]:w-full',
    variant === 'default' && 'border-t bg-muted/72 py-4',
    variant === 'bare' &&
      'in-[[data-slot=dialog-popup]:has([data-slot=dialog-panel])]:pt-3 pt-4 pb-6',
    className
  )}
  {...restProps}
>
  {@render children?.()}
  {#if showCloseButton}
    <DialogPrimitive.Close class={buttonVariants({ variant: 'outline' })}
      >Close</DialogPrimitive.Close
    >
  {/if}
</div>
