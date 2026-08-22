<script lang="ts">
  import DownloadIcon from '@lucide/svelte/icons/download';
  import { Button } from '$lib/components/ui/button';
  import { toastManager } from '$lib/components/ui/toast';

  let isGenerating = $state(false);
  let progress = $state(0);
  let abortController: AbortController | null = null;

  $effect(() => {
    if (!isGenerating) return;
    const interval = setInterval(() => {
      progress = Math.min(99, progress + Math.round(Math.random() * 8 + 2));
    }, 300);
    return () => clearInterval(interval);
  });

  async function handleDownload() {
    if (isGenerating) return;

    isGenerating = true;
    progress = 0;
    abortController = new AbortController();

    try {
      await toastManager.promise(
        new Promise<string>((resolve, reject) => {
          const shouldSucceed = Math.random() > 0.2;
          const timeoutId = setTimeout(() => {
            if (shouldSucceed) {
              resolve('Report ready');
            } else {
              reject(new Error('Generation failed'));
            }
          }, 4000);

          abortController?.signal.addEventListener('abort', () => {
            clearTimeout(timeoutId);
            reject(new DOMException('Cancelled', 'AbortError'));
          });
        }),
        {
          error: (err: unknown) => {
            if (err instanceof DOMException && err.name === 'AbortError') {
              return {
                actionProps: undefined,
                description: 'Report generation was cancelled.',
                title: 'Cancelled',
                type: 'info' as const
              };
            }
            return {
              actionProps: undefined,
              description: 'Please try again later.',
              title: 'Failed to generate report'
            };
          },
          loading: {
            actionProps: {
              children: 'Cancel',
              onclick: () => abortController?.abort()
            },
            description: 'Your download will begin once ready.',
            title: 'Generating report…'
          },
          success: () => ({
            actionProps: undefined,
            description: 'Your file is now downloading.',
            title: 'Download started'
          })
        }
      );
    } finally {
      isGenerating = false;
      progress = 0;
      abortController = null;
    }
  }
</script>

<Button disabled={isGenerating} onclick={handleDownload} variant="outline">
  {#if isGenerating}
    Loading…
    <span class="tabular-nums"> {progress.toString().padStart(2, ' ')}% </span>
  {:else}
    <DownloadIcon />
    Download
  {/if}
</Button>
