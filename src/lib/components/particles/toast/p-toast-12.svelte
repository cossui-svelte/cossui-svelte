<script lang="ts">
  import SaveIcon from '@lucide/svelte/icons/save';
  import { buttonVariants } from '$lib/components/ui/button';
  import { anchoredToastManager } from '$lib/components/ui/toast';
  import { Tooltip, TooltipPopup, TooltipTrigger } from '$lib/components/ui/tooltip';
  import TooltipProvider from '$lib/components/ui/tooltip/tooltip-provider.svelte';

  const ANCHORED_SAVE_TOAST_ID = 'coss-demo-anchored-save-toast';
  const toastTimeout = 2000;

  function handleSave(e: MouseEvent) {
    const anchor = e.currentTarget as HTMLElement;
    anchoredToastManager.add({
      data: { tooltipStyle: true },
      id: ANCHORED_SAVE_TOAST_ID,
      positionerProps: { anchor, sideOffset: 6 },
      timeout: toastTimeout,
      title: 'Draft saved'
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
