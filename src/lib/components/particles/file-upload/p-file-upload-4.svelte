<script lang="ts">
  import AlertCircle from '@lucide/svelte/icons/alert-circle';
  import ImageUp from '@lucide/svelte/icons/image-up';
  import X from '@lucide/svelte/icons/x';
  import { Button } from '$lib/components/ui/button';
  import { useFileUpload } from '$lib/hooks/use-file-upload.svelte';

  const maxSizeMB = 5;
  const maxSize = maxSizeMB * 1024 * 1024; // 5MB default

  const fileUpload = useFileUpload({ accept: 'image/*', maxSize });

  const previewUrl = $derived(fileUpload.files[0]?.preview ?? null);
</script>

<div class="flex flex-col gap-2">
  <div class="relative">
    <!-- Drop area -->
    <div
      class="relative flex min-h-52 flex-col items-center justify-center overflow-hidden rounded-xl border border-input border-dashed p-4 transition-colors hover:bg-accent/50 has-disabled:pointer-events-none has-[input:focus]:border-ring has-[img]:border-none has-disabled:opacity-50 has-[input:focus]:ring-[3px] has-[input:focus]:ring-ring/50 data-[dragging=true]:bg-accent/50"
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
      />
      {#if previewUrl}
        <div class="absolute inset-0">
          <img
            alt={fileUpload.files[0]?.file?.name || 'Uploaded image'}
            class="size-full object-cover"
            src={previewUrl}
          />
        </div>
      {:else}
        <div class="flex flex-col items-center justify-center px-4 py-3 text-center">
          <div
            aria-hidden="true"
            class="mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border bg-background"
          >
            <ImageUp class="size-4 opacity-60" />
          </div>
          <p class="mb-1.5 font-medium text-sm">Drop your image here or click to browse</p>
          <p class="text-muted-foreground text-xs">Max size: {maxSizeMB}MB</p>
        </div>
      {/if}
    </div>
    {#if previewUrl}
      <Button
        aria-label="Remove image"
        class="absolute top-4 right-4 size-8 rounded-full shadow-none"
        onclick={() => fileUpload.removeFile(fileUpload.files[0]?.id)}
        size="icon"
      >
        <X aria-hidden="true" class="size-4" />
      </Button>
    {/if}
  </div>

  {#if fileUpload.errors.length > 0}
    <div class="flex items-center gap-1 text-destructive text-xs" role="alert">
      <AlertCircle class="size-3 shrink-0" />
      <span>{fileUpload.errors[0]}</span>
    </div>
  {/if}
</div>
