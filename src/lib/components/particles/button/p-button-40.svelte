<script lang="ts">
  import Download from "@lucide/svelte/icons/download";
  import X from "@lucide/svelte/icons/x";
  import { Button } from "$lib/components/ui/button";
  import { Group, GroupSeparator, GroupText } from "$lib/components/ui/group";
  import { Spinner } from "$lib/components/ui/spinner";
  import { toastManager } from "$lib/components/ui/toast";
  import {
    Tooltip,
    TooltipPopup,
    TooltipProvider,
    TooltipTrigger,
  } from "$lib/components/ui/tooltip";

  let isDownloading = $state(false);
  let progress = $state(0);
  let abortController: AbortController | null = null;
  let infoToastId: string | null = null;

  $effect(() => {
    if (!isDownloading) return;

    const interval = setInterval(() => {
      progress = Math.min(99, progress + Math.round(Math.random() * 8 + 2));
    }, 300);

    return () => clearInterval(interval);
  });

  async function handleDownload() {
    if (isDownloading) return;

    isDownloading = true;
    progress = 0;
    abortController = new AbortController();

    infoToastId = toastManager.add({
      description: "Your download will begin once ready.",
      title: "Generating report…",
      type: "info",
    });

    try {
      await new Promise<string>((resolve, reject) => {
        const shouldSucceed = Math.random() > 0.2;
        const timeoutId = setTimeout(() => {
          if (shouldSucceed) {
            resolve("Download complete");
          } else {
            reject(new Error("Download failed"));
          }
        }, 4000);

        abortController?.signal.addEventListener("abort", () => {
          clearTimeout(timeoutId);
          reject(new DOMException("Cancelled", "AbortError"));
        });
      });
    } catch (err) {
      if (infoToastId) {
        toastManager.dismiss(infoToastId);
        infoToastId = null;
      }

      if (err instanceof DOMException && err.name === "AbortError") {
        toastManager.add({
          description: "Report generation was cancelled.",
          title: "Cancelled",
          type: "error",
        });
      } else {
        toastManager.add({
          description: "Please try again later.",
          title: "Failed to generate report",
          type: "error",
        });
      }
    } finally {
      isDownloading = false;
      progress = 0;
      abortController = null;
      infoToastId = null;
    }
  }

  function handleCancel() {
    abortController?.abort();
  }
</script>

<TooltipProvider delay={0}>
  {#if isDownloading}
    <Group>
      <GroupText aria-live="polite" class="cursor-default gap-2" role="status">
        <Spinner />
        <span aria-hidden="true" class="font-medium text-foreground tabular-nums">
          {progress.toString().padStart(2, " ")}%
        </span>
        <span class="sr-only">Generating report, {progress}% complete</span>
      </GroupText>
      <GroupSeparator />
      <Tooltip>
        <TooltipTrigger>
          {#snippet child({ props })}
            <Button
              aria-label="Cancel download"
              onclick={handleCancel}
              size="icon"
              variant="outline"
              {...props}
            >
              <X aria-hidden="true" />
            </Button>
          {/snippet}
        </TooltipTrigger>
        <TooltipPopup>Cancel</TooltipPopup>
      </Tooltip>
    </Group>
  {:else}
    <Button onclick={handleDownload} variant="outline">
      <Download aria-hidden="true" />
      Download
    </Button>
  {/if}
</TooltipProvider>
