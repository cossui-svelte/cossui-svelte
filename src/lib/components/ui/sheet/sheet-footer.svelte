<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/utils.js";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "bare";
    children?: Snippet;
  }

  let {
    class: className,
    variant = "default",
    children,
    ...restProps
  }: Props = $props();
</script>

<div
  class={cn(
    "flex flex-col-reverse gap-2 px-6 sm:flex-row sm:justify-end",
    variant === "default" && "border-t bg-muted/72 py-4",
    variant === "bare" &&
      "in-[[data-slot=sheet-popup]:has([data-slot=sheet-panel])]:pt-3 pt-4 pb-6",
    className,
  )}
  data-slot="sheet-footer"
  {...restProps}
>
  {@render children?.()}
</div>
