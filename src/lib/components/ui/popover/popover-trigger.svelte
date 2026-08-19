<script lang="ts">
  import { Popover as PopoverPrimitive } from '@shardsui/svelte/popover';
  import type { ComponentProps } from 'svelte';

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: ComponentProps<typeof PopoverPrimitive.Trigger> = $props();
</script>

<PopoverPrimitive.Trigger bind:ref class={className} data-slot="popover-trigger" {...restProps} />
