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

  // Type for tracking upload progress
  type UploadProgress = {
    fileId: string;
    progress: number;
    completed: boolean;
  };

  // Function to simulate file upload with more realistic timing and progress
  const simulateUpload = (
    totalBytes: number,
    onProgress: (progress: number) => void,
    onComplete: () => void
  ) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    let uploadedBytes = 0;
    let lastProgressReport = 0;

    const simulateChunk = () => {
      // Simulate variable network conditions with random chunk sizes
      const chunkSize = Math.floor(Math.random() * 300000) + 2000;
      uploadedBytes = Math.min(totalBytes, uploadedBytes + chunkSize);

      // Calculate progress percentage (0-100)
      const progressPercent = Math.floor((uploadedBytes / totalBytes) * 100);

      // Only report progress if it's changed by at least 1%
      if (progressPercent > lastProgressReport) {
        lastProgressReport = progressPercent;
        onProgress(progressPercent);
      }

      // Continue simulation if not complete
      if (uploadedBytes < totalBytes) {
        // Variable delay between 50ms and 500ms to simulate network fluctuations
        const delay = Math.floor(Math.random() * 450) + 50;

        // Occasionally add a longer pause to simulate network congestion (5% chance)
        const extraDelay = Math.random() < 0.05 ? 500 : 0;

        timeoutId = setTimeout(simulateChunk, delay + extraDelay);
      } else {
        // Upload complete
        onComplete();
      }
    };

    // Start the simulation
    timeoutId = setTimeout(simulateChunk, 100);

    // Return a cleanup function to cancel the simulation
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  };

  const maxSizeMB = 5;
  const maxSize = maxSizeMB * 1024 * 1024; // 5MB default
  const maxFiles = 6;

  // State to track upload progress for each file
  let uploadProgress = $state<UploadProgress[]>([]);

  // Function to handle newly added files
  const handleFilesAdded = (addedFiles: FileWithPreview[]) => {
    uploadProgress = [
      ...uploadProgress,
      ...addedFiles.map((file) => ({ completed: false, fileId: file.id, progress: 0 }))
    ];

    for (const file of addedFiles) {
      simulateUpload(
        file.file.size,
        (progress) => {
          uploadProgress = uploadProgress.map((item) =>
            item.fileId === file.id ? { ...item, progress } : item
          );
        },
        () => {
          uploadProgress = uploadProgress.map((item) =>
            item.fileId === file.id ? { ...item, completed: true } : item
          );
        }
      );
    }
  };

  // Remove the progress tracking for the file
  const handleFileRemoved = (fileId: string) => {
    uploadProgress = uploadProgress.filter((item) => item.fileId !== fileId);
  };

  const fileUpload = useFileUpload({
    initialFiles,
    maxFiles,
    maxSize,
    multiple: true,
    onFilesAdded: handleFilesAdded
  });
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
            <Button
              onclick={() => {
                uploadProgress = [];
                fileUpload.clearFiles();
              }}
              size="sm"
              variant="outline"
            >
              <Trash2 aria-hidden="true" class="-ms-0.5 size-3.5 opacity-60" />
              Remove all
            </Button>
          </div>
        </div>

        <div class="w-full space-y-2">
          {#each fileUpload.files as file (file.id)}
            {@const fileProgress = uploadProgress.find((p) => p.fileId === file.id)}
            {@const isUploading = fileProgress && !fileProgress.completed}
            <div
              class="flex flex-col gap-1 rounded-lg border bg-background p-2 pe-3 transition-opacity duration-300"
              data-uploading={isUploading || undefined}
            >
              <div class="flex items-center justify-between gap-2">
                <div class="flex items-center gap-3 overflow-hidden in-data-[uploading=true]:opacity-50">
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
                  onclick={() => {
                    handleFileRemoved(file.id);
                    fileUpload.removeFile(file.id);
                  }}
                  size="icon"
                  variant="ghost"
                >
                  <X aria-hidden="true" class="size-4" />
                </Button>
              </div>

              <!-- Upload progress bar -->
              {#if fileProgress && !fileProgress.completed}
                <div class="mt-1 flex items-center gap-2">
                  <div class="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                    <div
                      class="h-full bg-primary transition-all duration-300 ease-out"
                      style="width: {fileProgress.progress}%"
                    ></div>
                  </div>
                  <span class="w-10 text-muted-foreground text-xs tabular-nums">{fileProgress.progress}%</span>
                </div>
              {/if}
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
