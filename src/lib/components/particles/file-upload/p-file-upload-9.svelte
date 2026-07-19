<script lang="ts">
  import AlertCircle from '@lucide/svelte/icons/alert-circle';
  import FileArchive from '@lucide/svelte/icons/file-archive';
  import File from '@lucide/svelte/icons/file';
  import FileSpreadsheet from '@lucide/svelte/icons/file-spreadsheet';
  import FileText from '@lucide/svelte/icons/file-text';
  import FileUp from '@lucide/svelte/icons/file-up';
  import Headphones from '@lucide/svelte/icons/headphones';
  import Image from '@lucide/svelte/icons/image';
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
      id: 'document.pdf-1744638436563-8u5xuls',
      name: 'document.pdf',
      size: 528737,
      type: 'application/pdf',
      url: 'https://example.com/document.pdf'
    },
    {
      id: 'intro.zip-1744638436563-8u5xuls',
      name: 'intro.zip',
      size: 252873,
      type: 'application/zip',
      url: 'https://example.com/intro.zip'
    },
    {
      id: 'conclusion.xlsx-1744638436563-8u5xuls',
      name: 'conclusion.xlsx',
      size: 352873,
      type: 'application/xlsx',
      url: 'https://example.com/conclusion.xlsx'
    }
  ];

  const maxSize = 100 * 1024 * 1024; // 100MB default
  const maxFiles = 10;

  const fileUpload = useFileUpload({ initialFiles, maxFiles, maxSize, multiple: true });
</script>

{#snippet fileIcon(file: FileWithPreview)}
  {@const fileType = file.file.type}
  {@const fileName = file.file.name}
  {#if fileType.includes('pdf') || fileName.endsWith('.pdf') || fileType.includes('word') || fileName.endsWith('.doc') || fileName.endsWith('.docx')}
    <FileText class="size-4 opacity-60" />
  {:else if fileType.includes('zip') || fileType.includes('archive') || fileName.endsWith('.zip') || fileName.endsWith('.rar')}
    <FileArchive class="size-4 opacity-60" />
  {:else if fileType.includes('excel') || fileName.endsWith('.xls') || fileName.endsWith('.xlsx')}
    <FileSpreadsheet class="size-4 opacity-60" />
  {:else if fileType.includes('video/')}
    <Video class="size-4 opacity-60" />
  {:else if fileType.includes('audio/')}
    <Headphones class="size-4 opacity-60" />
  {:else if fileType.startsWith('image/')}
    <Image class="size-4 opacity-60" />
  {:else}
    <File class="size-4 opacity-60" />
  {/if}
{/snippet}

<div class="flex flex-col gap-2">
  <!-- Drop area -->
  <div
    class="flex min-h-40 flex-col items-center justify-center rounded-xl border border-input border-dashed p-4 transition-colors hover:bg-accent/50 has-disabled:pointer-events-none has-[input:focus]:border-ring has-disabled:opacity-50 has-[input:focus]:ring-[3px] has-[input:focus]:ring-ring/50 data-[dragging=true]:bg-accent/50"
    data-dragging={fileUpload.isDragging || undefined}
    onclick={fileUpload.openFileDialog}
    ondragenter={fileUpload.handleDragEnter}
    ondragleave={fileUpload.handleDragLeave}
    ondragover={fileUpload.handleDragOver}
    ondrop={fileUpload.handleDrop}
    role="button"
    tabindex={-1}
  >
    <input
      bind:this={fileUpload.fileInput}
      {...fileUpload.inputProps}
      aria-label="Upload files"
      class="sr-only"
    />

    <div class="flex flex-col items-center justify-center text-center">
      <div aria-hidden="true" class="mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border bg-background">
        <FileUp class="size-4 opacity-60" />
      </div>
      <p class="mb-1.5 font-medium text-sm">Upload files</p>
      <p class="mb-2 text-muted-foreground text-xs">Drag & drop or click to browse</p>
      <div class="flex flex-wrap justify-center gap-1 text-muted-foreground/70 text-xs">
        <span>All files</span>
        <span>&middot;</span>
        <span>Max {maxFiles} files</span>
        <span>&middot;</span>
        <span>Up to {formatBytes(maxSize)}</span>
      </div>
    </div>
  </div>

  {#if fileUpload.errors.length > 0}
    <div class="flex items-center gap-1 text-destructive text-xs" role="alert">
      <AlertCircle class="size-3 shrink-0" />
      <span>{fileUpload.errors[0]}</span>
    </div>
  {/if}

  <!-- File list -->
  {#if fileUpload.files.length > 0}
    <div class="space-y-2">
      {#each fileUpload.files as file (file.id)}
        <div class="flex items-center justify-between gap-2 rounded-lg border bg-background p-2 pe-3">
          <div class="flex items-center gap-3 overflow-hidden">
            <div class="flex aspect-square size-10 shrink-0 items-center justify-center rounded border">
              {@render fileIcon(file)}
            </div>
            <div class="flex min-w-0 flex-col gap-0.5">
              <p class="truncate font-medium text-[13px]">{file.file.name}</p>
              <p class="text-muted-foreground text-xs">{formatBytes(file.file.size)}</p>
            </div>
          </div>

          <Button
            aria-label="Remove file"
            class="-me-2 size-8 text-muted-foreground/80 hover:bg-transparent hover:text-foreground"
            onclick={() => fileUpload.removeFile(file.id)}
            size="icon"
            variant="ghost"
          >
            <X aria-hidden="true" class="size-4" />
          </Button>
        </div>
      {/each}

      <!-- Remove all files button -->
      {#if fileUpload.files.length > 1}
        <div>
          <Button onclick={fileUpload.clearFiles} size="sm" variant="outline">
            Remove all files
          </Button>
        </div>
      {/if}
    </div>
  {/if}
</div>
