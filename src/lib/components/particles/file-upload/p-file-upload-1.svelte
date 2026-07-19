<script lang="ts">
  import CircleUserRound from '@lucide/svelte/icons/circle-user-round';
  import { Button } from '$lib/components/ui/button';
  import { useFileUpload } from '$lib/hooks/use-file-upload.svelte';

  const fileUpload = useFileUpload({ accept: 'image/*' });

  const previewUrl = $derived(fileUpload.files[0]?.preview ?? null);
  const fileName = $derived(fileUpload.files[0]?.file.name ?? null);
</script>

<div class="flex flex-col items-center gap-2">
  <div class="inline-flex items-center gap-2 align-top">
    <div
      aria-label={previewUrl ? 'Upload preview' : 'Default user avatar'}
      class="relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md border border-input"
    >
      {#if previewUrl}
        <img alt="Upload preview" class="size-full object-cover" height={32} src={previewUrl} width={32} />
      {:else}
        <div aria-hidden="true">
          <CircleUserRound class="opacity-60" size={16} />
        </div>
      {/if}
    </div>
    <div class="relative inline-block">
      <Button aria-haspopup="dialog" onclick={fileUpload.openFileDialog}>
        {fileName ? 'Change image' : 'Upload image'}
      </Button>
      <input
        bind:this={fileUpload.fileInput}
        {...fileUpload.inputProps}
        aria-label="Upload image file"
        class="sr-only"
        tabindex={-1}
      />
    </div>
  </div>
  {#if fileName}
    <div class="inline-flex gap-2 text-xs">
      <p aria-live="polite" class="truncate text-muted-foreground">{fileName}</p>
      <button
        aria-label={`Remove ${fileName}`}
        class="font-medium text-destructive hover:underline"
        onclick={() => fileUpload.removeFile(fileUpload.files[0]?.id)}
        type="button"
      >
        Remove
      </button>
    </div>
  {/if}
</div>
