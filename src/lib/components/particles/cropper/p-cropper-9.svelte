<script lang="ts">
  import { Cropper, CropperCropArea, CropperDescription, CropperImage } from '$lib/components/ui/cropper';
</script>

<div class="flex w-full flex-col items-center gap-2">
  <Cropper
    class="h-80"
    image="/img/cropper/cropper-08_wneftq.jpg"
    maxZoom={10}
    minZoom={2}
  >
    <CropperDescription />
    <CropperImage />
    <CropperCropArea />
  </Cropper>
</div>
