<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn, type WithElementRef } from '$lib/utils';

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
  bind:this={ref}
  class={cn(
    'col-start-2 nth-3:row-span-2 nth-3:row-start-1 inline-flex self-center justify-self-end',
    className
  )}
  data-slot="card-frame-action"
  {...restProps}
>
  {@render children?.()}
</div>
