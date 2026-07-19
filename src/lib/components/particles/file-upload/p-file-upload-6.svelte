<script lang="ts">
  import AlertCircle from '@lucide/svelte/icons/alert-circle';
  import Image from '@lucide/svelte/icons/image';
  import Upload from '@lucide/svelte/icons/upload';
  import X from '@lucide/svelte/icons/x';
  import { Button } from '$lib/components/ui/button';
  import { type FileMetadata, useFileUpload } from '$lib/hooks/use-file-upload.svelte';

  // Create some dummy initial files
  const initialFiles: FileMetadata[] = [
    {
      id: 'image-01-123456789',
      name: 'image-01.jpg',
      size: 1528737,
      type: 'image/jpeg',
      url: 'https://picsum.photos/1000/800?grayscale&random=1'
    },
    {
      id: 'image-02-123456789',
      name: 'image-02.jpg',
      size: 1528737,
      type: 'image/jpeg',
      url: 'https://picsum.photos/1000/800?grayscale&random=2'
    },
    {
      id: 'image-03-123456789',
      name: 'image-03.jpg',
      size: 1528737,
      type: 'image/jpeg',
      url: 'https://picsum.photos/1000/800?grayscale&random=3'
    },
    {
      id: 'image-04-123456789',
      name: 'image-04.jpg',
      size: 1528737,
      type: 'image/jpeg',
      url: 'https://picsum.photos/1000/800?grayscale&random=4'
    }
  ];

  const maxSizeMB = 5;
  const maxSize = maxSizeMB * 1024 * 1024; // 5MB default
  const maxFiles = 6;

  const fileUpload = useFileUpload({
    accept: 'image/svg+xml,image/png,image/jpeg,image/jpg,image/gif',
    initialFiles,
    maxFiles,
    maxSize,
    multiple: true
  });
</script>

<div class="flex flex-col gap-2">
  <!-- Drop area -->
  <div
    class="relative flex min-h-52 flex-col items-center not-data-[files]:justify-center overflow-hidden rounded-xl border border-input border-dashed p-4 transition-colors has-[input:focus]:border-ring has-[input:focus]:ring-[3px] has-[input:focus]:ring-ring/50 data-[dragging=true]:bg-accent/50"
    data-dragging={fileUpload.isDragging || undefined}
    data-files={fileUpload.files.length > 0 || undefined}
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
    {#if fileUpload.files.length > 0}
      <div class="flex w-full flex-col gap-3">
        <div class="flex items-center justify-between gap-2">
          <h3 class="truncate font-medium text-sm">Uploaded Files ({fileUpload.files.length})</h3>
          <Button disabled={fileUpload.files.length >= maxFiles} onclick={fileUpload.openFileDialog} size="sm" variant="outline">
            <Upload aria-hidden="true" class="-ms-0.5 size-3.5 opacity-60" />
            Add more
          </Button>
        </div>

        <div class="grid grid-cols-2 gap-4 md:grid-cols-3">
          {#each fileUpload.files as file (file.id)}
            <div class="relative aspect-square rounded-md bg-accent">
              <img alt={file.file.name} class="size-full rounded-[inherit] object-cover" src={file.preview} />
              <Button
                aria-label="Remove image"
                class="absolute -top-2 -right-2 size-6 rounded-full border-2 border-background shadow-none focus-visible:border-background"
                onclick={() => fileUpload.removeFile(file.id)}
                size="icon"
              >
                <X class="size-3.5" />
              </Button>
            </div>
          {/each}
        </div>
      </div>
    {:else}
      <div class="flex flex-col items-center justify-center px-4 py-3 text-center">
        <div aria-hidden="true" class="mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border bg-background">
          <Image class="size-4 opacity-60" />
        </div>
        <p class="mb-1.5 font-medium text-sm">Drop your images here</p>
        <p class="text-muted-foreground text-xs">SVG, PNG, JPG or GIF (max. {maxSizeMB}MB)</p>
        <Button class="mt-4" onclick={fileUpload.openFileDialog} variant="outline">
          <Upload aria-hidden="true" class="-ms-1 opacity-60" />
          Select images
        </Button>
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
