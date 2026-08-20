<script lang="ts">
  import { AlertDialog as AlertDialogPrimitive } from '@shardsui/svelte/alert-dialog';
  import type { ComponentProps } from 'svelte';

  let { ...restProps }: ComponentProps<typeof AlertDialogPrimitive.Portal> = $props();
</script>

<AlertDialogPrimitive.Portal {...restProps} />
