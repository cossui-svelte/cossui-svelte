<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import { CropperImage } from '$lib/image-cropper';
  import { cn } from '$lib/utils.js';

  let { class: className, ...restProps }: ComponentProps<typeof CropperImage> = $props();
</script>

<CropperImage
  data-slot="cropper-image"
  class={cn('pointer-events-none h-full w-full object-cover', className)}
  {...restProps}
/>
