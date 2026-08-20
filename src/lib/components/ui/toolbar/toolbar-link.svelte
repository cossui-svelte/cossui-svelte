<script lang="ts">
  import { Toolbar as ToolbarPrimitive } from '@shardsui/svelte/toolbar';
  import type { ComponentProps, Snippet } from 'svelte';
  import { cn } from '$lib/utils';

  type Props = Omit<ComponentProps<typeof ToolbarPrimitive.Link>, 'children'> & {
    children?: Snippet;
  };

  let { class: className, children, ...restProps }: Props = $props();
</script>

<ToolbarPrimitive.Link class={cn(className)} data-slot="toolbar-link" {...restProps}>
  {@render children?.()}
</ToolbarPrimitive.Link>
