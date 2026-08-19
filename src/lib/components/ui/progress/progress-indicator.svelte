<script lang="ts">
  import { Progress as ProgressPrimitive } from '@shardsui/svelte/progress';
  import type { ComponentProps, Snippet } from 'svelte';
  import { cn } from '$lib/utils';

  type Props = Omit<ComponentProps<typeof ProgressPrimitive.Indicator>, 'children'> & {
    children?: Snippet;
  };

  let { class: className, children, ...restProps }: Props = $props();
</script>

<ProgressPrimitive.Indicator
  class={cn(
    'h-full bg-primary transition-all duration-500 data-indeterminate:w-full data-indeterminate:animate-indeterminate-progress',
    className
  )}
  data-slot="progress-indicator"
  {...restProps}
>
  {@render children?.()}
</ProgressPrimitive.Indicator>
