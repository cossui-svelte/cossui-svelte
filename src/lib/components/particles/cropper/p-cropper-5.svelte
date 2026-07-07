<script lang="ts">
  import { Cropper, CropperCropArea, CropperDescription, CropperImage } from '$lib/components/ui/cropper';
</script>

<div class="flex w-full flex-col items-center gap-2">
  <Cropper
    class="h-80 bg-black"
    image="https://raw.githubusercontent.com/origin-space/origin-images/refs/heads/main/cropper-04_jflxhw.jpg"
  >
    <CropperDescription />
    <CropperImage />
    <CropperCropArea class="shadow-[0_0_0_9999px_rgba(255,255,255,0.5)]" />
  </Cropper>

  <p aria-live="polite" class="mt-2 text-muted-foreground text-xs" role="region">
    Cropper with custom mask overlay &middot;
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
