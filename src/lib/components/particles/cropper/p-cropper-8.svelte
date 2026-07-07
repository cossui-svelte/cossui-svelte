<script lang="ts">
  import { Cropper, CropperCropArea, CropperDescription, CropperImage } from '$lib/components/ui/cropper';
  import { Slider } from '$lib/components/ui/slider';

  let zoom = $state(1);
</script>

<div class="flex w-full flex-col items-center gap-2">
  <div class="flex w-full flex-col gap-4">
    <Cropper
      class="h-80"
      image="/img/cropper/cropper-07_scsejv.jpg"
      bind:zoom
    >
      <CropperDescription />
      <CropperImage />
      <CropperCropArea />
    </Cropper>
    <div class="mx-auto flex w-full max-w-80 items-center gap-1">
      <Slider aria-label="Zoom slider" bind:value={zoom} max={3} min={1} step={0.1} />
      <output class="block w-10 shrink-0 text-right font-medium text-sm tabular-nums">
        {Number.parseFloat(zoom.toFixed(1))}x
      </output>
    </div>
  </div>
</div>
