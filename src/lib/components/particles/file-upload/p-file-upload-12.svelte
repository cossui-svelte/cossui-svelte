<script lang="ts">
  import AlertCircle from '@lucide/svelte/icons/alert-circle';
  import FileArchive from '@lucide/svelte/icons/file-archive';
  import File from '@lucide/svelte/icons/file';
  import FileSpreadsheet from '@lucide/svelte/icons/file-spreadsheet';
  import FileText from '@lucide/svelte/icons/file-text';
  import Headphones from '@lucide/svelte/icons/headphones';
  import Image from '@lucide/svelte/icons/image';
  import Trash2 from '@lucide/svelte/icons/trash-2';
  import Upload from '@lucide/svelte/icons/upload';
  import Video from '@lucide/svelte/icons/video';
  import X from '@lucide/svelte/icons/x';
  import { Button } from '$lib/components/ui/button';
  import {
    type FileMetadata,
    type FileWithPreview,
    formatBytes,
    useFileUpload
  } from '$lib/hooks/use-file-upload.svelte';

  // Create some dummy initial files
  const initialFiles: FileMetadata[] = [
    {
      id: 'intro.zip-1744638436563-8u5xuls',
      name: 'intro.zip',
      size: 252873,
      type: 'application/zip',
      url: 'https://example.com/intro.zip'
    },
    {
      id: 'image-01-123456789',
      name: 'image-01.jpg',
      size: 1528737,
      type: 'image/jpeg',
      url: 'https://picsum.photos/1000/800?grayscale&random=1'
    },
    {
      id: 'audio-123456789',
      name: 'audio.mp3',
      size: 1528737,
      type: 'audio/mpeg',
      url: 'https://example.com/audio.mp3'
    }
  ];

  const maxSizeMB = 5;
  const maxSize = maxSizeMB * 1024 * 1024; // 5MB default
  const maxFiles = 6;

  const fileUpload = useFileUpload({ initialFiles, maxFiles, maxSize, multiple: true });
</script>

{#snippet fileIcon(file: FileWithPreview)}
  {@const fileType = file.file.type}
  {@const fileName = file.file.name}
  {#if fileType.includes('zip') || fileType.includes('archive') || fileName.endsWith('.zip') || fileName.endsWith('.rar')}
    <FileArchive class="size-5 opacity-60" />
  {:else if fileType.includes('audio/')}
    <Headphones class="size-5 opacity-60" />
  {:else if fileType.includes('excel') || fileName.endsWith('.xls') || fileName.endsWith('.xlsx')}
    <FileSpreadsheet class="size-5 opacity-60" />
  {:else if fileType.startsWith('image/')}
    <Image class="size-5 opacity-60" />
  {:else if fileType.includes('pdf') || fileName.endsWith('.pdf') || fileType.includes('word') || fileName.endsWith('.doc') || fileName.endsWith('.docx')}
    <FileText class="size-5 opacity-60" />
  {:else if fileType.includes('video/')}
    <Video class="size-5 opacity-60" />
  {:else}
    <File class="size-5 opacity-60" />
  {/if}
{/snippet}

{#snippet filePreview(file: FileWithPreview)}
  <div class="flex aspect-square items-center justify-center overflow-hidden rounded-t-[inherit] bg-accent">
    {#if file.file.type.startsWith('image/') && file.preview}
      <img alt={file.file.name} class="size-full rounded-t-[inherit] object-cover" src={file.preview} />
    {:else}
      {@render fileIcon(file)}
    {/if}
  </div>
{/snippet}

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
          <h3 class="truncate font-medium text-sm">Files ({fileUpload.files.length})</h3>
          <div class="flex gap-2">
            <Button onclick={fileUpload.openFileDialog} size="sm" variant="outline">
              <Upload aria-hidden="true" class="-ms-0.5 size-3.5 opacity-60" />
              Add files
            </Button>
            <Button onclick={fileUpload.clearFiles} size="sm" variant="outline">
              <Trash2 aria-hidden="true" class="-ms-0.5 size-3.5 opacity-60" />
              Remove all
            </Button>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 md:grid-cols-3">
          {#each fileUpload.files as file (file.id)}
            <div class="relative flex flex-col rounded-md border bg-background">
              {@render filePreview(file)}
              <Button
                aria-label="Remove image"
                class="absolute -top-2 -right-2 size-6 rounded-full border-2 border-background shadow-none focus-visible:border-background"
                onclick={() => fileUpload.removeFile(file.id)}
                size="icon"
              >
                <X class="size-3.5" />
              </Button>
              <div class="flex min-w-0 flex-col gap-0.5 border-t p-3">
                <p class="truncate font-medium text-[13px]">{file.file.name}</p>
                <p class="truncate text-muted-foreground text-xs">{formatBytes(file.file.size)}</p>
              </div>
            </div>
          {/each}
        </div>
      </div>
    {:else}
      <div class="flex flex-col items-center justify-center px-4 py-3 text-center">
        <div aria-hidden="true" class="mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border bg-background">
          <Image class="size-4 opacity-60" />
        </div>
        <p class="mb-1.5 font-medium text-sm">Drop your files here</p>
        <p class="text-muted-foreground text-xs">Max {maxFiles} files &middot; Up to {maxSizeMB}MB</p>
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
