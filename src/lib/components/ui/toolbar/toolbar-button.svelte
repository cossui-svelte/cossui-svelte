<script lang="ts">
  import { Toolbar as ToolbarPrimitive } from '@shardsui/svelte/toolbar';
  import type { ComponentProps, Snippet } from 'svelte';
  import { cn } from '$lib/utils';

  type Props = Omit<ComponentProps<typeof ToolbarPrimitive.Button>, 'children'> & {
    children?: Snippet;
  };

  let { class: className, children, ...restProps }: Props = $props();
</script>

<ToolbarPrimitive.Button class={cn(className)} data-slot="toolbar-button" {...restProps}>
  {@render children?.()}
</ToolbarPrimitive.Button>
