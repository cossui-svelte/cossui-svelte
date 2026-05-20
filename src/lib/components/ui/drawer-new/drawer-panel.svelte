<script lang="ts">
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import { cn } from '$lib/utils.js';
import { ScrollArea } from '../scroll-area/index.js';

interface Props extends HTMLAttributes<HTMLDivElement> {
  scrollFade?: boolean;
  scrollable?: boolean;
  allowSelection?: boolean;
  children?: Snippet;
}

let {
  class: className,
  scrollFade = true,
  scrollable = true,
  allowSelection = true,
  children,
  ...restProps
}: Props = $props();

const panelClass = cn(
  'p-6 in-[[data-slot=drawer-popup]:has([data-slot=drawer-header])]:pt-1 in-[[data-slot=drawer-popup]:has([data-slot=drawer-footer]:not(.border-t))]:pb-1',
  !allowSelection && 'cursor-default',
  className
);
</script>

{#if scrollable}
  <ScrollArea class="touch-auto" {scrollFade}>
    <div class={panelClass} data-slot="drawer-panel" {...restProps}>
      {@render children?.()}
    </div>
  </ScrollArea>
{:else}
  <div class={panelClass} data-slot="drawer-panel" {...restProps}>
    {@render children?.()}
  </div>
{/if}
