<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import { Separator } from '$lib/components/ui/separator';
  import { cn } from '$lib/utils';

  let {
    class: className,
    orientation = 'vertical',
    ...restProps
  }: ComponentProps<typeof Separator> = $props();
</script>

<Separator
  class={cn(
    'pointer-events-none relative bg-input before:absolute before:inset-0 dark:before:bg-input/32',
    className
  )}
  {orientation}
  {...restProps}
/>
