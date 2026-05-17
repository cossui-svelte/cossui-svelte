<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { Dialog as DialogPrimitive } from "bits-ui";
  import { cn } from "$lib/utils.js";
  import { DialogBackdrop, DialogPortal } from "$lib/components/ui/dialog/index.js";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    children?: Snippet;
  }

  let { class: className, children, ...restProps }: Props = $props();
</script>

<DialogPortal>
  <DialogBackdrop />
  <DialogPrimitive.Content
    class="fixed inset-0 z-50 flex flex-col items-center px-4 py-[max(--spacing(4),4vh)] outline-none sm:py-[10vh]"
    data-slot="command-dialog-content"
  >
    <div
      class={cn(
        "relative flex max-h-105 min-h-0 w-full min-w-0 max-w-xl flex-col rounded-2xl border bg-popover not-dark:bg-clip-padding text-popover-foreground shadow-lg/5 outline-none transition-[scale,opacity] duration-200 ease-in-out will-change-transform before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-2xl)-1px)] before:bg-muted/72 before:shadow-[0_1px_--theme(--color-black/4%)] dark:before:shadow-[0_-1px_--theme(--color-white/6%)]",
        className,
      )}
      data-slot="command-dialog-popup"
      {...restProps}
    >
      {@render children?.()}
    </div>
  </DialogPrimitive.Content>
</DialogPortal>
