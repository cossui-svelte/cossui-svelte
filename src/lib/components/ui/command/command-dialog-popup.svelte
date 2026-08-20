<script lang="ts">
  import { Dialog as DialogPrimitive } from '@shardsui/svelte/dialog';
  import type { ComponentProps, Snippet } from 'svelte';
  import { DialogBackdrop, DialogPortal } from '$lib/components/ui/dialog';
  import { cn } from '$lib/utils';

  type Props = Omit<ComponentProps<typeof DialogPrimitive.Popup>, 'children'> & {
    children?: Snippet;
  };

  let { ref = $bindable(null), class: className, children, ...restProps }: Props = $props();
</script>

<DialogPortal>
  <DialogBackdrop />
  <DialogPrimitive.Popup
    bind:ref
    aria-label="Command palette"
    class={cn(
      'fixed top-[max(--spacing(4),4vh)] left-1/2 z-50 flex max-h-105 w-[calc(100%-2rem)] min-w-0 max-w-xl min-h-0 -translate-x-1/2 flex-col rounded-2xl border bg-popover not-dark:bg-clip-padding text-popover-foreground shadow-lg/5 outline-none transition-[opacity,transform,scale] duration-200 ease-in-out will-change-transform data-ending-style:-translate-y-4 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:-translate-y-4 data-starting-style:scale-95 data-starting-style:opacity-0 sm:top-[10vh] before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-2xl)-1px)] before:bg-muted/72 before:shadow-[0_1px_--theme(--color-black/4%)] dark:before:shadow-[0_-1px_--theme(--color-white/6%)]',
      className
    )}
    data-slot="command-dialog-popup"
    {...restProps}
  >
    {@render children?.()}
  </DialogPrimitive.Popup>
</DialogPortal>
