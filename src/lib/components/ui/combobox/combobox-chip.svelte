<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/utils";
  import ComboboxChipRemove from "./combobox-chip-remove.svelte";

  interface Props extends HTMLAttributes<HTMLSpanElement> {
    children?: Snippet;
    removeProps?: HTMLAttributes<HTMLButtonElement>;
  }

  let {
    class: className,
    children,
    removeProps,
    ...restProps
  }: Props = $props();
</script>

<span
  class={cn(
    "flex items-center rounded-[calc(var(--radius-md)-1px)] bg-accent ps-2 font-medium text-accent-foreground text-sm outline-none sm:text-xs/(--text-xs--line-height) [&_svg:not([class*='size-'])]:size-4 sm:[&_svg:not([class*='size-'])]:size-3.5",
    className,
  )}
  data-slot="combobox-chip"
  {...restProps}
>
<div class="flex items-center gap-1.5">
  {@render children?.()}
  <ComboboxChipRemove {...removeProps} />
</div>
</span>
