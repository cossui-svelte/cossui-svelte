<script lang="ts">
  import { Cropper, CropperCropArea, CropperDescription, CropperImage } from '$lib/components/ui/cropper';
</script>

<div class="flex w-full flex-col items-center gap-2">
  <Cropper
    class="aspect-square size-80"
    cropPadding={0}
    image="/img/cropper/cropper-05_evczb3.jpg"
  >
    <CropperDescription />
    <CropperImage />
    <CropperCropArea class="border-4 border-blue-500" />
  </Cropper>
</div>
