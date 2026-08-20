<script lang="ts">
  import { Progress as ProgressPrimitive } from '@shardsui/svelte/progress';
  import type { ComponentProps } from 'svelte';
  import { cn } from '$lib/utils';

  let { class: className, ...restProps }: ComponentProps<typeof ProgressPrimitive.Value> = $props();
</script>

<ProgressPrimitive.Value
  class={cn('text-foreground text-sm tabular-nums', className)}
  data-slot="progress-value"
  {...restProps}
>
  {#snippet children(formatted)}
    {formatted === 'indeterminate' ? '—' : formatted}
  {/snippet}
</ProgressPrimitive.Value>
