<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import {
    AnchoredToastProvider,
    anchoredToastManager,
    ToastProvider,
    toastManager,
  } from "$lib/components/ui/toast";
  import ComponentPreviewTabs from "$lib/components/app/docs/component-preview-tabs.svelte";

  const DEDUP_ID = "coss-demo-dedup-toast";
</script>

<!-- Standard toast viewport (rendered once at layout level) -->
<ToastProvider position="bottom-right" />

<!-- Anchored toast viewport -->
<!-- <AnchoredToastProvider /> -->

<ComponentPreviewTabs>
  <!-- ── Standard toasts ──────────────────────────────────────────────── -->
  <div class="flex flex-wrap items-center justify-center gap-3">
    <Button
      variant="outline"
      onclick={() =>
        toastManager.add({
          title: "Event has been created",
          description: "Monday, January 3rd at 6:00 pm",
        })}
    >
      Default
    </Button>

    <Button
      variant="outline"
      onclick={() =>
        toastManager.success("Saved successfully", {
          description: "Your changes have been saved.",
        })}
    >
      Success
    </Button>

    <Button
      variant="outline"
      onclick={() =>
        toastManager.error("Something went wrong", {
          description: "Please try again later.",
        })}
    >
      Error
    </Button>

    <Button
      variant="outline"
      onclick={() =>
        toastManager.warning("Subscription ending", {
          description: "Your trial expires in 3 days.",
        })}
    >
      Warning
    </Button>

    <Button
      variant="outline"
      onclick={() =>
        toastManager.info("New version available", {
          description: "Refresh to get the latest features.",
        })}
    >
      Info
    </Button>

    <Button
      variant="outline"
      onclick={() =>
        toastManager.loading("Uploading file…", { duration: 3000 })}
    >
      Loading
    </Button>
  </div>

  <!-- ── Toast with action button ────────────────────────────────────── -->
  <div class="flex flex-wrap items-center justify-center gap-3">
    <Button
      variant="outline"
      onclick={() =>
        toastManager.add({
          title: "File deleted",
          description: "report-q4.pdf has been removed.",
          type: "error",
          action: {
            label: "Undo",
            onclick: () => toastManager.info("Deletion undone"),
          },
        })}
    >
      With action
    </Button>

    <Button
      variant="outline"
      onclick={() =>
        toastManager.add({
          title: "Meeting scheduled",
          description: "Thursday at 2:00 pm",
          type: "success",
          action: {
            label: "View",
            onclick: () => toastManager.info("Opening calendar…"),
          },
        })}
    >
      Success with action
    </Button>
  </div>

  <!-- ── Anchored toasts ──────────────────────────────────────────────── -->
  <div class="flex flex-wrap items-center justify-center gap-3">
    <Button
      variant="outline"
      onclick={(e: MouseEvent) => {
        const btn = e.currentTarget as HTMLElement;
        anchoredToastManager.add({
          title: "Anchored toast",
          description: "This toast is positioned relative to the button.",
          type: "info",
          positionerProps: { anchor: btn, side: "top", sideOffset: 8 },
        });
      }}
    >
      Anchored (top)
    </Button>

    <Button
      variant="outline"
      onclick={(e: MouseEvent) => {
        const btn = e.currentTarget as HTMLElement;
        anchoredToastManager.add({
          title: "Below the button",
          type: "success",
          positionerProps: { anchor: btn, side: "bottom", sideOffset: 8 },
        });
      }}
    >
      Anchored (bottom)
    </Button>

    <Button
      variant="outline"
      onclick={(e: MouseEvent) => {
        const btn = e.currentTarget as HTMLElement;
        anchoredToastManager.add({
          title: "Tooltip style",
          tooltipStyle: true,
          positionerProps: { anchor: btn, side: "top", sideOffset: 6 },
        });
      }}
    >
      Tooltip style
    </Button>

    <Button
      variant="outline"
      onclick={(e: MouseEvent) => {
        const btn = e.currentTarget as HTMLElement;
        anchoredToastManager.add({
          title: "Action required",
          description: "Please confirm before proceeding.",
          type: "warning",
          positionerProps: {
            anchor: btn,
            side: "bottom",
            align: "start",
            sideOffset: 8,
          },
          action: {
            label: "Confirm",
            onclick: () => toastManager.success("Confirmed!"),
          },
        });
      }}
    >
      Anchored with action
    </Button>
  </div>
</ComponentPreviewTabs>

<ComponentPreviewTabs>
  <Button
    onclick={() => {
      toastManager.add({
        description:
          "Repeated clicks update this toast instead of stacking another.",
        id: DEDUP_ID,
        title: "Saved",
        type: "success",
      });
    }}
    variant="outline"
  >
    One Success Toast
  </Button>
</ComponentPreviewTabs>
