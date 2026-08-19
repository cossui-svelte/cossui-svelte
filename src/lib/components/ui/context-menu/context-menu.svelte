<script lang="ts">
  import { ContextMenu as ContextMenuPrimitive } from '@shardsui/svelte/context-menu';
  import type { ComponentProps } from 'svelte';

  let { open = $bindable(false), ...restProps }: ComponentProps<typeof ContextMenuPrimitive.Root> =
    $props();
</script>

<ContextMenuPrimitive.Root bind:open {...restProps} />
