<script lang="ts">
  import ComponentPreviewTabs from "$lib/components/app/ComponentPreviewTabs.svelte";
  import {
    ArchiveIcon,
    Pencil,
    EllipsisIcon,
    FilesIcon,
    FilmIcon,
    ShareIcon,
    TrashIcon,
    ZoomInIcon,
    ZoomOutIcon,
    QrCodeIcon,
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

<ComponentPreviewTabs>
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
        <Button aria-label="Menu" size="icon" variant="outline">
          <EllipsisIcon className="size-4" /></Button
        >
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
</ComponentPreviewTabs>
<ComponentPreviewTabs>
  <Group aria-label="Zoom controls" orientation="vertical">
    <Button aria-label="Zoom in" size="icon" variant="outline">
      <ZoomInIcon />
    </Button>
    <GroupSeparator orientation="horizontal" />
    <Button aria-label="Zoom Out" size="icon" variant="outline">
      <ZoomOutIcon />
    </Button>
  </Group>
</ComponentPreviewTabs>
<ComponentPreviewTabs>
  <Group>
    <Button aria-label="QR code" size="icon">
      <QrCodeIcon aria-hidden="true" />
    </Button>
    <GroupSeparator class="bg-primary/72" />
    <Button>Sign in</Button>
  </Group>
</ComponentPreviewTabs>
