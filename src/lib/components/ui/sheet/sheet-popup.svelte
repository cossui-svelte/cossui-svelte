<script lang="ts">
  import type { Snippet } from "svelte";
  import { Dialog } from "bits-ui";
  import { X } from "lucide-svelte";
  import { cn } from "$lib/utils.js";

  interface Props extends Dialog.ContentProps {
    children?: Snippet;
    side?: "right" | "left" | "top" | "bottom";
    variant?: "default" | "inset";
    showCloseButton?: boolean;
  }

  let {
    class: className,
    children,
    side = "right",
    variant = "default",
    showCloseButton = true,
    ...restProps
  }: Props = $props();
</script>

<Dialog.Portal>
  <Dialog.Overlay
    class="fixed inset-0 z-50 bg-black/32 backdrop-blur-sm transition-all duration-200 data-[state=closed]:opacity-0 data-[state=open]:opacity-100"
    data-slot="sheet-backdrop"
  />
  <div
    class={cn(
      "fixed inset-0 z-50",
      side === "bottom" && "flex flex-col justify-end pt-12",
      side === "top" && "flex flex-col pb-12",
      side === "left" && "flex justify-start",
      side === "right" && "flex justify-end",
      variant === "inset" && "sm:p-4",
    )}
    data-slot="sheet-viewport"
  >
    <Dialog.Content
      class={cn(
        "relative flex max-h-full min-h-0 w-full min-w-0 flex-col bg-popover not-dark:bg-clip-padding text-popover-foreground shadow-lg/5 transition-[opacity,translate] duration-200 ease-in-out will-change-transform before:pointer-events-none before:absolute before:inset-0 before:shadow-[0_1px_--theme(--color-black/4%)] data-[state=closed]:opacity-0 data-[state=open]:opacity-100 dark:before:shadow-[0_-1px_--theme(--color-white/6%)]",
        side === "bottom" && "border-t",
        side === "top" && "border-b",
        side === "left" &&
          "w-[calc(100%-3rem)] max-w-md border-e data-[state=closed]:-translate-x-8 data-[state=open]:translate-x-0",
        side === "right" &&
          "w-[calc(100%-3rem)] max-w-md border-s data-[state=closed]:translate-x-8 data-[state=open]:translate-x-0",
        variant === "inset" && "sm:rounded-2xl sm:border",
        className,
      )}
      data-slot="sheet-popup"
      {...restProps}
    >
      {@render children?.()}
      {#if showCloseButton}
        <Dialog.Close
          aria-label="Close"
          class="absolute end-2 top-2 inline-flex size-8 items-center justify-center rounded-lg border border-transparent text-foreground opacity-80 hover:bg-accent sm:size-7"
          data-slot="sheet-close"
        >
          <X class="size-4" />
        </Dialog.Close>
      {/if}
    </Dialog.Content>
  </div>
</Dialog.Portal>
