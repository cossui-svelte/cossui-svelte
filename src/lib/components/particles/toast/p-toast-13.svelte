<script lang="ts">
  import SaveIcon from "@lucide/svelte/icons/save";
  import { Button } from "$lib/components/ui/button";
  import { anchoredToastManager } from "$lib/components/ui/toast";
  import {
    Tooltip,
    TooltipPopup,
    TooltipProvider,
    TooltipTrigger,
  } from "$lib/components/ui/tooltip";

  const ANCHORED_SAVE_ERROR_TOAST_ID = "coss-demo-anchored-save-error-toast";
  const toastTimeout = 2000;

  function handleSave(e: MouseEvent) {
    const anchor = e.currentTarget as HTMLElement;
    anchoredToastManager.add({
      duration: toastTimeout,
      id: ANCHORED_SAVE_ERROR_TOAST_ID,
      positionerProps: { anchor, sideOffset: 6 },
      title: "Couldn't save draft",
      tooltipStyle: true,
      type: "error",
    });
  }
</script>

<TooltipProvider>
  <Tooltip delay={0}>
    <TooltipTrigger>
      {#snippet child({ props })}
        <Button
          aria-label="Save"
          size="icon"
          variant="outline"
          {...props}
          onclick={handleSave}
        >
          <SaveIcon aria-hidden="true" />
        </Button>
      {/snippet}
    </TooltipTrigger>
    <TooltipPopup>
      <p>Save</p>
    </TooltipPopup>
  </Tooltip>
</TooltipProvider>
