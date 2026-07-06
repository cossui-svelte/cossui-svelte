<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import { CropperCropArea } from '$lib/image-cropper';
  import { cn } from '$lib/utils.js';

  let { class: className, ...restProps }: ComponentProps<typeof CropperCropArea> = $props();
</script>

<CropperCropArea
  data-slot="cropper-crop-area"
  class={cn(
    'pointer-events-none absolute border-3 border-white shadow-[0_0_0_9999px_rgba(0,0,0,0.3)] in-[[data-slot=cropper]:focus-visible]:ring-[3px] in-[[data-slot=cropper]:focus-visible]:ring-white/50',
    className
  )}
  {...restProps}
/>
