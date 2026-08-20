<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn, type WithElementRef } from '$lib/utils';
  import DrawerContent from './drawer-content.svelte';

  let {
    ref = $bindable(null),
    class: className,
    children,
    allowSelection = false,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    allowSelection?: boolean;
  } = $props();

  const headerClass = $derived(
    cn(
      'flex flex-col gap-2 p-6 in-[[data-slot=drawer-popup]:has([data-slot=drawer-panel])]:pb-3 max-sm:pb-4',
      !allowSelection && 'cursor-default',
      className
    )
  );
</script>

{#if allowSelection}
  <DrawerContent
    bind:ref
    data-slot="drawer-header"
    class={headerClass}
    {...restProps as Record<string, unknown>}
  >
    {@render children?.()}
  </DrawerContent>
{:else}
  <div bind:this={ref} data-slot="drawer-header" class={headerClass} {...restProps}>
    {@render children?.()}
  </div>
{/if}
