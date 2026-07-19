<script lang="ts">
  import AlertCircle from '@lucide/svelte/icons/alert-circle';
  import CloudUpload from '@lucide/svelte/icons/cloud-upload';
  import Download from '@lucide/svelte/icons/download';
  import FileArchive from '@lucide/svelte/icons/file-archive';
  import File from '@lucide/svelte/icons/file';
  import FileSpreadsheet from '@lucide/svelte/icons/file-spreadsheet';
  import FileText from '@lucide/svelte/icons/file-text';
  import Headphones from '@lucide/svelte/icons/headphones';
  import Image from '@lucide/svelte/icons/image';
  import Trash2 from '@lucide/svelte/icons/trash-2';
  import Upload from '@lucide/svelte/icons/upload';
  import Video from '@lucide/svelte/icons/video';
  import { Button } from '$lib/components/ui/button';
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
  } from '$lib/components/ui/table';
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
      url: 'https://coss.com/origin'
    },
    {
      id: 'intro.zip-1744638436563-8u5xuls',
      name: 'intro.zip',
      size: 252873,
      type: 'application/zip',
      url: 'https://coss.com/origin'
    },
    {
      id: 'conclusion.xlsx-1744638436563-8u5xuls',
      name: 'conclusion.xlsx',
      size: 352873,
      type: 'application/xlsx',
      url: 'https://coss.com/origin'
    }
  ];

  const maxSize = 10 * 1024 * 1024; // 10MB default
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
    class="flex min-h-56 flex-col items-center not-data-[files]:justify-center rounded-xl border border-input border-dashed p-4 transition-colors has-[input:focus]:border-ring has-[input:focus]:ring-[3px] has-[input:focus]:ring-ring/50 data-[files]:hidden data-[dragging=true]:bg-accent/50"
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
      aria-label="Upload files"
      class="sr-only"
    />
    <div class="flex flex-col items-center justify-center text-center">
      <div aria-hidden="true" class="mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border bg-background">
        <File class="size-4 opacity-60" />
      </div>
      <p class="mb-1.5 font-medium text-sm">Upload files</p>
      <p class="text-muted-foreground text-xs">Max {maxFiles} files &middot; Up to {formatBytes(maxSize)}</p>
      <Button class="mt-4" onclick={fileUpload.openFileDialog} variant="outline">
        <Upload aria-hidden="true" class="-ms-1 opacity-60" />
        Select files
      </Button>
    </div>
  </div>
  {#if fileUpload.files.length > 0}
    <!-- Table with files -->
    <div class="flex items-center justify-between gap-2">
      <h3 class="font-medium text-sm">Files ({fileUpload.files.length})</h3>
      <div class="flex gap-2">
        <Button onclick={fileUpload.openFileDialog} size="sm" variant="outline">
          <CloudUpload aria-hidden="true" class="-ms-0.5 size-3.5 opacity-60" />
          Add files
        </Button>
        <Button onclick={fileUpload.clearFiles} size="sm" variant="outline">
          <Trash2 aria-hidden="true" class="-ms-0.5 size-3.5 opacity-60" />
          Remove all
        </Button>
      </div>
    </div>
    <div class="overflow-hidden rounded-md border bg-background">
      <Table>
        <TableHeader class="text-xs">
          <TableRow class="bg-muted/50">
            <TableHead class="h-9 py-2">Name</TableHead>
            <TableHead class="h-9 py-2">Type</TableHead>
            <TableHead class="h-9 py-2">Size</TableHead>
            <TableHead class="h-9 w-0 py-2 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody class="text-[13px]">
          {#each fileUpload.files as file (file.id)}
            <TableRow>
              <TableCell class="max-w-48 py-2 font-medium">
                <span class="flex items-center gap-2">
                  <span class="shrink-0">{@render fileIcon(file)}</span>
                  <span class="truncate">{file.file.name}</span>
                </span>
              </TableCell>
              <TableCell class="py-2 text-muted-foreground">
                {file.file.type.split('/')[1]?.toUpperCase() || 'UNKNOWN'}
              </TableCell>
              <TableCell class="py-2 text-muted-foreground">
                {formatBytes(file.file.size)}
              </TableCell>
              <TableCell class="whitespace-nowrap py-2 text-right">
                <Button
                  aria-label={`Download ${file.file.name}`}
                  class="size-8 text-muted-foreground/80 hover:bg-transparent hover:text-foreground"
                  onclick={() => window.open(file.preview, '_blank')}
                  size="icon"
                  variant="ghost"
                >
                  <Download class="size-4" />
                </Button>
                <Button
                  aria-label={`Remove ${file.file.name}`}
                  class="size-8 text-muted-foreground/80 hover:bg-transparent hover:text-foreground"
                  onclick={() => fileUpload.removeFile(file.id)}
                  size="icon"
                  variant="ghost"
                >
                  <Trash2 class="size-4" />
                </Button>
              </TableCell>
            </TableRow>
          {/each}
        </TableBody>
      </Table>
    </div>
  {/if}

  {#if fileUpload.errors.length > 0}
    <div class="flex items-center gap-1 text-destructive text-xs" role="alert">
      <AlertCircle class="size-3 shrink-0" />
      <span>{fileUpload.errors[0]}</span>
    </div>
  {/if}
</div>
