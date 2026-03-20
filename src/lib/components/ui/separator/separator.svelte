<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/utils.js";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    orientation?: "horizontal" | "vertical";
    decorative?: boolean;
  }

  let {
    class: className,
    orientation = "horizontal",
    decorative = true,
    ...restProps
  }: Props = $props();
</script>

<div
  aria-orientation={decorative ? undefined : orientation}
  class={cn(
    "shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px data-[orientation=vertical]:not-[[class^='h-']]:not-[[class*='_h-']]:self-stretch",
    className,
  )}
  data-orientation={orientation}
  data-slot="separator"
  role={decorative ? "none" : "separator"}
  {...restProps}
></div>
