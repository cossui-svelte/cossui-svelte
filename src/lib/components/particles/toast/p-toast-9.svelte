<script lang="ts">
  import DownloadIcon from "@lucide/svelte/icons/download";
  import { Button } from "$lib/components/ui/button";
  import { toastManager } from "$lib/components/ui/toast";

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

    const id = toastManager.add({
      description: "Your download will begin once ready.",
      duration: 0,
      title: "Generating report…",
      type: "loading",
    });

    const p = new Promise<string>((resolve, reject) => {
      const shouldSucceed = Math.random() > 0.2;
      const timeoutId = setTimeout(() => {
        if (shouldSucceed) {
          resolve("Report ready");
        } else {
          reject(new Error("Generation failed"));
        }
      }, 4000);
      abortController?.signal.addEventListener("abort", () => {
        clearTimeout(timeoutId);
        reject(new DOMException("Cancelled", "AbortError"));
      });
    });

    try {
      await p;
      toastManager.dismiss(id);
      toastManager.add({
        description: "Your file is now downloading.",
        title: "Download started",
        type: "success",
      });
    } catch (err) {
      toastManager.dismiss(id);
      const error = err as Error;
      if (error.name === "AbortError") {
        toastManager.add({
          description: "Report generation was cancelled.",
          title: "Cancelled",
          type: "info",
        });
      } else {
        toastManager.add({
          description: "Please try again later.",
          title: "Failed to generate report",
          type: "error",
        });
      }
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
    <span class="tabular-nums">
      {progress.toString().padStart(2, " ")}%
    </span>
  {:else}
    <DownloadIcon />
    Download
  {/if}
</Button>
