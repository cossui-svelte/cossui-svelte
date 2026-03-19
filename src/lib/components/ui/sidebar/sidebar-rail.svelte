<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { getSidebarContext } from "./sidebar-context.js";
  import { cn } from "$lib/utils.js";

  interface Props extends HTMLButtonAttributes {}

  let { class: className, ...restProps }: Props = $props();

  const ctx = getSidebarContext();
</script>

<button
  aria-label="Toggle Sidebar"
  class={cn(
    "absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex",
    "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
    "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
    "group-data-[collapsible=offcanvas]:translate-x-0 hover:group-data-[collapsible=offcanvas]:bg-sidebar group-data-[collapsible=offcanvas]:after:left-full",
    "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
    "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
    className,
  )}
  data-sidebar="rail"
  data-slot="sidebar-rail"
  onclick={ctx.toggleSidebar}
  tabindex={-1}
  title="Toggle Sidebar"
  type="button"
  {...restProps}
></button>
