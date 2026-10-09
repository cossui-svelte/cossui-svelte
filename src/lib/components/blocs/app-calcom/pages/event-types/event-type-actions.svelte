<script lang="ts">
  import CodeIcon from '@lucide/svelte/icons/code';
  import CopyIcon from '@lucide/svelte/icons/copy';
  import EllipsisIcon from '@lucide/svelte/icons/ellipsis';
  import EyeIcon from '@lucide/svelte/icons/eye';
  import Link2Icon from '@lucide/svelte/icons/link-2';
  import PencilIcon from '@lucide/svelte/icons/pencil';
  import Share2Icon from '@lucide/svelte/icons/share-2';
  import TrashIcon from '@lucide/svelte/icons/trash';
  import { buttonVariants } from '#lib/components/ui/button/index.js';
  import {
    Drawer,
    DrawerClose,
    DrawerMenu,
    DrawerMenuCheckboxItem,
    DrawerMenuGroup,
    drawerMenuItemClass,
    DrawerMenuSeparator,
    DrawerPanel,
    DrawerPopup,
    DrawerTrigger
  } from '#lib/components/ui/drawer/index.js';
  import { Group, GroupSeparator } from '#lib/components/ui/group/index.js';
  import {
    Menu,
    MenuItem,
    MenuPopup,
    MenuSeparator,
    MenuTrigger
  } from '#lib/components/ui/menu/index.js';
  import { Switch } from '#lib/components/ui/switch/index.js';
  import { Tooltip, TooltipPopup, TooltipTrigger } from '#lib/components/ui/tooltip/index.js';

  let {
    isHidden,
    onHiddenChange
  }: {
    isHidden: boolean;
    onHiddenChange: (hidden: boolean) => void;
  } = $props();

  const iconButton = buttonVariants({ size: 'icon', variant: 'outline' });

  // The "More options" trigger is both a Menu trigger and a Tooltip anchor.
  let moreRef = $state<HTMLElement | null>(null);
  let moreTipOpen = $state(false);
</script>

<div class="flex items-center gap-4 max-md:hidden">
  <Tooltip>
    <TooltipTrigger as="span" class="inline-flex">
      <Switch
        checked={!isHidden}
        class="relative"
        onCheckedChange={(checked) => onHiddenChange(!checked)}
      />
    </TooltipTrigger>
    <TooltipPopup sideOffset={11}>
      {isHidden ? 'Show on profile' : 'Hide from profile'}
    </TooltipPopup>
  </Tooltip>

  <Group>
    <Tooltip>
      <TooltipTrigger aria-label="Preview" class={iconButton}>
        <EyeIcon />
      </TooltipTrigger>
      <TooltipPopup>Preview</TooltipPopup>
    </Tooltip>
    <GroupSeparator />
    <Tooltip>
      <TooltipTrigger aria-label="Copy link" class={iconButton}>
        <Link2Icon />
        <span class="sr-only">Copy link</span>
      </TooltipTrigger>
      <TooltipPopup>Copy link</TooltipPopup>
    </Tooltip>
    <GroupSeparator />
    <Menu>
      <Tooltip bind:open={moreTipOpen}>
        <MenuTrigger
          aria-label="More options"
          bind:ref={moreRef}
          class={iconButton}
          onblur={() => (moreTipOpen = false)}
          onfocus={() => (moreTipOpen = true)}
          onpointerenter={() => (moreTipOpen = true)}
          onpointerleave={() => (moreTipOpen = false)}
        >
          <EllipsisIcon />
        </MenuTrigger>
        <TooltipPopup customAnchor={moreRef}>More options</TooltipPopup>
      </Tooltip>
      <MenuPopup align="end">
        <MenuItem>
          <PencilIcon />
          Edit
        </MenuItem>
        <MenuItem>
          <CopyIcon />
          Duplicate
        </MenuItem>
        <MenuItem>
          <CodeIcon />
          Embed
        </MenuItem>
        <MenuSeparator />
        <MenuItem variant="destructive">
          <TrashIcon />
          Delete
        </MenuItem>
      </MenuPopup>
    </Menu>
  </Group>
</div>

<div class="md:hidden">
  <Drawer>
    <DrawerTrigger aria-label="More options" class={iconButton}>
      <EllipsisIcon aria-hidden="true" />
    </DrawerTrigger>
    <DrawerPopup showBar>
      <DrawerPanel>
        <DrawerMenu>
          <DrawerClose class={drawerMenuItemClass}>
            <EyeIcon aria-hidden="true" />
            Preview
          </DrawerClose>
          <DrawerClose class={drawerMenuItemClass}>
            <Link2Icon aria-hidden="true" />
            Copy link to event
          </DrawerClose>
          <DrawerClose class={drawerMenuItemClass}>
            <Share2Icon aria-hidden="true" />
            Share
          </DrawerClose>
          <DrawerClose class={drawerMenuItemClass}>
            <PencilIcon aria-hidden="true" />
            Edit
          </DrawerClose>
          <DrawerClose class={drawerMenuItemClass}>
            <CopyIcon aria-hidden="true" />
            Duplicate
          </DrawerClose>
          <DrawerClose class={drawerMenuItemClass}>
            <CodeIcon aria-hidden="true" />
            Embed
          </DrawerClose>
          <DrawerMenuSeparator />
          <DrawerMenuGroup>
            <DrawerMenuCheckboxItem
              checked={!isHidden}
              onCheckedChange={(checked) => onHiddenChange(!checked)}
              variant="switch"
            >
              Show on profile
            </DrawerMenuCheckboxItem>
          </DrawerMenuGroup>
          <DrawerMenuSeparator />
          <DrawerClose class={drawerMenuItemClass} data-variant="destructive">
            <TrashIcon aria-hidden="true" />
            Delete
          </DrawerClose>
        </DrawerMenu>
      </DrawerPanel>
    </DrawerPopup>
  </Drawer>
</div>
