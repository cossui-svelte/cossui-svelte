<script lang="ts">
  import type { Snippet } from "svelte";
  import { Select } from "bits-ui";
  import { ChevronUp, ChevronDown } from "lucide-svelte";
  import { cn } from "$lib/utils.js";

  interface Props extends Select.ContentProps {
    children?: Snippet;
  }

  let { class: className, children, ...restProps }: Props = $props();
</script>

<Select.Portal>
  <Select.Content
    class="relative z-50 min-w-[var(--bits-select-anchor-width)] rounded-lg border bg-popover not-dark:bg-clip-padding text-foreground shadow-lg/5 before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] dark:before:shadow-[0_-1px_--theme(--color-white/6%)] data-[state=closed]:opacity-0 data-[state=open]:opacity-100 origin-[--bits-select-content-transform-origin]"
    data-slot="select-popup"
    {...restProps}
  >
    <Select.ScrollUpButton
      class="top-0 z-50 flex h-6 w-full cursor-default items-center justify-center before:pointer-events-none before:absolute before:inset-x-px before:top-px before:h-[200%] before:rounded-t-[calc(var(--radius-lg)-1px)] before:bg-linear-to-b before:from-50% before:from-popover"
      data-slot="select-scroll-up-button"
    >
      <ChevronUp class="relative size-4.5 sm:size-4" />
    </Select.ScrollUpButton>
    <Select.Viewport
      class={cn("max-h-[var(--bits-select-content-available-height)] overflow-y-auto p-1", className)}
      data-slot="select-list"
    >
      {@render children?.()}
    </Select.Viewport>
    <Select.ScrollDownButton
      class="bottom-0 z-50 flex h-6 w-full cursor-default items-center justify-center before:pointer-events-none before:absolute before:inset-x-px before:bottom-px before:h-[200%] before:rounded-b-[calc(var(--radius-lg)-1px)] before:bg-linear-to-t before:from-50% before:from-popover"
      data-slot="select-scroll-down-button"
    >
      <ChevronDown class="relative size-4.5 sm:size-4" />
    </Select.ScrollDownButton>
  </Select.Content>
</Select.Portal>
