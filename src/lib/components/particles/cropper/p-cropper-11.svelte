<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Cropper, CropperCropArea, CropperDescription, CropperImage } from '$lib/components/ui/cropper';

  type Area = { x: number; y: number; width: number; height: number };

  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', (error) => reject(error));
      image.setAttribute('crossOrigin', 'anonymous');
      image.src = url;
    });

  async function getCroppedImg(
    imageSrc: string,
    pixelCrop: Area,
    outputWidth: number = pixelCrop.width,
    outputHeight: number = pixelCrop.height
  ): Promise<Blob | null> {
    try {
      const image = await createImage(imageSrc);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        return null;
      }

      canvas.width = outputWidth;
      canvas.height = outputHeight;

      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        outputWidth,
        outputHeight
      );

      return new Promise((resolve) => {
        canvas.toBlob((blob) => {
          resolve(blob);
        }, 'image/jpeg');
      });
    } catch (error) {
      console.error('Error in getCroppedImg:', error);
      return null;
    }
  }

  const ORIGINAL_IMAGE_URL =
    '/img/cropper/cropper-10_k24zxk.jpg';

  let croppedAreaPixels = $state<Area | null>(null);
  let croppedImageUrl = $state<string | null>(null);

  async function handleCrop() {
    if (!croppedAreaPixels) {
      console.error('No crop area selected.');
      return;
    }

    try {
      const croppedBlob = await getCroppedImg(ORIGINAL_IMAGE_URL, croppedAreaPixels);
      if (!croppedBlob) {
        throw new Error('Failed to generate cropped image blob.');
      }

      const newCroppedUrl = URL.createObjectURL(croppedBlob);

      if (croppedImageUrl) {
        URL.revokeObjectURL(croppedImageUrl);
      }

      croppedImageUrl = newCroppedUrl;
    } catch (error) {
      console.error('Error during cropping:', error);
      if (croppedImageUrl) {
        URL.revokeObjectURL(croppedImageUrl);
      }
      croppedImageUrl = null;
    }
  }

  $effect(() => {
    const currentUrl = croppedImageUrl;
    return () => {
      if (currentUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(currentUrl);
      }
    };
  });
</script>

<div class="flex w-full flex-col items-center gap-2">
  <div class="flex w-full flex-col gap-4 md:flex-row">
    <Cropper
      class="h-64 md:flex-1"
      image={ORIGINAL_IMAGE_URL}
      onCropChange={(area) => (croppedAreaPixels = area)}
    >
      <CropperDescription />
      <CropperImage />
      <CropperCropArea />
    </Cropper>
    <div class="flex w-26 flex-col gap-4">
      <Button disabled={!croppedAreaPixels} onclick={handleCrop}>Crop preview</Button>
      <div class="aspect-square w-full shrink-0 overflow-hidden rounded-lg border">
        {#if croppedImageUrl}
          <img alt="Cropped result" class="h-full w-full object-cover" src={croppedImageUrl} />
        {:else}
          <div
            class="flex h-full w-full items-center justify-center bg-muted p-2 text-center text-muted-foreground/80 text-xs"
          >
            Image preview
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>
