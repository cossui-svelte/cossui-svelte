<script lang="ts">
  import ComponentPreviewTabs from "$lib/components/app/component-preview-tabs.svelte";
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
    AudioWaveformIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    DownloadIcon,
    ChevronDownIcon,
    SquarePenIcon,
  } from "@lucide/svelte";

  import { Group, GroupSeparator, GroupText } from "$lib/components/ui/group";
  import {
    Menu,
    MenuTrigger,
    MenuItem,
    MenuPopup,
  } from "$lib/components/ui/menu";
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
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
    <Button variant="outline">
      <AudioWaveformIcon aria-hidden="true" />
      Audio
    </Button>
  </Group>
</ComponentPreviewTabs>
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
<ComponentPreviewTabs>
  <Group aria-label="Domain input">
    <GroupText>
      <Label aria-label="Domain" for="domain">https://</Label>
    </GroupText>
    <GroupSeparator />
    <Input aria-label="Domain" defaultValue="coss.ui" id="domain" type="text" />
  </Group>
</ComponentPreviewTabs>
<ComponentPreviewTabs>
  <Group aria-label="Domain input">
    <Input
      aria-label="Domain"
      defaultValue="coss"
      id="domain-suffix"
      type="text"
    />
    <GroupSeparator />
    <GroupText>
      <Label aria-label="Domain suffix" for="domain-suffix">.com</Label>
    </GroupText>
  </Group>
</ComponentPreviewTabs>
<ComponentPreviewTabs>
  <Group aria-label="Pagination">
    <Group aria-label="Page numbers">
      <Button class="min-w-8" variant="outline">1</Button>
      <GroupSeparator />
      <Button class="min-w-8" variant="outline">2</Button>
      <GroupSeparator />
      <Button class="min-w-8" variant="outline">3</Button>
      <GroupSeparator />
      <Button class="min-w-8" variant="outline">4</Button>
      <GroupSeparator />
      <Button class="min-w-8" variant="outline">5</Button>
    </Group>
    <Group aria-label="Navigation">
      <Button aria-label="Previous" size="icon" variant="outline">
        <ArrowLeftIcon aria-hidden="true" />
      </Button>
      <GroupSeparator />
      <Button aria-label="Next" size="icon" variant="outline">
        <ArrowRightIcon aria-hidden="true" />
      </Button>
    </Group>
  </Group>
</ComponentPreviewTabs>
<ComponentPreviewTabs>
  <Group aria-label="Subscription actions">
    <Button>Subscribe</Button>
    <GroupSeparator class="bg-primary/72" />
    <Menu>
      <MenuTrigger>
        <Button aria-label="Copy options" size="icon">
          <ChevronDownIcon aria-hidden="true" className="size-4" />
        </Button>
      </MenuTrigger>
      <MenuPopup align="end">
        <MenuItem>
          <ShareIcon aria-hidden="true" />
          Share link
        </MenuItem>
        <MenuItem>
          <DownloadIcon aria-hidden="true" />
          Download
        </MenuItem>
        <MenuItem>
          <SquarePenIcon aria-hidden="true" />
          Duplicate
        </MenuItem>
      </MenuPopup>
    </Menu>
  </Group>
</ComponentPreviewTabs>
