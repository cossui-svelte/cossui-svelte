<script lang="ts">
  import { Tooltip } from "bits-ui";
  import Check from "@lucide/svelte/icons/check";
import Copy from "@lucide/svelte/icons/copy";
  import { cn } from "$lib/utils.js";
  import { buttonVariants } from "$lib/components/ui/button";

  interface Props {
    value: string;
    class?: string;
    variant?:
      | "ghost"
      | "outline"
      | "default"
      | "secondary"
      | "destructive"
      | "link"
      | "destructive-outline";
  }

  let { value, class: className, variant = "ghost" }: Props = $props();

  let isCopied = $state(false);
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(value);
      isCopied = true;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        isCopied = false;
      }, 2000);
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
    }
  }
</script>

<Tooltip.Provider>
  <Tooltip.Root>
    <Tooltip.Trigger>
      {#snippet child({ props })}
        <button
          {...props}
          class={cn(
            buttonVariants({ size: "icon", variant }),
            "absolute top-1.5 right-1.5 z-3 size-9 bg-code opacity-70 hover:opacity-100 focus-visible:opacity-100 sm:size-8",
            className,
          )}
          data-slot="copy-button"
          onclick={copyToClipboard}
          type="button"
        >
          <span class="sr-only">Copy</span>
          {#if isCopied}
            <Check class="size-4" strokeWidth={2} />
          {:else}
            <Copy class="size-4" strokeWidth={2} />
          {/if}
        </button>
      {/snippet}
    </Tooltip.Trigger>
    <Tooltip.Portal>
      <Tooltip.Content
        class="relative flex origin-[--bits-tooltip-content-transform-origin] text-balance rounded-md border bg-popover not-dark:bg-clip-padding text-popover-foreground text-xs shadow-md/5 transition-[scale,opacity] before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-md)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] data-[state=closed]:scale-98 data-[state=closed]:opacity-0 data-[state=open]:scale-100 data-[state=open]:opacity-100 dark:before:shadow-[0_-1px_--theme(--color-white/6%)]"
        sideOffset={4}
      >
        <div class="relative size-full overflow-clip px-2 py-1">
          {isCopied ? "Copied" : "Copy to Clipboard"}
        </div>
      </Tooltip.Content>
    </Tooltip.Portal>
  </Tooltip.Root>
</Tooltip.Provider>
