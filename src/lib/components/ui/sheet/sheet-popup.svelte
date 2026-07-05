<script lang="ts">
  import X from "@lucide/svelte/icons/x";
  import { Dialog } from "bits-ui";
  import type { Snippet } from "svelte";
  import { cn } from "$lib/utils";

  interface Props extends Dialog.ContentProps {
    children?: Snippet;
    showCloseButton?: boolean;
    side?: "right" | "left" | "top" | "bottom";
    variant?: "default" | "inset";
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
      "pointer-events-none fixed inset-0 z-50",
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
        "pointer-events-auto relative flex max-h-full min-h-0 w-full min-w-0 flex-col bg-popover not-dark:bg-clip-padding text-popover-foreground shadow-lg/5 duration-200 ease-in-out will-change-transform before:pointer-events-none before:absolute before:inset-0 before:shadow-[0_1px_--theme(--color-black/4%)] max-sm:before:hidden dark:before:shadow-[0_-1px_--theme(--color-white/6%)]",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
        side === "bottom" &&
          "border-t data-[state=open]:slide-in-from-bottom-8 data-[state=closed]:slide-out-to-bottom-8",
        side === "top" &&
          "border-b data-[state=open]:slide-in-from-top-8 data-[state=closed]:slide-out-to-top-8",
        side === "left" &&
          "w-[calc(100%-3rem)] max-w-md border-e data-[state=open]:slide-in-from-left-8 data-[state=closed]:slide-out-to-left-8",
        side === "right" &&
          "w-[calc(100%-3rem)] max-w-md border-s data-[state=open]:slide-in-from-right-8 data-[state=closed]:slide-out-to-right-8",
        variant === "inset" &&
          "before:hidden sm:rounded-2xl sm:border sm:before:rounded-[calc(var(--radius-2xl)-1px)] sm:**:data-[slot=sheet-footer]:rounded-b-[calc(var(--radius-2xl)-1px)]",
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
