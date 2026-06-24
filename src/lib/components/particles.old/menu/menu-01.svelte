<script lang="ts">
    import PauseIcon from "@lucide/svelte/icons/pause";
    import PlayIcon from "@lucide/svelte/icons/play";
    import SkipBackIcon from "@lucide/svelte/icons/skip-back";
    import SkipForwardIcon from "@lucide/svelte/icons/skip-forward";
    import TrashIcon from "@lucide/svelte/icons/trash";
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
        <MenuCheckboxItem>Repeat</MenuCheckboxItem>
        <MenuCheckboxItem disabled>Enhanced Audio</MenuCheckboxItem>
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
