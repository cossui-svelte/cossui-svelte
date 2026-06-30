<script lang="ts">
    import {
        ContextMenu,
        ContextMenuItem,
        ContextMenuPopup,
        ContextMenuSeparator,
        ContextMenuTrigger,
    } from "$lib/components/ui/context-menu";
</script>

<ContextMenu>
    <ContextMenuTrigger
        class="flex h-32 w-full max-w-sm items-center justify-center rounded-lg border border-dashed text-muted-foreground text-sm"
    >
        Right click here
    </ContextMenuTrigger>
    <ContextMenuPopup>
        <ContextMenuItem>Back</ContextMenuItem>
        <ContextMenuItem>Forward</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Reload</ContextMenuItem>
    </ContextMenuPopup>
</ContextMenu>
