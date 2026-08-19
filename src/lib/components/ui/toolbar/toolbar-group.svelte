<script lang="ts">
  import { Toolbar as ToolbarPrimitive } from '@shardsui/svelte/toolbar';
  import type { ComponentProps, Snippet } from 'svelte';
  import { cn } from '$lib/utils';

  type Props = Omit<ComponentProps<typeof ToolbarPrimitive.Group>, 'children'> & {
    children?: Snippet;
  };

  let { class: className, children, ...restProps }: Props = $props();
</script>

<ToolbarPrimitive.Group
  class={cn('flex items-center gap-1', className)}
  data-slot="toolbar-group"
  {...restProps}
>
  {@render children?.()}
</ToolbarPrimitive.Group>
