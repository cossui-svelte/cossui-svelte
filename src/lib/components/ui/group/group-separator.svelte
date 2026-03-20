<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/utils.js";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    orientation?: "horizontal" | "vertical";
  }

  let {
    class: className,
    orientation = "vertical",
    ...restProps
  }: Props = $props();
</script>

<div
  aria-orientation={orientation}
  class={cn(
    "pointer-events-none relative z-2 bg-input before:absolute before:inset-0 dark:before:bg-input/32",
    orientation === "vertical" ? "w-px self-stretch" : "h-px w-full",
    className,
  )}
  data-orientation={orientation}
  data-slot="separator"
  role="separator"
  {...restProps}
></div>
