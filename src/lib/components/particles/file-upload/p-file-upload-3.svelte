<script lang="ts">
  import CircleUserRound from '@lucide/svelte/icons/circle-user-round';
  import X from '@lucide/svelte/icons/x';
  import { Button } from '$lib/components/ui/button';
  import { useFileUpload } from '$lib/hooks/use-file-upload.svelte';

  const fileUpload = useFileUpload({ accept: 'image/*' });

  const previewUrl = $derived(fileUpload.files[0]?.preview ?? null);
</script>

<div class="flex flex-col items-center gap-2">
  <div class="relative inline-flex">
    <!-- Drop area -->
    <button
      aria-label={previewUrl ? 'Change image' : 'Upload image'}
      class="relative flex size-16 items-center justify-center overflow-hidden rounded-full border border-input border-dashed outline-none transition-colors hover:bg-accent/50 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-disabled:pointer-events-none has-[img]:border-none has-disabled:opacity-50 data-[dragging=true]:bg-accent/50"
      data-dragging={fileUpload.isDragging || undefined}
      onclick={fileUpload.openFileDialog}
      ondragenter={fileUpload.handleDragEnter}
      ondragleave={fileUpload.handleDragLeave}
      ondragover={fileUpload.handleDragOver}
      ondrop={fileUpload.handleDrop}
      type="button"
    >
      {#if previewUrl}
        <img
          alt={fileUpload.files[0]?.file?.name || 'Uploaded image'}
          class="size-full object-cover"
          height={64}
          src={previewUrl}
          style="object-fit: cover;"
          width={64}
        />
      {:else}
        <div aria-hidden="true">
          <CircleUserRound class="size-4 opacity-60" />
        </div>
      {/if}
    </button>
    {#if previewUrl}
      <Button
        aria-label="Remove image"
        class="absolute -top-1 -right-1 size-6 rounded-full border-2 border-background shadow-none focus-visible:border-background"
        onclick={() => fileUpload.removeFile(fileUpload.files[0]?.id)}
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
</div>
