<script lang="ts">
  import { Progress as ProgressPrimitive } from '@shardsui/svelte/progress';
  import type { ComponentProps, Snippet } from 'svelte';
  import { cn } from '$lib/utils';

  type Props = Omit<ComponentProps<typeof ProgressPrimitive.Label>, 'children'> & {
    children?: Snippet;
  };

  let { class: className, children, ...restProps }: Props = $props();
</script>

<ProgressPrimitive.Label
  class={cn('font-medium text-foreground text-sm', className)}
  data-slot="progress-label"
  {...restProps}
>
  {@render children?.()}
</ProgressPrimitive.Label>
