<script lang="ts">
  import { Cropper, CropperCropArea, CropperDescription, CropperImage } from '$lib/components/ui/cropper';

  type Area = { x: number; y: number; width: number; height: number };

  let cropData = $state<Area | null>(null);
</script>

<div class="flex w-full flex-col items-center gap-2">
  <div class="flex w-full flex-col gap-4">
    <Cropper
      class="h-80"
      cropPadding={20}
      image="/img/cropper/cropper-09_qskkln.jpg"
      onCropChange={(area) => (cropData = area)}
    >
      <CropperDescription />
      <CropperImage />
      <CropperCropArea />
    </Cropper>

    {#if cropData}
      <pre class="overflow-auto rounded-md border bg-muted px-4 py-3 font-mono text-foreground/80 text-xs"><code>{JSON.stringify(cropData, null, 2)}</code></pre>
    {/if}
  </div>
</div>
