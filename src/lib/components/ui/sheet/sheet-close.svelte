<script lang="ts">
  import { Dialog as SheetPrimitive } from '@shardsui/svelte/dialog';
  import type { ComponentProps } from 'svelte';

  let {
    ref = $bindable(null),
    type = 'button',
    ...restProps
  }: ComponentProps<typeof SheetPrimitive.Close> = $props();
</script>

<SheetPrimitive.Close bind:ref data-slot="sheet-close" {type} {...restProps} />
