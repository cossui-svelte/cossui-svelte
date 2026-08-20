<script lang="ts">
  import BookmarkIcon from '@lucide/svelte/icons/bookmark';
  import { anchoredToastManager } from '$lib/components/ui/toast';
  import { Toggle } from '$lib/components/ui/toggle';
  import { Tooltip, TooltipPopup, TooltipProvider } from '$lib/components/ui/tooltip';

  let bookmarked = $state(false);
  let toggleEl: HTMLElement | null = null;
  let toastId: string | null = null;
  const toastTimeout = 2000;
  let tipOpen = $state(false);

  function handlePressedChange(pressed: boolean) {
    bookmarked = pressed;
    if (toastId) {
      anchoredToastManager.close(toastId);
      toastId = null;
    }
    if (pressed && toggleEl) {
      toastId = anchoredToastManager.add({
        data: { tooltipStyle: true },
        positionerProps: { anchor: toggleEl },
        timeout: toastTimeout,
        title: 'Bookmarked!',
        type: 'success'
      });
    }
  }
</script>

<TooltipProvider>
  <Tooltip bind:open={tipOpen}>
    <Toggle
      aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark this'}
      bind:ref={toggleEl}
      bind:pressed={bookmarked}
      onPressedChange={handlePressedChange}
      onpointerenter={() => (tipOpen = true)}
      onpointerleave={() => (tipOpen = false)}
      onfocus={() => (tipOpen = true)}
      onblur={() => (tipOpen = false)}
    >
      <BookmarkIcon aria-hidden="true" />
    </Toggle>
    <TooltipPopup customAnchor={toggleEl}>
      <p>{bookmarked ? 'Remove bookmark' : 'Bookmark this'}</p>
    </TooltipPopup>
  </Tooltip>
</TooltipProvider>
