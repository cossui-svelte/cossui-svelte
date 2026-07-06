<script lang="ts">
  import { Cropper, CropperCropArea, CropperDescription, CropperImage } from '$lib/components/ui/cropper';
</script>

<div class="flex flex-col items-center gap-2">
  <Cropper
    aspectRatio={16 / 9}
    class="h-80"
    image="https://raw.githubusercontent.com/origin-space/origin-images/refs/heads/main/cropper-02_a2xwtd.jpg"
  >
    <CropperDescription />
    <CropperImage />
    <CropperCropArea />
  </Cropper>

  <p aria-live="polite" class="mt-2 text-muted-foreground text-xs" role="region">
    Cropper with aspect ratio 16:9 &middot;
    <a
      class="underline hover:text-foreground"
      href="https://github.com/origin-space/image-cropper"
      rel="noreferrer"
      target="_blank"
    >
      API
    </a>
  </p>
</div>
