<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '#lib/utils.js';

  // Local stand-in for the original <Skeleton> (the ui kit's Skeleton wraps children instead of being a block).
  let { class: className, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div
  class={cn('animate-pulse rounded-sm bg-muted', className)}
  data-slot="skeleton"
  {...restProps}
></div>
