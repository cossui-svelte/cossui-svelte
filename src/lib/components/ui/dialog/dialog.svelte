<script lang="ts">
  import { Dialog as DialogPrimitive } from '@shardsui/svelte/dialog';
  import type { ComponentProps } from 'svelte';

  let { open = $bindable(false), ...restProps }: ComponentProps<typeof DialogPrimitive.Root> =
    $props();
</script>

<DialogPrimitive.Root bind:open {...restProps} />
