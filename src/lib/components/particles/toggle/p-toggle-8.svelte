<script lang="ts">
  import BookmarkIcon from "@lucide/svelte/icons/bookmark";
  import { anchoredToastManager } from "$lib/components/ui/toast";
  import { Toggle } from "$lib/components/ui/toggle";
  import { Tooltip, TooltipPopup, TooltipTrigger } from "$lib/components/ui/tooltip";

  let bookmarked = $state(false);
  let toggleEl: HTMLElement | null = null;
  let toastId: string | null = null;
  const toastTimeout = 2000;

  function handlePressedChange(pressed: boolean) {
    bookmarked = pressed;
    if (toastId) {
      anchoredToastManager.dismiss(toastId);
      toastId = null;
    }
    if (pressed && toggleEl) {
      toastId = anchoredToastManager.add({
        tooltipStyle: true,
        positionerProps: { anchor: toggleEl },
        duration: toastTimeout,
        title: "Bookmarked!",
        type: "success",
      });
    }
  }
</script>

<Tooltip>
  <TooltipTrigger>
    {#snippet child({ props })}
      <Toggle
        aria-label={bookmarked ? "Remove bookmark" : "Bookmark this"}
        bind:ref={toggleEl}
        bind:pressed={bookmarked}
        onPressedChange={handlePressedChange}
        {...props}
      >
        <BookmarkIcon aria-hidden="true" />
      </Toggle>
    {/snippet}
  </TooltipTrigger>
  <TooltipPopup>
    <p>{bookmarked ? "Remove bookmark" : "Bookmark this"}</p>
  </TooltipPopup>
</Tooltip>
