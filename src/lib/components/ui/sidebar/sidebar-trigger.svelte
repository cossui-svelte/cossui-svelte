<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { PanelLeft } from "@lucide/svelte";

  import { getSidebarContext } from "./sidebar-context.js";
  import { cn } from "$lib/utils.js";
  import { Button } from "$lib/components/ui/button";

  interface Props extends HTMLButtonAttributes {
    children?: Snippet;
  }

  let { class: className, onclick, children, ...restProps }: Props = $props();

  const ctx = getSidebarContext();

  function handleClick(
    event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement },
  ) {
    onclick?.(event);
    ctx.toggleSidebar();
  }
</script>

<Button
  class={cn("size-7", className)}
  data-sidebar="trigger"
  data-slot="sidebar-trigger"
  onclick={handleClick}
  size="icon"
  variant="ghost"
  {...restProps}
>
  {#if children}
    {@render children()}
  {:else}
    <PanelLeft />
    <span class="sr-only">Toggle Sidebar</span>
  {/if}
</Button>
