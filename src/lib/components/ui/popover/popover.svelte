<script lang="ts">
  import { Popover as PopoverPrimitive } from '@shardsui/svelte/popover';
  import type { ComponentProps } from 'svelte';

  let { open = $bindable(false), ...restProps }: ComponentProps<typeof PopoverPrimitive.Root> =
    $props();
</script>

<PopoverPrimitive.Root bind:open {...restProps} />
