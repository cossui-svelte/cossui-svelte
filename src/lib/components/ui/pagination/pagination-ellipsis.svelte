<script lang="ts">
  import Ellipsis from '@lucide/svelte/icons/ellipsis';
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn, type WithElementRef, type WithoutChildren } from '$lib/utils';

  let {
    class: className,
    ref = $bindable(null),
    ...restProps
  }: WithoutChildren<WithElementRef<HTMLAttributes<HTMLSpanElement>>> = $props();
</script>

<span
  bind:this={ref}
  aria-hidden="true"
  class={cn('flex min-w-7 justify-center', className)}
  data-slot="pagination-ellipsis"
  {...restProps}
>
  <Ellipsis class="size-5 sm:size-4" />
  <span class="sr-only">More pages</span>
</span>
