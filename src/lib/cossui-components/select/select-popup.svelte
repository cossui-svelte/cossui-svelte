<script lang="ts">
  import type { Snippet } from "svelte";
  import { Select } from "bits-ui";
  import { cn } from "../../utils.js";

  interface Props extends Select.ContentProps {
    children?: Snippet;
  }

  let { class: className, children, ...restProps }: Props = $props();
</script>

<Select.Portal>
  <Select.Content
    class={cn(
      "relative min-w-[var(--bits-select-anchor-width)] rounded-lg border bg-popover not-dark:bg-clip-padding text-foreground shadow-lg/5 before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] data-[state=closed]:opacity-0 data-[state=open]:opacity-100 dark:before:shadow-[0_-1px_--theme(--color-white/6%)]",
      className,
    )}
    data-slot="select-popup"
    {...restProps}
  >
    <Select.Viewport
      class="max-h-[var(--bits-select-content-available-height)] overflow-y-auto p-1"
      data-slot="select-list"
    >
      {@render children?.()}
    </Select.Viewport>
  </Select.Content>
</Select.Portal>
