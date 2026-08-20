<script lang="ts">
  import { ContextMenu as ContextMenuPrimitive } from '@shardsui/svelte/context-menu';
  import type { ComponentProps } from 'svelte';

  let { ref = $bindable(null), ...restProps }: ComponentProps<typeof ContextMenuPrimitive.Trigger> =
    $props();
</script>

<ContextMenuPrimitive.Trigger bind:ref data-slot="context-menu-trigger" {...restProps} />
