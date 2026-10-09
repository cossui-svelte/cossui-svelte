<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn, type WithElementRef } from '#lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLElement>> = $props();
</script>

<main
  bind:this={ref}
  class={cn(
    'relative flex w-full min-w-0 flex-1 flex-col border-sidebar-border bg-background not-dark:bg-clip-padding shadow-lg/5 before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-2xl)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] md:my-2 md:me-2 md:rounded-2xl md:border dark:before:shadow-[0_-1px_--theme(--color-white/6%)]',
    className
  )}
  data-slot="sidebar-inset"
  {...restProps}
>
  <div class="px-4 py-6 max-md:pb-24 md:p-6 xl:px-10">
    {@render children?.()}
  </div>
</main>
