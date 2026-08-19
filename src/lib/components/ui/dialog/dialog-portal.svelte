<script lang="ts">
  import { Dialog as DialogPrimitive } from '@shardsui/svelte/dialog';
  import type { ComponentProps } from 'svelte';

  let { ...restProps }: ComponentProps<typeof DialogPrimitive.Portal> = $props();
</script>

<DialogPrimitive.Portal {...restProps} />
