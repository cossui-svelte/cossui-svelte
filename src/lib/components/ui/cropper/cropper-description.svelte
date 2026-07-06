<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import { CropperDescription } from '$lib/image-cropper';
  import { cn } from '$lib/utils.js';

  let { class: className, ...restProps }: ComponentProps<typeof CropperDescription> = $props();
</script>

<CropperDescription data-slot="cropper-description" class={cn('sr-only', className)} {...restProps} />
