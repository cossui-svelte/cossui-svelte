<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/utils.js";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "bare";
    allowSelection?: boolean;
    children?: Snippet;
  }

  let {
    class: className,
    variant = "default",
    allowSelection = true,
    children,
    ...restProps
  }: Props = $props();
</script>

<div
  class={cn(
    "flex flex-col-reverse gap-2 px-6 sm:flex-row sm:justify-end",
    !allowSelection && "cursor-default",
    variant === "default" &&
      "border-t bg-muted/72 pt-4 pb-[calc(env(safe-area-inset-bottom,0px)+--spacing(4))]",
    variant === "bare" &&
      "in-[[data-slot=drawer-popup]:has([data-slot=drawer-panel])]:pt-3 pt-4 pb-[calc(env(safe-area-inset-bottom,0px)+--spacing(6))]",
    className,
  )}
  data-slot="drawer-footer"
  {...restProps}
>
  {@render children?.()}
</div>
