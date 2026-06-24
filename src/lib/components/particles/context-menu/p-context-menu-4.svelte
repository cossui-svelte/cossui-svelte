<script lang="ts">
  import {
    ContextMenu,
    ContextMenuCheckboxItem,
    ContextMenuPopup,
    ContextMenuTrigger,
  } from "$lib/components/ui/context-menu";

  let showHidden = $state(true);
  let compactView = $state(false);
</script>

<ContextMenu>
  <ContextMenuTrigger class="flex h-32 w-full max-w-sm items-center justify-center rounded-lg border border-dashed text-muted-foreground text-sm">
    Right click here
  </ContextMenuTrigger>
  <ContextMenuPopup>
    <ContextMenuCheckboxItem bind:checked={showHidden}>Show hidden files</ContextMenuCheckboxItem>
    <ContextMenuCheckboxItem bind:checked={compactView}>Compact view</ContextMenuCheckboxItem>
  </ContextMenuPopup>
</ContextMenu>
