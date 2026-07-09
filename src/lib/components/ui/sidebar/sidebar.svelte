<script lang="ts">
  import { Dialog } from "bits-ui";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/utils";
  import Sheet from "../sheet/sheet.svelte";
  import SheetPopup from "../sheet/sheet-popup.svelte";
  import { getSidebarContext } from "./sidebar-context.js";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    children?: Snippet;
    collapsible?: "offcanvas" | "icon" | "none";
    side?: "left" | "right";
    variant?: "sidebar" | "floating" | "inset";
  }

  let {
    class: className,
    side = "left",
    variant = "sidebar",
    collapsible = "offcanvas",
    children,
    ...restProps
  }: Props = $props();

  const ctx = getSidebarContext();
</script>

{#if collapsible === "none"}
  <div
    class={cn(
      "flex h-full w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground",
      className,
    )}
    data-slot="sidebar"
    {...restProps}
  >
    {@render children?.()}
  </div>
{:else if ctx.isMobile}
  <Sheet open={ctx.openMobile} onOpenChange={ctx.setOpenMobile}>
    <SheetPopup
      class={cn(
        "w-(--sidebar-width) bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden",
        className,
      )}
      data-mobile="true"
      data-sidebar="sidebar"
      data-slot="sidebar"
      {side}
      style="--sidebar-width: 18rem;"
    >
      <DialogTitle class="sr-only">Sidebar</DialogTitle>
      <DialogDescription class="sr-only">Displays the mobile sidebar.</DialogDescription>
      <div class="flex h-full w-full flex-col">
        {@render children?.()}
      </div>
    </SheetPopup>
  </Sheet>
{:else}
  <div
    class="group peer hidden text-sidebar-foreground md:block"
    data-collapsible={ctx.state === "collapsed" ? collapsible : ""}
    data-side={side}
    data-slot="sidebar"
    data-state={ctx.state}
    data-variant={variant}
  >
    <!-- Gap element for desktop layout -->
    <div
      class={cn(
        "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
        "group-data-[collapsible=offcanvas]:w-0",
        "group-data-[side=right]:rotate-180",
        variant === "floating" || variant === "inset"
          ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
          : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)",
      )}
      data-slot="sidebar-gap"
    ></div>
    <!-- Fixed sidebar container -->
    <div
      class={cn(
        "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
        side === "left"
          ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
          : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
        variant === "floating" || variant === "inset"
          ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
          : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
        className,
      )}
      data-slot="sidebar-container"
      {...restProps}
    >
      <div
        class="flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow-sm/5"
        data-sidebar="sidebar"
        data-slot="sidebar-inner"
      >
        {@render children?.()}
      </div>
    </div>
  </div>
{/if}
