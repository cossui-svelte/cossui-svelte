<script lang="ts">
  import ChevronRight from '@lucide/svelte/icons/chevron-right';
  import Copy from '@lucide/svelte/icons/copy';
  import Ellipsis from '@lucide/svelte/icons/ellipsis';
  import Pencil from '@lucide/svelte/icons/pencil';
  import Share from '@lucide/svelte/icons/share';
  import Trash from '@lucide/svelte/icons/trash';
  import { buttonVariants } from '$lib/components/ui/button';
  import {
    Drawer,
    DrawerClose,
    DrawerMenu,
    DrawerMenuCheckboxItem,
    DrawerMenuGroup,
    DrawerMenuGroupLabel,
    DrawerMenuRadioGroup,
    DrawerMenuRadioItem,
    DrawerMenuSeparator,
    DrawerMenuTrigger,
    DrawerPanel,
    DrawerPopup,
    DrawerTrigger,
    drawerMenuItemClass
  } from '$lib/components/ui/drawer';
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
    MenuSub,
    MenuSubPopup,
    MenuSubTrigger,
    MenuTrigger
  } from '$lib/components/ui/menu';

  let isMobile = $state(false);

  $effect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    isMobile = mq.matches;
    const handler = (e: MediaQueryListEvent) => {
      isMobile = e.matches;
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  });

  let shuffle = $state(false);
  let repeat = $state(false);
  let autoSave = $state(false);
  let sortBy = $state('artist');
</script>

{#if isMobile}
  <Drawer>
    <DrawerTrigger
      aria-label="Open menu"
      class={buttonVariants({ size: 'icon', variant: 'outline' })}
    >
      <Ellipsis aria-hidden />
    </DrawerTrigger>
    <DrawerPopup showBar>
      <DrawerPanel>
        <DrawerMenu>
          <DrawerMenuGroup>
            <DrawerMenuGroupLabel>Actions</DrawerMenuGroupLabel>
            <DrawerClose class={drawerMenuItemClass}>
              <Pencil aria-hidden />
              Edit
            </DrawerClose>
            <DrawerClose class={drawerMenuItemClass}>
              <Copy aria-hidden />
              Duplicate
            </DrawerClose>
            <DrawerClose class={drawerMenuItemClass}>
              <Share aria-hidden />
              Share
            </DrawerClose>
          </DrawerMenuGroup>
          <DrawerMenuSeparator />
          <DrawerMenuCheckboxItem bind:checked={shuffle}>Shuffle</DrawerMenuCheckboxItem>
          <DrawerMenuCheckboxItem bind:checked={repeat}>Repeat</DrawerMenuCheckboxItem>
          <DrawerMenuCheckboxItem disabled>Enhanced Audio</DrawerMenuCheckboxItem>
          <DrawerMenuSeparator />
          <DrawerMenuGroup>
            <DrawerMenuGroupLabel>Sort by</DrawerMenuGroupLabel>
            <DrawerMenuRadioGroup bind:value={sortBy}>
              <DrawerMenuRadioItem value="artist">Artist</DrawerMenuRadioItem>
              <DrawerMenuRadioItem value="album">Album</DrawerMenuRadioItem>
              <DrawerMenuRadioItem value="title">Title</DrawerMenuRadioItem>
            </DrawerMenuRadioGroup>
          </DrawerMenuGroup>
          <DrawerMenuSeparator />
          <DrawerMenuCheckboxItem variant="switch" bind:checked={autoSave}>
            Auto save
          </DrawerMenuCheckboxItem>
          <DrawerMenuSeparator />
          <Drawer>
            <DrawerMenuTrigger>
              Add to Playlist
              <ChevronRight class="ms-auto -me-0.5 opacity-80" aria-hidden />
            </DrawerMenuTrigger>
            <DrawerPopup showBar>
              <DrawerPanel>
                <DrawerMenu>
                  <DrawerMenuGroup>
                    <DrawerMenuGroupLabel>Add to Playlist</DrawerMenuGroupLabel>
                  </DrawerMenuGroup>
                  <DrawerClose class={drawerMenuItemClass}>Jazz</DrawerClose>
                  <Drawer>
                    <DrawerMenuTrigger>
                      Rock
                      <ChevronRight class="ms-auto -me-0.5 opacity-80" aria-hidden />
                    </DrawerMenuTrigger>
                    <DrawerPopup showBar>
                      <DrawerPanel>
                        <DrawerMenu>
                          <DrawerMenuGroup>
                            <DrawerMenuGroupLabel>Rock</DrawerMenuGroupLabel>
                          </DrawerMenuGroup>
                          <DrawerClose class={drawerMenuItemClass}>Hard Rock</DrawerClose>
                          <DrawerClose class={drawerMenuItemClass}>Soft Rock</DrawerClose>
                          <DrawerClose class={drawerMenuItemClass}>Classic Rock</DrawerClose>
                          <DrawerMenuSeparator />
                          <DrawerClose class={drawerMenuItemClass}>Metal</DrawerClose>
                          <DrawerClose class={drawerMenuItemClass}>Punk</DrawerClose>
                          <DrawerClose class={drawerMenuItemClass}>Grunge</DrawerClose>
                          <DrawerClose class={drawerMenuItemClass}>Alternative</DrawerClose>
                          <DrawerClose class={drawerMenuItemClass}>Indie</DrawerClose>
                          <DrawerClose class={drawerMenuItemClass}>Electronic</DrawerClose>
                        </DrawerMenu>
                      </DrawerPanel>
                    </DrawerPopup>
                  </Drawer>
                  <DrawerClose class={drawerMenuItemClass}>Pop</DrawerClose>
                </DrawerMenu>
              </DrawerPanel>
            </DrawerPopup>
          </Drawer>
          <DrawerMenuSeparator />
          <DrawerMenuGroup>
            <DrawerMenuGroupLabel>Danger zone</DrawerMenuGroupLabel>
            <DrawerClose class={drawerMenuItemClass} data-variant="destructive">
              <Trash aria-hidden />
              Delete
            </DrawerClose>
          </DrawerMenuGroup>
        </DrawerMenu>
      </DrawerPanel>
    </DrawerPopup>
  </Drawer>
{:else}
  <Menu>
    <MenuTrigger
      aria-label="Open menu"
      class={buttonVariants({ size: 'icon', variant: 'outline' })}
    >
      <Ellipsis aria-hidden />
    </MenuTrigger>
    <MenuPopup>
      <MenuGroup>
        <MenuGroupLabel>Actions</MenuGroupLabel>
        <MenuItem>
          <Pencil aria-hidden />
          Edit
        </MenuItem>
        <MenuItem>
          <Copy aria-hidden />
          Duplicate
        </MenuItem>
        <MenuItem>
          <Share aria-hidden />
          Share
        </MenuItem>
      </MenuGroup>
      <MenuSeparator />
      <MenuCheckboxItem bind:checked={shuffle}>Shuffle</MenuCheckboxItem>
      <MenuCheckboxItem bind:checked={repeat}>Repeat</MenuCheckboxItem>
      <MenuCheckboxItem disabled>Enhanced Audio</MenuCheckboxItem>
      <MenuSeparator />
      <MenuGroup>
        <MenuGroupLabel>Sort by</MenuGroupLabel>
        <MenuRadioGroup bind:value={sortBy}>
          <MenuRadioItem value="artist">Artist</MenuRadioItem>
          <MenuRadioItem value="album">Album</MenuRadioItem>
          <MenuRadioItem value="title">Title</MenuRadioItem>
        </MenuRadioGroup>
      </MenuGroup>
      <MenuSeparator />
      <MenuCheckboxItem variant="switch" bind:checked={autoSave}>Auto save</MenuCheckboxItem>
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
      <MenuGroup>
        <MenuGroupLabel>Danger zone</MenuGroupLabel>
        <MenuItem variant="destructive">
          <Trash aria-hidden />
          Delete
        </MenuItem>
      </MenuGroup>
    </MenuPopup>
  </Menu>
{/if}
