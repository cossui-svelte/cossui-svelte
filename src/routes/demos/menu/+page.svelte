<script lang="ts">
    import ComponentPreviewTabs from "$lib/components/app/component-preview-tabs.svelte";
    import {
        PauseIcon,
        PlayIcon,
        SkipBackIcon,
        SkipForwardIcon,
        TrashIcon,
    } from "@lucide/svelte";
    import { Button } from "$lib/components/ui/button";
    import {
        Menu,
        MenuCheckboxItem,
        MenuGroup,
        MenuGroupLabel,
        MenuItem,
        MenuPopup,
        MenuRadioGroup,
        MenuRadioItem,
        MenuSeparator,
        MenuShortcut,
        MenuSub,
        MenuSubPopup,
        MenuSubTrigger,
        MenuTrigger,
    } from "$lib/components/ui/menu";
</script>

<ComponentPreviewTabs>
    <Menu>
        <MenuTrigger>
            <Button variant="outline">Open menu</Button>
        </MenuTrigger>
        <MenuPopup>
            <MenuGroup>
                <MenuGroupLabel>Playback</MenuGroupLabel>
                <MenuItem>
                    <PlayIcon aria-hidden="true" />
                    Play
                    <MenuShortcut>⌘P</MenuShortcut>
                </MenuItem>
                <MenuItem disabled>
                    <PauseIcon aria-hidden="true" />
                    Pause
                    <MenuShortcut>⇧⌘P</MenuShortcut>
                </MenuItem>
                <MenuItem>
                    <SkipBackIcon aria-hidden="true" />
                    Previous
                    <MenuShortcut>⌘[</MenuShortcut>
                </MenuItem>
                <MenuItem>
                    <SkipForwardIcon aria-hidden="true" />
                    Next
                    <MenuShortcut>⌘]</MenuShortcut>
                </MenuItem>
            </MenuGroup>
            <MenuSeparator />

            <MenuCheckboxItem>Shuffle</MenuCheckboxItem>
            <MenuItem>Repeat</MenuItem>
            <MenuItem disabled>Enhanced Audio</MenuItem>
            <MenuSeparator />
            <MenuGroup>
                <MenuGroupLabel>Sort by</MenuGroupLabel>
                <MenuRadioGroup>
                    <MenuRadioItem value="artist">Artist</MenuRadioItem>
                    <MenuRadioItem value="album">Album</MenuRadioItem>
                    <MenuRadioItem value="title">Title</MenuRadioItem>
                </MenuRadioGroup>
            </MenuGroup>
            <MenuSeparator />
            <MenuCheckboxItem variant="switch">Auto save</MenuCheckboxItem>
            <MenuSeparator />
            <MenuSub>
                <MenuSubTrigger>Add to Playlist</MenuSubTrigger>
                <MenuSubPopup>
                    <MenuItem>Jazz</MenuItem>
                    <MenuSub>
                        <MenuSubTrigger>Rock</MenuSubTrigger>
                        <MenuSubPopup>
                            <MenuItem>Hard Rock</MenuItem>
                            <MenuItem>Soft Rock</MenuItem>
                            <MenuItem>Classic Rock</MenuItem>
                            <MenuSeparator />
                            <MenuItem>Metal</MenuItem>
                            <MenuItem>Punk</MenuItem>
                            <MenuItem>Grunge</MenuItem>
                            <MenuItem>Alternative</MenuItem>
                            <MenuItem>Indie</MenuItem>
                            <MenuItem>Electronic</MenuItem>
                        </MenuSubPopup>
                    </MenuSub>
                    <MenuItem>Pop</MenuItem>
                </MenuSubPopup>
            </MenuSub>
            <MenuSeparator />
            <MenuItem variant="destructive">
                <TrashIcon aria-hidden="true" />
                Delete
                <MenuShortcut>⌘⌫</MenuShortcut>
            </MenuItem>
        </MenuPopup>
    </Menu>
</ComponentPreviewTabs>
