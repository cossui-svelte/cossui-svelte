<script lang="ts">
  import SaveIcon from '@lucide/svelte/icons/save';
  import { buttonVariants } from '$lib/components/ui/button';
  import { anchoredToastManager } from '$lib/components/ui/toast';
  import {
    Tooltip,
    TooltipPopup,
    TooltipProvider,
    TooltipTrigger
  } from '$lib/components/ui/tooltip';

  const ANCHORED_SAVE_ERROR_TOAST_ID = 'coss-demo-anchored-save-error-toast';
  const toastTimeout = 2000;

  function handleSave(e: MouseEvent) {
    const anchor = e.currentTarget as HTMLElement;
    anchoredToastManager.add({
      data: { tooltipStyle: true },
      id: ANCHORED_SAVE_ERROR_TOAST_ID,
      positionerProps: { anchor, sideOffset: 6 },
      timeout: toastTimeout,
      title: "Couldn't save draft",
      type: 'error'
    });
  }
</script>

<TooltipProvider>
  <Tooltip delay={0}>
    <TooltipTrigger
      aria-label="Save"
      class={buttonVariants({ size: 'icon', variant: 'outline' })}
      onclick={handleSave}
    >
      <SaveIcon aria-hidden="true" />
    </TooltipTrigger>
    <TooltipPopup>
      <p>Save</p>
    </TooltipPopup>
  </Tooltip>
</TooltipProvider>
