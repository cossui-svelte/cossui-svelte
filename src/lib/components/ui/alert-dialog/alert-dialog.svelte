<script lang="ts">
  import { AlertDialog as AlertDialogPrimitive } from '@shardsui/svelte/alert-dialog';
  import type { ComponentProps } from 'svelte';

  let { open = $bindable(false), ...restProps }: ComponentProps<typeof AlertDialogPrimitive.Root> =
    $props();
</script>

<AlertDialogPrimitive.Root bind:open {...restProps} />
