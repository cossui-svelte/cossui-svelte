<script lang="ts">
  import { Dialog as SheetPrimitive } from '@shardsui/svelte/dialog';
  import type { ComponentProps } from 'svelte';

  let { open = $bindable(false), ...restProps }: ComponentProps<typeof SheetPrimitive.Root> =
    $props();
</script>

<SheetPrimitive.Root bind:open {...restProps} />
