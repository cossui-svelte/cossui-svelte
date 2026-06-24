<script lang="ts">
  import SaveIcon from "@lucide/svelte/icons/save";
  import { Button } from "$lib/components/ui/button";
  import { anchoredToastManager } from "$lib/components/ui/toast";
  import { Tooltip, TooltipPopup, TooltipTrigger } from "$lib/components/ui/tooltip";

  const ANCHORED_SAVE_ERROR_TOAST_ID = "coss-demo-anchored-save-error-toast";
  const toastTimeout = 2000;

  function handleSave(e: MouseEvent) {
    const anchor = e.currentTarget as HTMLElement;
    anchoredToastManager.add({
      tooltipStyle: true,
      id: ANCHORED_SAVE_ERROR_TOAST_ID,
      positionerProps: { anchor, sideOffset: 6 },
      duration: toastTimeout,
      title: "Couldn't save draft",
      type: "error",
    });
  }
</script>

<Tooltip>
  <TooltipTrigger delay={0}>
    {#snippet child({ props })}
      <Button
        aria-label="Save"
        onclick={handleSave}
        size="icon"
        variant="outline"
        {...props}
      >
        <SaveIcon aria-hidden="true" />
      </Button>
    {/snippet}
  </TooltipTrigger>
  <TooltipPopup>
    <p>Save</p>
  </TooltipPopup>
</Tooltip>
