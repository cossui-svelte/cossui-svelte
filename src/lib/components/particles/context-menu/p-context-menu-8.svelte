<script lang="ts">
  import {
    ContextMenu,
    ContextMenuCheckboxItem,
    ContextMenuPopup,
    ContextMenuTrigger,
  } from "$lib/components/ui/context-menu";

  let autoSave = $state(true);
  let showPreview = $state(false);
</script>

<ContextMenu>
  <ContextMenuTrigger class="flex h-32 w-full max-w-sm items-center justify-center rounded-lg border border-dashed text-muted-foreground text-sm">
    Right click here
  </ContextMenuTrigger>
  <ContextMenuPopup>
    <ContextMenuCheckboxItem bind:checked={autoSave} variant="switch">Auto save</ContextMenuCheckboxItem>
    <ContextMenuCheckboxItem bind:checked={showPreview} variant="switch">Show preview</ContextMenuCheckboxItem>
  </ContextMenuPopup>
</ContextMenu>
