<script lang="ts">
  import { Cropper, CropperCropArea, CropperDescription, CropperImage } from '$lib/components/ui/cropper';
</script>

<div class="flex w-full flex-col items-center gap-2">
  <Cropper
    class="h-80"
    image="https://raw.githubusercontent.com/origin-space/origin-images/refs/heads/main/cropper-06_dduwky.jpg"
  >
    <CropperDescription />
    <CropperImage />
    <CropperCropArea class="rounded-full" />
  </Cropper>

  <p aria-live="polite" class="mt-2 text-muted-foreground text-xs" role="region">
    Cropper with full-rounded mask &middot;
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
