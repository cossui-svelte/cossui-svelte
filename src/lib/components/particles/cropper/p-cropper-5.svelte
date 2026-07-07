<script lang="ts">
  import { Cropper, CropperCropArea, CropperDescription, CropperImage } from '$lib/components/ui/cropper';
</script>

<div class="flex w-full flex-col items-center gap-2">
  <Cropper
    class="h-80 bg-black"
    image="/img/cropper/cropper-04_jflxhw.jpg"
  >
    <CropperDescription />
    <CropperImage />
    <CropperCropArea class="shadow-[0_0_0_9999px_rgba(255,255,255,0.5)]" />
  </Cropper>
</div>
