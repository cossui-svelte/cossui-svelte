<script lang="ts">
  import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';
  import CircleUserRoundIcon from '@lucide/svelte/icons/circle-user-round';
  import XIcon from '@lucide/svelte/icons/x';
  import ZoomInIcon from '@lucide/svelte/icons/zoom-in';
  import ZoomOutIcon from '@lucide/svelte/icons/zoom-out';
  import { Button } from '$lib/components/ui/button';
  import { Cropper, CropperCropArea, CropperDescription, CropperImage } from '$lib/components/ui/cropper';
  import {
    Dialog,
    DialogFooter,
    DialogHeader,
    DialogPopup,
    DialogTitle
  } from '$lib/components/ui/dialog';
  import { Slider } from '$lib/components/ui/slider';

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

  let fileInputEl = $state<HTMLInputElement | null>(null);
  let isDragging = $state(false);
  let previewUrl = $state<string | null>(null);
  let finalImageUrl = $state<string | null>(null);
  let isDialogOpen = $state(false);
  let croppedAreaPixels = $state<Area | null>(null);
  let zoom = $state(1);

  let previousPreviewUrl: string | null = null;

  function setPreviewFromFiles(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    previewUrl = URL.createObjectURL(file);
  }

  function openFileDialog() {
    fileInputEl?.click();
  }

  function handleFileChange(e: Event) {
    setPreviewFromFiles((e.currentTarget as HTMLInputElement).files);
  }

  function handleDragEnter(e: DragEvent) {
    e.preventDefault();
    isDragging = true;
  }

  function handleDragLeave(e: DragEvent) {
    e.preventDefault();
    isDragging = false;
  }

  function handleDragOver(e: DragEvent) {
    e.preventDefault();
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    isDragging = false;
    setPreviewFromFiles(e.dataTransfer?.files ?? null);
  }

  function removePreview() {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    previewUrl = null;
    croppedAreaPixels = null;
    if (fileInputEl) {
      fileInputEl.value = '';
    }
  }

  async function handleApply() {
    if (!previewUrl || !croppedAreaPixels) {
      removePreview();
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
    const url = previewUrl;
    if (url && url !== previousPreviewUrl) {
      isDialogOpen = true;
      croppedAreaPixels = null;
      zoom = 1;
    }
    previousPreviewUrl = url;
  });
</script>

<div class="flex w-full flex-col items-center gap-2">
  <div class="relative inline-flex">
    <button
      aria-label={finalImageUrl ? 'Change image' : 'Upload image'}
      class="relative flex size-16 items-center justify-center overflow-hidden rounded-full border border-input border-dashed outline-none transition-colors hover:bg-accent/50 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-disabled:pointer-events-none has-[img]:border-none has-disabled:opacity-50 data-[dragging=true]:bg-accent/50"
      data-dragging={isDragging || undefined}
      onclick={openFileDialog}
      ondragenter={handleDragEnter}
      ondragleave={handleDragLeave}
      ondragover={handleDragOver}
      ondrop={handleDrop}
      type="button"
    >
      {#if finalImageUrl}
        <img alt="User avatar" class="size-full object-cover" height={64} src={finalImageUrl} width={64} />
      {:else}
        <div aria-hidden="true">
          <CircleUserRoundIcon class="size-4 opacity-60" />
        </div>
      {/if}
    </button>
    {#if finalImageUrl}
      <Button
        aria-label="Remove image"
        class="absolute -top-1 -right-1 size-6 rounded-full border-2 border-background shadow-none focus-visible:border-background"
        onclick={handleRemoveFinalImage}
        size="icon"
      >
        <XIcon class="size-3.5" />
      </Button>
    {/if}
    <input
      bind:this={fileInputEl}
      accept="image/*"
      aria-label="Upload image file"
      class="sr-only"
      onchange={handleFileChange}
      tabindex={-1}
      type="file"
    />
  </div>

  <Dialog open={isDialogOpen} onOpenChange={(o: boolean) => (isDialogOpen = o)}>
    <DialogPopup class="gap-0 p-0 sm:max-w-140" showCloseButton={false}>
      <DialogHeader class="contents">
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
              <ArrowLeftIcon aria-hidden="true" />
            </Button>
            <span>Crop image</span>
          </div>
          <Button class="-my-1" disabled={!previewUrl} onclick={handleApply}>Apply</Button>
        </DialogTitle>
      </DialogHeader>
      {#if previewUrl}
        <Cropper
          class="h-96 sm:h-120"
          image={previewUrl}
          onCropChange={(area) => (croppedAreaPixels = area)}
          bind:zoom
        >
          <CropperDescription />
          <CropperImage />
          <CropperCropArea />
        </Cropper>
      {/if}
      <DialogFooter class="border-t px-4 py-6">
        <div class="mx-auto flex w-full max-w-80 items-center gap-4">
          <ZoomOutIcon aria-hidden="true" class="shrink-0 opacity-60" size={16} />
          <Slider aria-label="Zoom slider" bind:value={zoom} max={3} min={1} step={0.1} />
          <ZoomInIcon aria-hidden="true" class="shrink-0 opacity-60" size={16} />
        </div>
      </DialogFooter>
    </DialogPopup>
  </Dialog>

  <p aria-live="polite" class="mt-2 text-muted-foreground text-xs" role="region">
    Click the avatar to update the image
  </p>
</div>
