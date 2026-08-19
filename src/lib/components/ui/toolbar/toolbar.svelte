<script lang="ts">
  import { Toolbar as ToolbarPrimitive } from '@shardsui/svelte/toolbar';
  import type { ComponentProps, Snippet } from 'svelte';
  import { cn } from '$lib/utils';

  type Props = Omit<ComponentProps<typeof ToolbarPrimitive.Root>, 'children'> & {
    children?: Snippet;
  };

  let { class: className, children, ...restProps }: Props = $props();
</script>

<ToolbarPrimitive.Root
  class={cn(
    'relative flex gap-2 rounded-xl border bg-card not-dark:bg-clip-padding p-1 text-card-foreground',
    className
  )}
  data-slot="toolbar"
  {...restProps}
>
  {@render children?.()}
</ToolbarPrimitive.Root>
