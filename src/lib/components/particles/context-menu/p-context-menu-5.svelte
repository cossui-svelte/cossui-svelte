<script lang="ts">
  import {
    ContextMenu,
    ContextMenuGroup,
    ContextMenuGroupLabel,
    ContextMenuItem,
    ContextMenuPopup,
    ContextMenuSeparator,
    ContextMenuTrigger,
  } from "$lib/components/ui/context-menu";
</script>

<ContextMenu>
  <ContextMenuTrigger class="flex h-32 w-full max-w-sm items-center justify-center rounded-lg border border-dashed text-muted-foreground text-sm">
    Right click here
  </ContextMenuTrigger>
  <ContextMenuPopup>
    <ContextMenuGroup>
      <ContextMenuGroupLabel>File</ContextMenuGroupLabel>
      <ContextMenuItem>Rename</ContextMenuItem>
      <ContextMenuItem>Duplicate</ContextMenuItem>
    </ContextMenuGroup>
    <ContextMenuSeparator />
    <ContextMenuGroup>
      <ContextMenuGroupLabel>Share</ContextMenuGroupLabel>
      <ContextMenuItem>Send copy</ContextMenuItem>
      <ContextMenuItem>Export</ContextMenuItem>
    </ContextMenuGroup>
  </ContextMenuPopup>
</ContextMenu>
