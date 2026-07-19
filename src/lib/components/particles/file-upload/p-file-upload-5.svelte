<script lang="ts">
  import AlertCircle from '@lucide/svelte/icons/alert-circle';
  import Image from '@lucide/svelte/icons/image';
  import Upload from '@lucide/svelte/icons/upload';
  import X from '@lucide/svelte/icons/x';
  import { Button } from '$lib/components/ui/button';
  import { useFileUpload } from '$lib/hooks/use-file-upload.svelte';

  const maxSizeMB = 2;
  const maxSize = maxSizeMB * 1024 * 1024; // 2MB default

  const fileUpload = useFileUpload({
    accept: 'image/svg+xml,image/png,image/jpeg,image/jpg,image/gif',
    maxSize
  });

  const previewUrl = $derived(fileUpload.files[0]?.preview ?? null);
</script>

<div class="flex flex-col gap-2">
  <div class="relative">
    <!-- Drop area -->
    <div
      class="relative flex min-h-52 flex-col items-center justify-center overflow-hidden rounded-xl border border-input border-dashed p-4 transition-colors has-[input:focus]:border-ring has-[input:focus]:ring-[3px] has-[input:focus]:ring-ring/50 data-[dragging=true]:bg-accent/50"
      data-dragging={fileUpload.isDragging || undefined}
      ondragenter={fileUpload.handleDragEnter}
      ondragleave={fileUpload.handleDragLeave}
      ondragover={fileUpload.handleDragOver}
      ondrop={fileUpload.handleDrop}
    >
      <input
        bind:this={fileUpload.fileInput}
        {...fileUpload.inputProps}
        aria-label="Upload image file"
        class="sr-only"
      />
      {#if previewUrl}
        <div class="absolute inset-0 flex items-center justify-center p-4">
          <img
            alt={fileUpload.files[0]?.file?.name || 'Uploaded image'}
            class="mx-auto max-h-full rounded object-contain"
            src={previewUrl}
          />
        </div>
      {:else}
        <div class="flex flex-col items-center justify-center px-4 py-3 text-center">
          <div aria-hidden="true" class="mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border bg-background">
            <Image class="size-4 opacity-60" />
          </div>
          <p class="mb-1.5 font-medium text-sm">Drop your image here</p>
          <p class="text-muted-foreground text-xs">SVG, PNG, JPG or GIF (max. {maxSizeMB}MB)</p>
          <Button class="mt-4" onclick={fileUpload.openFileDialog} variant="outline">
            <Upload aria-hidden="true" class="-ms-1 size-4 opacity-60" />
            Select image
          </Button>
        </div>
      {/if}
    </div>

    {#if previewUrl}
      <div class="absolute top-4 right-4">
        <button
          aria-label="Remove image"
          class="z-50 flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-none transition-[color,box-shadow] hover:bg-black/80 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
          onclick={() => fileUpload.removeFile(fileUpload.files[0]?.id)}
          type="button"
        >
          <X aria-hidden="true" class="size-4" />
        </button>
      </div>
    {/if}
  </div>

  {#if fileUpload.errors.length > 0}
    <div class="flex items-center gap-1 text-destructive text-xs" role="alert">
      <AlertCircle class="size-3 shrink-0" />
      <span>{fileUpload.errors[0]}</span>
    </div>
  {/if}
</div>
