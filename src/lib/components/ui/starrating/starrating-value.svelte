<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '$lib/utils';

  interface Props extends HTMLAttributes<HTMLSpanElement> {
    max?: number;
    value: number;
  }

  let { class: className, max, value, ...restProps }: Props = $props();
</script>

<span
  class={cn('text-sm text-muted-foreground', className)}
  data-slot="starrating-value"
  {...restProps}
>
  {value}{max ? ` / ${max}` : ''}
</span>
