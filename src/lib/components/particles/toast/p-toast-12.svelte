<script lang="ts">
  import SaveIcon from "@lucide/svelte/icons/save";
  import { Button } from "$lib/components/ui/button";
  import { anchoredToastManager } from "$lib/components/ui/toast";
  import {
    Tooltip,
    TooltipPopup,
    TooltipTrigger,
  } from "$lib/components/ui/tooltip";
  import TooltipProvider from "$lib/components/ui/tooltip/tooltip-provider.svelte";

  const ANCHORED_SAVE_TOAST_ID = "coss-demo-anchored-save-toast";
  const toastTimeout = 2000;

  function handleSave(e: MouseEvent) {
    const anchor = e.currentTarget as HTMLElement;
    anchoredToastManager.add({
      duration: toastTimeout,
      id: ANCHORED_SAVE_TOAST_ID,
      positionerProps: { anchor, sideOffset: 6 },
      title: "Draft saved",
      tooltipStyle: true,
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
