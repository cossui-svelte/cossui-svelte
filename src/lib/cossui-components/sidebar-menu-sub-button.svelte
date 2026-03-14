<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAnchorAttributes } from "svelte/elements";
  import { cn } from "../utils.js";

  interface Props extends HTMLAnchorAttributes {
    size?: "sm" | "md";
    isActive?: boolean;
    children?: Snippet;
  }

  let {
    class: className,
    href,
    size = "md",
    isActive = false,
    children,
    ...restProps
  }: Props = $props();
</script>

<svelte:element
  this={href ? "a" : "button"}
  {href}
  type={!href ? "button" : undefined}
  class={cn(
    "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-lg px-2 text-sidebar-foreground outline-hidden ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg:not([class*='size-'])]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
    "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
    size === "sm" && "text-xs",
    size === "md" && "text-sm",
    "group-data-[collapsible=icon]:hidden",
    className,
  )}
  data-active={isActive}
  data-sidebar="menu-sub-button"
  data-size={size}
  data-slot="sidebar-menu-sub-button"
  {...restProps}
>
  {@render children?.()}
</svelte:element>
