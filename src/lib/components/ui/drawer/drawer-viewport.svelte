<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/utils.js";

  type DrawerPosition = "right" | "left" | "top" | "bottom";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    position?: DrawerPosition;
    variant?: "default" | "straight" | "inset";
    children?: Snippet;
  }

  let {
    class: className,
    position = "bottom",
    variant = "default",
    children,
    ...restProps
  }: Props = $props();
</script>

<div
  class={cn(
    "fixed inset-0 z-50 touch-none [--bleed:--spacing(12)] [--inset:--spacing(0)]",
    position === "bottom" && "grid grid-rows-[1fr_auto] pt-12",
    position === "top" && "grid grid-rows-[auto_1fr] pb-12",
    position === "left" && "flex justify-start",
    position === "right" && "flex justify-end",
    variant === "inset" && "px-(--inset) sm:[--inset:--spacing(4)]",
    variant === "inset" && position !== "bottom" && "pt-(--inset)",
    variant === "inset" && position !== "top" && "pb-(--inset)",
    className,
  )}
  data-slot="drawer-viewport"
  {...restProps}
>
  {@render children?.()}
</div>
