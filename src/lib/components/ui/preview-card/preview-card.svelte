<script lang="ts">
  import { PreviewCard as PreviewCardPrimitive } from '@shardsui/svelte/preview-card';
  import type { ComponentProps } from 'svelte';

  let {
    open = $bindable(false),
    triggerId = $bindable(null),
    ...restProps
  }: ComponentProps<typeof PreviewCardPrimitive.Root> = $props();
</script>

<PreviewCardPrimitive.Root bind:open bind:triggerId {...restProps} />
