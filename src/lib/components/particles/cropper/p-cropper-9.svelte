<script lang="ts">
  import { Cropper, CropperCropArea, CropperDescription, CropperImage } from '$lib/components/ui/cropper';
</script>

<div class="flex flex-col items-center gap-2">
  <Cropper
    class="h-80"
    image="https://raw.githubusercontent.com/origin-space/origin-images/refs/heads/main/cropper-08_wneftq.jpg"
    maxZoom={10}
    minZoom={2}
  >
    <CropperDescription />
    <CropperImage />
    <CropperCropArea />
  </Cropper>

  <p aria-live="polite" class="mt-2 text-muted-foreground text-xs" role="region">
    Cropper with custom zoom limits &middot;
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
