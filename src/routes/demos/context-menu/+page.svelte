<script lang="ts">
    import ComponentPreviewTabs from "$lib/components/app/docs/component-preview-tabs.svelte";
    import CopyIcon from "@lucide/svelte/icons/copy";
    import CutIcon from "@lucide/svelte/icons/scissors";
    import PasteIcon from "@lucide/svelte/icons/clipboard";
    import TrashIcon from "@lucide/svelte/icons/trash";
    import {
        ContextMenu,
        ContextMenuCheckboxItem,
        ContextMenuGroup,
        ContextMenuGroupLabel,
        ContextMenuItem,
        ContextMenuPopup,
        ContextMenuRadioGroup,
        ContextMenuRadioItem,
        ContextMenuSeparator,
        ContextMenuShortcut,
        ContextMenuSub,
        ContextMenuSubPopup,
        ContextMenuSubTrigger,
        ContextMenuTrigger,
    } from "$lib/components/ui/context-menu";
</script>

<ComponentPreviewTabs>
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
</ComponentPreviewTabs>

<ComponentPreviewTabs>
    <ContextMenu>
        <ContextMenuTrigger>
            <div
                class="flex h-32 w-64 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground select-none"
            >
                Right-click here
            </div>
        </ContextMenuTrigger>
        <ContextMenuPopup>
            <ContextMenuGroup>
                <ContextMenuGroupLabel>Edit</ContextMenuGroupLabel>
                <ContextMenuItem>
                    <CutIcon aria-hidden="true" />
                    Cut
                    <ContextMenuShortcut>⌘X</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem>
                    <CopyIcon aria-hidden="true" />
                    Copy
                    <ContextMenuShortcut>⌘C</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem>
                    <PasteIcon aria-hidden="true" />
                    Paste
                    <ContextMenuShortcut>⌘V</ContextMenuShortcut>
                </ContextMenuItem>
            </ContextMenuGroup>
            <ContextMenuSeparator />

            <ContextMenuCheckboxItem>Show Hidden Files</ContextMenuCheckboxItem>
            <ContextMenuCheckboxItem>Show Extensions</ContextMenuCheckboxItem>
            <ContextMenuCheckboxItem disabled
                >Show Preview</ContextMenuCheckboxItem
            >
            <ContextMenuSeparator />
            <ContextMenuGroup>
                <ContextMenuGroupLabel>Sort by</ContextMenuGroupLabel>
                <ContextMenuRadioGroup>
                    <ContextMenuRadioItem value="name"
                        >Name</ContextMenuRadioItem
                    >
                    <ContextMenuRadioItem value="date"
                        >Date Modified</ContextMenuRadioItem
                    >
                    <ContextMenuRadioItem value="size"
                        >Size</ContextMenuRadioItem
                    >
                </ContextMenuRadioGroup>
            </ContextMenuGroup>
            <ContextMenuSeparator />
            <ContextMenuCheckboxItem variant="switch"
                >Auto Arrange</ContextMenuCheckboxItem
            >
            <ContextMenuSeparator />
            <ContextMenuSub>
                <ContextMenuSubTrigger>Open With</ContextMenuSubTrigger>
                <ContextMenuSubPopup>
                    <ContextMenuItem>VS Code</ContextMenuItem>
                    <ContextMenuSub>
                        <ContextMenuSubTrigger
                            >Text Editor</ContextMenuSubTrigger
                        >
                        <ContextMenuSubPopup>
                            <ContextMenuItem>Vim</ContextMenuItem>
                            <ContextMenuItem>Emacs</ContextMenuItem>
                            <ContextMenuItem>Nano</ContextMenuItem>
                            <ContextMenuSeparator />
                            <ContextMenuItem>Sublime Text</ContextMenuItem>
                            <ContextMenuItem>Atom</ContextMenuItem>
                        </ContextMenuSubPopup>
                    </ContextMenuSub>
                    <ContextMenuItem>Terminal</ContextMenuItem>
                </ContextMenuSubPopup>
            </ContextMenuSub>
            <ContextMenuSeparator />
            <ContextMenuItem variant="destructive">
                <TrashIcon aria-hidden="true" />
                Delete
                <ContextMenuShortcut>⌘⌫</ContextMenuShortcut>
            </ContextMenuItem>
        </ContextMenuPopup>
    </ContextMenu>
</ComponentPreviewTabs>
