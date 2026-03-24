<script lang="ts">
  import {
    ArchiveIcon,
    Pencil,
    EllipsisIcon,
    FilesIcon,
    FilmIcon,
    ShareIcon,
    TrashIcon,
  } from "lucide-svelte";

  import { Group, GroupSeparator } from "$lib/components/ui/group";
  import {
    Menu,
    MenuTrigger,
    MenuItem,
    MenuPopup,
  } from "$lib/components/ui/menu";
  import { Button } from "$lib/components/ui/button";
</script>

<Group aria-label="File actions">
  <Button variant="outline">
    <FilesIcon aria-hidden="true" />
    Files
  </Button>
  <GroupSeparator />
  <Button variant="outline">
    <FilmIcon aria-hidden="true" />
    Media
  </Button>
  <GroupSeparator />
  <Menu>
    <MenuTrigger>
      <Button aria-label="Menu" size="icon" variant="outline" />
      <EllipsisIcon className="size-4" />
    </MenuTrigger>
    <MenuPopup align="end">
      <MenuItem>
        <Pencil aria-hidden="true" />
        Edit
      </MenuItem>
      <MenuItem>
        <ArchiveIcon aria-hidden="true" />
        Archive
      </MenuItem>
      <MenuItem>
        <ShareIcon aria-hidden="true" />
        Share
      </MenuItem>
      <MenuItem variant="destructive">
        <TrashIcon aria-hidden="true" />
        Delete
      </MenuItem>
    </MenuPopup>
  </Menu>
</Group>
