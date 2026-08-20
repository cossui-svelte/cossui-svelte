<script lang="ts">
  import { Collapsible as CollapsiblePrimitive } from '@shardsui/svelte/collapsible';
  import type { ComponentProps } from 'svelte';

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: ComponentProps<typeof CollapsiblePrimitive.Trigger> = $props();
</script>

<CollapsiblePrimitive.Trigger
  bind:ref
  class={className}
  data-slot="collapsible-trigger"
  {...restProps}
/>
