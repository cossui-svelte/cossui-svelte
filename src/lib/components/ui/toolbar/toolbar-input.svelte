<script lang="ts">
  import { Toolbar as ToolbarPrimitive } from '@shardsui/svelte/toolbar';
  import type { ComponentProps } from 'svelte';
  import { cn } from '$lib/utils';

  let { class: className, ...restProps }: ComponentProps<typeof ToolbarPrimitive.Input> = $props();
</script>

<ToolbarPrimitive.Input class={cn(className)} data-slot="toolbar-input" {...restProps} />
