<script lang="ts">
  import { Popover as PopoverPrimitive } from '@shardsui/svelte/popover';
  import type { ComponentProps } from 'svelte';

  let { ref = $bindable(null), ...restProps }: ComponentProps<typeof PopoverPrimitive.Close> =
    $props();
</script>

<PopoverPrimitive.Close bind:ref data-slot="popover-close" {...restProps} />
