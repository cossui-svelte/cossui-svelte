<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn, type WithElementRef } from "$lib/utils";
  import { ScrollArea } from "../scroll-area";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    scrollFade?: boolean;
    scrollable?: boolean;
    allowSelection?: boolean;
    children?: Snippet;
  }

  let {
    ref = $bindable(null),
    class: className,
    scrollFade = true,
    scrollable = true,
    allowSelection = true,
    children,
    ...restProps
  }: WithElementRef<Props> = $props();

  const panelClass = $derived(
    cn(
      "p-6 in-[[data-slot=drawer-popup]:has([data-slot=drawer-header])]:pt-1 in-[[data-slot=drawer-popup]:has([data-slot=drawer-footer]:not(.border-t))]:pb-1",
      !allowSelection && "cursor-default",
      className,
    ),
  );
</script>

{#if scrollable}
  <ScrollArea class="touch-auto" {scrollFade}>
    <div class={panelClass} data-slot="drawer-panel" {...restProps}>
      {@render children?.()}
    </div>
  </ScrollArea>
{:else}
  <div
    bind:this={ref}
    class={panelClass}
    data-slot="drawer-panel"
    {...restProps}
  >
    {@render children?.()}
  </div>
{/if}
