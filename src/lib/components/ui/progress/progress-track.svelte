<script lang="ts">
  import { Progress as ProgressPrimitive } from '@shardsui/svelte/progress';
  import type { ComponentProps, Snippet } from 'svelte';
  import { cn } from '$lib/utils';

  type Props = Omit<ComponentProps<typeof ProgressPrimitive.Track>, 'children'> & {
    children?: Snippet;
  };

  let { class: className, children, ...restProps }: Props = $props();
</script>

<ProgressPrimitive.Track
  class={cn('block h-1.5 w-full overflow-hidden rounded-full bg-input', className)}
  data-slot="progress-track"
  {...restProps}
>
  {@render children?.()}
</ProgressPrimitive.Track>
