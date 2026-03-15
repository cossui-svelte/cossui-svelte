<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import Skeleton from "../skeleton.svelte";
  import { cn } from "../../utils.js";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    showIcon?: boolean;
  }

  let { class: className, showIcon = false, ...restProps }: Props = $props();

  // Random width between 50–90% computed once at init
  const width = `${Math.floor(Math.random() * 40) + 50}%`;
</script>

<div
  class={cn("flex h-8 items-center gap-2 rounded-lg px-2", className)}
  data-sidebar="menu-skeleton"
  data-slot="sidebar-menu-skeleton"
  {...restProps}
>
  {#if showIcon}
    <Skeleton class="size-4 rounded-lg" data-sidebar="menu-skeleton-icon" />
  {/if}
  <Skeleton
    class="h-4 max-w-(--skeleton-width) flex-1"
    data-sidebar="menu-skeleton-text"
    style="--skeleton-width: {width};"
  />
</div>
