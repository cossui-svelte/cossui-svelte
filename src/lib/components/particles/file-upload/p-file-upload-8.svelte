<script lang="ts">
  import AlertCircle from '@lucide/svelte/icons/alert-circle';
  import Paperclip from '@lucide/svelte/icons/paperclip';
  import Upload from '@lucide/svelte/icons/upload';
  import X from '@lucide/svelte/icons/x';
  import { Button } from '$lib/components/ui/button';
  import { type FileMetadata, formatBytes, useFileUpload } from '$lib/hooks/use-file-upload.svelte';

  // Create some dummy initial files
  const initialFiles: FileMetadata[] = [
    {
      id: 'document.pdf-1744638436563-8u5xuls',
      name: 'document.pdf',
      size: 1528737,
      type: 'application/pdf',
      url: 'https://picsum.photos/1000/800?grayscale&random=1'
    }
  ];

  const maxSize = 10 * 1024 * 1024; // 10MB default

  const fileUpload = useFileUpload({ initialFiles, maxSize });

  const file = $derived(fileUpload.files[0]);
</script>

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
      aria-label="Upload file"
      class="sr-only"
      disabled={Boolean(file)}
    />

    <div class="flex flex-col items-center justify-center text-center">
      <div aria-hidden="true" class="mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border bg-background">
        <Upload class="size-4 opacity-60" />
      </div>
      <p class="mb-1.5 font-medium text-sm">Upload file</p>
      <p class="text-muted-foreground text-xs">Drag & drop or click to browse (max. {formatBytes(maxSize)})</p>
    </div>
  </div>

  {#if fileUpload.errors.length > 0}
    <div class="flex items-center gap-1 text-destructive text-xs" role="alert">
      <AlertCircle class="size-3 shrink-0" />
      <span>{fileUpload.errors[0]}</span>
    </div>
  {/if}

  <!-- File list -->
  {#if file}
    <div class="space-y-2">
      <div class="flex items-center justify-between gap-2 rounded-xl border px-4 py-2">
        <div class="flex items-center gap-3 overflow-hidden">
          <Paperclip aria-hidden="true" class="size-4 shrink-0 opacity-60" />
          <div class="min-w-0">
            <p class="truncate font-medium text-[13px]">{file.file.name}</p>
          </div>
        </div>

        <Button
          aria-label="Remove file"
          class="-me-2 size-8 text-muted-foreground/80 hover:bg-transparent hover:text-foreground"
          onclick={() => fileUpload.removeFile(fileUpload.files[0]?.id)}
          size="icon"
          variant="ghost"
        >
          <X aria-hidden="true" class="size-4" />
        </Button>
      </div>
    </div>
  {/if}
</div>
