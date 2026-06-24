<script lang="ts">
  import Pause from "@lucide/svelte/icons/pause";
  import Play from "@lucide/svelte/icons/play";
  import SkipBack from "@lucide/svelte/icons/skip-back";
  import SkipForward from "@lucide/svelte/icons/skip-forward";
  import Trash from "@lucide/svelte/icons/trash";
  import { buttonVariants } from "$lib/components/ui/button";
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

  let shuffle = $state(false);
  let repeat = $state(false);
  let autoSave = $state(false);
  let sortBy = $state("artist");
</script>

<Menu>
  <MenuTrigger class={buttonVariants({ variant: "outline" })}>Open menu</MenuTrigger>
  <MenuPopup>
    <MenuGroup>
      <MenuGroupLabel>Playback</MenuGroupLabel>
      <MenuItem>
        <Play aria-hidden="true" />
        Play
        <MenuShortcut>⌘P</MenuShortcut>
      </MenuItem>
      <MenuItem disabled>
        <Pause aria-hidden="true" />
        Pause
        <MenuShortcut>⇧⌘P</MenuShortcut>
      </MenuItem>
      <MenuItem>
        <SkipBack aria-hidden="true" />
        Previous
        <MenuShortcut>⌘[</MenuShortcut>
      </MenuItem>
      <MenuItem>
        <SkipForward aria-hidden="true" />
        Next
        <MenuShortcut>⌘]</MenuShortcut>
      </MenuItem>
    </MenuGroup>
    <MenuSeparator />
    <MenuCheckboxItem checked={shuffle} onCheckedChange={(v) => { shuffle = v; }}>Shuffle</MenuCheckboxItem>
    <MenuCheckboxItem checked={repeat} onCheckedChange={(v) => { repeat = v; }}>Repeat</MenuCheckboxItem>
    <MenuCheckboxItem disabled>Enhanced Audio</MenuCheckboxItem>
    <MenuSeparator />
    <MenuGroup>
      <MenuGroupLabel>Sort by</MenuGroupLabel>
      <MenuRadioGroup value={sortBy} onValueChange={(v) => { sortBy = v; }}>
        <MenuRadioItem value="artist">Artist</MenuRadioItem>
        <MenuRadioItem value="album">Album</MenuRadioItem>
        <MenuRadioItem value="title">Title</MenuRadioItem>
      </MenuRadioGroup>
    </MenuGroup>
    <MenuSeparator />
    <MenuCheckboxItem variant="switch" checked={autoSave} onCheckedChange={(v) => { autoSave = v; }}>Auto save</MenuCheckboxItem>
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
      <Trash aria-hidden="true" />
      Delete
      <MenuShortcut>⌘⌫</MenuShortcut>
    </MenuItem>
  </MenuPopup>
</Menu>
