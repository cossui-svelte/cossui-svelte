<script lang="ts">
  import { Dialog as SheetPrimitive } from '@shardsui/svelte/dialog';
  import type { ComponentProps } from 'svelte';

  let {
    ref = $bindable(null),
    type = 'button',
    ...restProps
  }: ComponentProps<typeof SheetPrimitive.Trigger> = $props();
</script>

<SheetPrimitive.Trigger bind:ref data-slot="sheet-trigger" {type} {...restProps} />
