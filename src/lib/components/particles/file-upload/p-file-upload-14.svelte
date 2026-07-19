<script lang="ts">
  import ArrowLeft from '@lucide/svelte/icons/arrow-left';
  import CircleUserRound from '@lucide/svelte/icons/circle-user-round';
  import X from '@lucide/svelte/icons/x';
  import ZoomIn from '@lucide/svelte/icons/zoom-in';
  import ZoomOut from '@lucide/svelte/icons/zoom-out';
  import { Button } from '$lib/components/ui/button';
  import {
    Cropper,
    CropperCropArea,
    CropperDescription,
    CropperImage,
    type Area
  } from '$lib/components/ui/cropper';
  import {
    Dialog,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogPopup,
    DialogTitle
  } from '$lib/components/ui/dialog';
  import { Slider } from '$lib/components/ui/slider';
  import { useFileUpload } from '$lib/hooks/use-file-upload.svelte';

  // Helper function to create a cropped image blob
  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new window.Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', (error) => reject(error));
      image.crossOrigin = 'anonymous'; // Needed for canvas Tainted check
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

      // Set canvas size to desired output size
      canvas.width = outputWidth;
      canvas.height = outputHeight;

      // Draw the cropped image onto the canvas
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

      // Convert canvas to blob
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

  const fileUpload = useFileUpload({ accept: 'image/*' });

  const previewUrl = $derived(fileUpload.files[0]?.preview ?? null);
  const fileId = $derived(fileUpload.files[0]?.id);

  let finalImageUrl = $state<string | null>(null);
  let isDialogOpen = $state(false);

  // Track the previous file ID to detect new uploads
  let previousFileId: string | undefined | null = null;

  // Crop area in pixels, provided by the Cropper
  let croppedAreaPixels = $state<Area | null>(null);

  // Zoom level, bound to the Cropper and Slider
  let zoom = $state(1);

  function handleCropChange(pixels: Area | null) {
    croppedAreaPixels = pixels;
  }

  async function handleApply() {
    if (!previewUrl || !fileId || !croppedAreaPixels) {
      console.error('Missing data for apply:', { croppedAreaPixels, fileId, previewUrl });
      if (fileId) {
        fileUpload.removeFile(fileId);
        croppedAreaPixels = null;
      }
      return;
    }

    try {
      const croppedBlob = await getCroppedImg(previewUrl, croppedAreaPixels);

      if (!croppedBlob) {
        throw new Error('Failed to generate cropped image blob.');
      }

      const newFinalUrl = URL.createObjectURL(croppedBlob);

      if (finalImageUrl) {
        URL.revokeObjectURL(finalImageUrl);
      }

      finalImageUrl = newFinalUrl;
      isDialogOpen = false;
    } catch (error) {
      console.error('Error during apply:', error);
      isDialogOpen = false;
    }
  }

  function handleRemoveFinalImage() {
    if (finalImageUrl) {
      URL.revokeObjectURL(finalImageUrl);
    }
    finalImageUrl = null;
  }

  $effect(() => {
    return () => {
      if (finalImageUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(finalImageUrl);
      }
    };
  });

  // Open dialog when a *new* file is ready
  $effect(() => {
    if (fileId && fileId !== previousFileId) {
      isDialogOpen = true;
      croppedAreaPixels = null;
      zoom = 1;
    }
    previousFileId = fileId;
  });
</script>

<div class="flex flex-col items-center gap-2">
  <div class="relative inline-flex">
    <!-- Drop area - uses finalImageUrl -->
    <button
      aria-label={finalImageUrl ? 'Change image' : 'Upload image'}
      class="relative flex size-16 items-center justify-center overflow-hidden rounded-full border border-input border-dashed outline-none transition-colors hover:bg-accent/50 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-disabled:pointer-events-none has-[img]:border-none has-disabled:opacity-50 data-[dragging=true]:bg-accent/50"
      data-dragging={fileUpload.isDragging || undefined}
      onclick={fileUpload.openFileDialog}
      ondragenter={fileUpload.handleDragEnter}
      ondragleave={fileUpload.handleDragLeave}
      ondragover={fileUpload.handleDragOver}
      ondrop={fileUpload.handleDrop}
      type="button"
    >
      {#if finalImageUrl}
        <img
          alt="User avatar"
          class="size-full object-cover"
          height={64}
          src={finalImageUrl}
          style="object-fit: cover;"
          width={64}
        />
      {:else}
        <div aria-hidden="true">
          <CircleUserRound class="size-4 opacity-60" />
        </div>
      {/if}
    </button>
    <!-- Remove button - depends on finalImageUrl -->
    {#if finalImageUrl}
      <Button
        aria-label="Remove image"
        class="absolute -top-1 -right-1 size-6 rounded-full border-2 border-background shadow-none focus-visible:border-background"
        onclick={handleRemoveFinalImage}
        size="icon"
      >
        <X class="size-3.5" />
      </Button>
    {/if}
    <input
      bind:this={fileUpload.fileInput}
      {...fileUpload.inputProps}
      aria-label="Upload image file"
      class="sr-only"
      tabindex={-1}
    />
  </div>

  <!-- Cropper Dialog -->
  <Dialog bind:open={isDialogOpen}>
    <DialogPopup class="gap-0 p-0 sm:max-w-140" showCloseButton={false}>
      <DialogDescription class="sr-only">Crop image dialog</DialogDescription>
      <DialogHeader class="contents space-y-0 text-left">
        <DialogTitle class="flex items-center justify-between border-b p-4 text-base">
          <div class="flex items-center gap-2">
            <Button
              aria-label="Cancel"
              class="-my-1 opacity-60"
              onclick={() => (isDialogOpen = false)}
              size="icon"
              type="button"
              variant="ghost"
            >
              <ArrowLeft aria-hidden="true" />
            </Button>
            <span>Crop image</span>
          </div>
          <Button autofocus class="-my-1" disabled={!previewUrl} onclick={handleApply}>
            Apply
          </Button>
        </DialogTitle>
      </DialogHeader>
      {#if previewUrl}
        <Cropper class="h-96 sm:h-120" image={previewUrl} onCropChange={handleCropChange} bind:zoom>
          <CropperDescription />
          <CropperImage />
          <CropperCropArea />
        </Cropper>
      {/if}
      <DialogFooter class="border-t px-4 py-6">
        <div class="mx-auto flex w-full max-w-80 items-center gap-4">
          <ZoomOut aria-hidden="true" class="shrink-0 opacity-60" size={16} />
          <Slider aria-label="Zoom slider" bind:value={zoom} max={3} min={1} step={0.1} />
          <ZoomIn aria-hidden="true" class="shrink-0 opacity-60" size={16} />
        </div>
      </DialogFooter>
    </DialogPopup>
  </Dialog>
</div>
