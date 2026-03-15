<script lang="ts">
  import type { Snippet } from "svelte";
  import { Dialog } from "bits-ui";
  import { X } from "lucide-svelte";
  import { cn } from "../utils.js";

  interface Props extends Dialog.ContentProps {
    children?: Snippet;
    showCloseButton?: boolean;
    bottomStickOnMobile?: boolean;
  }

  let {
    class: className,
    children,
    showCloseButton = true,
    bottomStickOnMobile = true,
    ...restProps
  }: Props = $props();
</script>

<Dialog.Portal>
  <Dialog.Overlay
    class={cn(
      "fixed inset-0 z-50 bg-black/32 backdrop-blur-sm transition-all duration-200 data-[state=closed]:opacity-0 data-[state=open]:opacity-100",
    )}
    data-slot="dialog-backdrop"
  />
  <div
    class={cn(
      "fixed inset-0 z-50 grid grid-rows-[1fr_auto_3fr] justify-items-center p-4",
      bottomStickOnMobile && "max-sm:grid-rows-[1fr_auto] max-sm:p-0 max-sm:pt-12",
    )}
    data-slot="dialog-viewport"
  >
    <Dialog.Content
      class={cn(
        "relative row-start-2 flex max-h-full min-h-0 w-full min-w-0 max-w-lg origin-center flex-col rounded-2xl border bg-popover not-dark:bg-clip-padding text-popover-foreground shadow-lg/5 transition-[scale,opacity,translate] duration-200 ease-in-out will-change-transform before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-2xl)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] data-[state=closed]:opacity-0 data-[state=open]:opacity-100 sm:data-[state=closed]:scale-98 sm:data-[state=open]:scale-100 dark:before:shadow-[0_-1px_--theme(--color-white/6%)]",
        bottomStickOnMobile &&
          "max-sm:max-w-none max-sm:origin-bottom max-sm:rounded-none max-sm:border-x-0 max-sm:border-t max-sm:border-b-0 max-sm:before:hidden",
        className,
      )}
      data-slot="dialog-popup"
      {...restProps}
    >
      {@render children?.()}
      {#if showCloseButton}
        <Dialog.Close
          aria-label="Close"
          class="absolute end-2 top-2 inline-flex size-8 items-center justify-center rounded-lg border border-transparent text-foreground opacity-80 hover:bg-accent sm:size-7"
          data-slot="dialog-close"
        >
          <X class="size-4" />
        </Dialog.Close>
      {/if}
    </Dialog.Content>
  </div>
</Dialog.Portal>
