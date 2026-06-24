<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Spinner } from "$lib/components/ui/spinner";
  import { anchoredToastManager } from "$lib/components/ui/toast";

  let isSubmitting = $state(false);
  let toastId: string | null = null;
  let submitEl: HTMLElement | null = null;

  function handleClick(e: MouseEvent) {
    submitEl = e.currentTarget as HTMLElement;
    handleSubmit();
  }

  function handleSubmit() {
    if (!submitEl || isSubmitting) return;

    if (toastId) {
      anchoredToastManager.dismiss(toastId);
      toastId = null;
    }

    isSubmitting = true;

    new Promise<void>((_, reject) => {
      setTimeout(() => {
        isSubmitting = false;
        reject(new Error("The server is not responding. Please try again later."));
      }, 2000);
    }).catch((error: Error) => {
      if (submitEl) {
        toastId = anchoredToastManager.add({
          description: error.message,
          positionerProps: { anchor: submitEl, sideOffset: 4 },
          title: "Error submitting form",
          type: "error",
        });
      }
    });
  }
</script>

<Button disabled={isSubmitting} onclick={handleClick} variant="outline">
  {#if isSubmitting}
    <Spinner />
    Submitting…
  {:else}
    Submit
  {/if}
</Button>
