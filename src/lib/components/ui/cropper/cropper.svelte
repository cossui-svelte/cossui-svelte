<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import { CropperRoot } from '$lib/image-cropper';
  import { cn } from '$lib/utils.js';

  let {
    class: className,
    zoom = $bindable(1),
    ...restProps
  }: ComponentProps<typeof CropperRoot> = $props();
</script>

<CropperRoot
  data-slot="cropper"
  class={cn(
    'relative flex w-full cursor-move touch-none items-center justify-center overflow-hidden focus:outline-none',
    className
  )}
  bind:zoom
  {...restProps}
/>
