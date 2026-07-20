<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import {
    Cropper,
    CropperCropArea,
    CropperDescription,
    CropperImage,
    type Area
  } from '$lib/components/ui/cropper';

  const RATIOS = [
    { label: '1:1 Square', value: 1 },
    { label: '4:3 Standard', value: 4 / 3 },
    { label: '16:9 Landscape', value: 16 / 9 },
    { label: '9:16 Portrait', value: 9 / 16 },
    { label: '3:4 Portrait', value: 3 / 4 },
    { label: '2:3 Portrait', value: 2 / 3 }
  ];

  const IMAGE_URL = '/img/cropper/cropper-12.jpg';
  const IMAGE_WIDTH = 684;
  const IMAGE_HEIGHT = 456;

  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', (error) => reject(error));
      image.setAttribute('crossOrigin', 'anonymous');
      image.src = url;
    });

  async function getCroppedImg(imageSrc: string, pixelCrop: Area): Promise<Blob | null> {
    try {
      const image = await createImage(imageSrc);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        return null;
      }

      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;

      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      );

      return new Promise((resolve) => {
        canvas.toBlob((blob) => resolve(blob), 'image/jpeg');
      });
    } catch (error) {
      console.error('Error in getCroppedImg:', error);
      return null;
    }
  }

  let selectedRatio = $state(RATIOS[0]);
  let zoom = $state(1);
  let crop = $state<Area | null>(null);
  let selectedImageUrl = $state<string | null>(null);

  const zoomPercent = $derived(Math.round(zoom * 100));

  async function handleSelect() {
    if (!crop) return;

    const blob = await getCroppedImg(IMAGE_URL, crop);
    if (!blob) return;

    const newUrl = URL.createObjectURL(blob);
    if (selectedImageUrl) {
      URL.revokeObjectURL(selectedImageUrl);
    }
    selectedImageUrl = newUrl;
  }

  $effect(() => {
    const currentUrl = selectedImageUrl;
    return () => {
      if (currentUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(currentUrl);
      }
    };
  });
</script>

<div class="flex w-full flex-col gap-3">
  <div class="flex flex-wrap items-center gap-1">
    {#each RATIOS as ratio (ratio.label)}
      <Button
        class="rounded-full"
        onclick={() => (selectedRatio = ratio)}
        size="sm"
        variant={selectedRatio.label === ratio.label ? 'default' : 'ghost'}
      >
        {ratio.label}
      </Button>
    {/each}
  </div>

  {#key selectedRatio.value}
    <Cropper
      aspectRatio={selectedRatio.value}
      class="h-80 rounded-lg border"
      image={IMAGE_URL}
      onCropChange={(area) => (crop = area)}
      bind:zoom
    >
      <CropperDescription />
      <CropperImage />
      <CropperCropArea
        class="border-2 border-white/90"
        style="background-image: linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px); background-size: calc(100% / 3) 100%, 100% calc(100% / 3);"
      />
    </Cropper>
  {/key}

  <p class="text-center text-muted-foreground text-xs">
    Image: {IMAGE_WIDTH} × {IMAGE_HEIGHT}px • Zoom: {zoomPercent}% • Crop: {crop
      ? `${crop.width} × ${crop.height}px`
      : '—'} • Ratio: {selectedRatio.label}
  </p>

  <div class="rounded-md bg-muted px-4 py-2 text-center font-mono text-foreground/80 text-xs">
    Selection: x:{crop?.x ?? 0} y:{crop?.y ?? 0} w:{crop?.width ?? 0} h:{crop?.height ?? 0}
  </div>

  <div class="flex items-center justify-end gap-3">
    {#if selectedImageUrl}
      <img
        alt="Selected crop preview"
        class="size-9 shrink-0 rounded-md border object-cover"
        src={selectedImageUrl}
      />
    {/if}
    <Button class="rounded-full" disabled={!crop} onclick={handleSelect}>Select</Button>
  </div>
</div>
