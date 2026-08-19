<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn, type WithElementRef } from '$lib/utils';
  import { ScrollArea } from '../scroll-area';
  import DrawerContent from './drawer-content.svelte';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    allowSelection?: boolean;
    children?: Snippet;
    scrollable?: boolean;
    scrollFade?: boolean;
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
      'p-6 in-[[data-slot=drawer-popup]:has([data-slot=drawer-header])]:pt-1 in-[[data-slot=drawer-popup]:has([data-slot=drawer-footer]:not(.border-t))]:pb-1',
      !allowSelection && 'cursor-default',
      className
    )
  );
</script>

{#snippet panel()}
  {#if allowSelection}
    <DrawerContent
      bind:ref
      class={panelClass}
      data-slot="drawer-panel"
      {...restProps as Record<string, unknown>}
    >
      {@render children?.()}
    </DrawerContent>
  {:else}
    <div bind:this={ref} class={panelClass} data-slot="drawer-panel" {...restProps}>
      {@render children?.()}
    </div>
  {/if}
{/snippet}

{#if scrollable}
  <ScrollArea class="touch-auto" {scrollFade}>
    {@render panel()}
  </ScrollArea>
{:else}
  {@render panel()}
{/if}
