<script lang="ts">
  import { Collapsible as CollapsiblePrimitive } from '@shardsui/svelte/collapsible';
  import type { ComponentProps } from 'svelte';

  let {
    ref = $bindable(null),
    open = $bindable(false),
    ...restProps
  }: ComponentProps<typeof CollapsiblePrimitive.Root> = $props();
</script>

<CollapsiblePrimitive.Root bind:ref bind:open data-slot="collapsible" {...restProps} />
