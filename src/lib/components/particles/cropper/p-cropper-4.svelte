<script lang="ts">
  import { Cropper, CropperCropArea, CropperDescription, CropperImage } from '$lib/components/ui/cropper';
</script>

<div class="flex w-full flex-col items-center gap-2">
  <Cropper
    class="h-80"
    image="/img/cropper/cropper-03_uym8r0.jpg"
  >
    <CropperDescription />
    <CropperImage />
    <CropperCropArea class="border-blue-500" />
  </Cropper>
</div>
