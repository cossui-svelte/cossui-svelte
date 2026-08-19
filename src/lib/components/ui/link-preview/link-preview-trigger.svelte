<script lang="ts">
  import { PreviewCard as PreviewCardPrimitive } from '@shardsui/svelte/preview-card';
  import type { ComponentProps } from 'svelte';

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: ComponentProps<typeof PreviewCardPrimitive.Trigger> = $props();
</script>

<PreviewCardPrimitive.Trigger
  bind:ref
  class={className}
  data-slot="link-preview-trigger"
  {...restProps}
/>
