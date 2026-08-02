<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '$lib/utils.js';

  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'class'> {
    children?: import('svelte').Snippet;
    class?: string;
    position?: 'top' | 'bottom';
  }

  let { children, class: className, position = 'top', ...restProps }: Props = $props();

  const positionClasses = {
    top: 'bottom-full mb-1',
    bottom: 'top-full mt-1'
  };
</script>

<div
  data-slot="marker-label"
  class={cn(
    'absolute left-1/2 -translate-x-1/2 whitespace-nowrap',
    'text-foreground text-[10px] font-medium',
    positionClasses[position],
    className
  )}
  {...restProps}
>
  {@render children?.()}
</div>
