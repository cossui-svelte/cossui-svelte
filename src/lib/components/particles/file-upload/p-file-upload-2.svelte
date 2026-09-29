<script lang="ts">
  import CircleUserRound from '@lucide/svelte/icons/circle-user-round';
  import X from '@lucide/svelte/icons/x';
  import { Button } from '$lib/components/ui/button';
  import { useFileUpload } from '$lib/hooks/use-file-upload.svelte';

  const fileUpload = useFileUpload({ accept: 'image/*' });

  const previewUrl = $derived(fileUpload.files[0]?.preview ?? null);
  const fileName = $derived(fileUpload.files[0]?.file.name ?? null);
</script>

<div class="flex flex-col items-center gap-2">
  <div class="relative inline-flex">
    <Button
      aria-label={previewUrl ? 'Change image' : 'Upload image'}
      class="relative size-16 overflow-hidden p-0 shadow-none"
      onclick={fileUpload.openFileDialog}
      variant="outline"
    >
      {#if previewUrl}
        <img
          alt="Upload preview"
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
    </Button>
    {#if previewUrl}
      <Button
        aria-label="Remove image"
        class="absolute -top-2 -right-2 size-6 rounded-full border-2 border-background shadow-none focus-visible:border-background"
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
  {#if fileName}
    <p class="text-muted-foreground text-xs">{fileName}</p>
  {/if}
</div>
