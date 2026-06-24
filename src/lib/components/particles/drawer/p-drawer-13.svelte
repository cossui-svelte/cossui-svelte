<script lang="ts">
  import Copy from "@lucide/svelte/icons/copy";
  import Ellipsis from "@lucide/svelte/icons/ellipsis";
  import Pencil from "@lucide/svelte/icons/pencil";
  import Share from "@lucide/svelte/icons/share";
  import Trash from "@lucide/svelte/icons/trash";
  import ChevronRight from "@lucide/svelte/icons/chevron-right";
  import { buttonVariants } from "$lib/components/ui/button";
  import {
    Drawer,
    DrawerClose,
    DrawerNestedRoot,
    DrawerPanel,
    DrawerPopup,
    DrawerTrigger,
  } from "$lib/components/ui/drawer";
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
    MenuTrigger,
  } from "$lib/components/ui/menu";

  let isMobile = $state(false);

  $effect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    isMobile = mq.matches;
    const handler = (e: MediaQueryListEvent) => { isMobile = e.matches; };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  });

  let shuffle = $state(false);
  let repeat = $state(false);
  let autoSave = $state(false);
  let sortBy = $state("artist");

  const itemCls = "flex min-h-9 w-full cursor-default select-none items-center gap-2 rounded-sm px-2 py-1 text-base text-foreground outline-none hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-64 sm:min-h-8 sm:text-sm [&>svg:not([class*='opacity-'])]:opacity-80 [&>svg:not([class*='size-'])]:size-4.5 sm:[&>svg:not([class*='size-'])]:size-4 [&>svg]:pointer-events-none [&>svg]:-mx-0.5 [&>svg]:shrink-0";
  const destructiveItemCls = `${itemCls} text-destructive-foreground`;
  const triggerCls = "flex min-h-9 w-full cursor-default select-none items-center gap-2 rounded-sm px-2 py-1 text-base text-foreground outline-none hover:bg-accent hover:text-accent-foreground sm:min-h-8 sm:text-sm [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0";
</script>

{#if isMobile}
  <Drawer>
    <DrawerTrigger
      aria-label="Open menu"
      class={buttonVariants({ variant: "outline", size: "icon" })}
    >
      <Ellipsis aria-hidden />
    </DrawerTrigger>
    <DrawerPopup showBar>
      <DrawerPanel>
        <nav class="-m-2 flex flex-col">
          <div class="flex flex-col">
            <div class="px-2 py-1.5 font-medium text-muted-foreground text-xs">Actions</div>
            <DrawerClose class={itemCls}>
              <Pencil aria-hidden />
              Edit
            </DrawerClose>
            <DrawerClose class={itemCls}>
              <Copy aria-hidden />
              Duplicate
            </DrawerClose>
            <DrawerClose class={itemCls}>
              <Share aria-hidden />
              Share
            </DrawerClose>
          </div>

          <hr class="mx-2 my-1 h-px bg-border border-0" />

          <button type="button" class={itemCls} onclick={() => { shuffle = !shuffle; }}>
            <span class="size-3.5 flex items-center justify-center">
              {#if shuffle}<svg viewBox="0 0 12 12" fill="currentColor" class="size-3" aria-hidden><path d="M10.707 3.293a1 1 0 010 1.414l-6 6A1 1 0 013.293 9.293l6-6a1 1 0 011.414 0z"/><path d="M10.707 8.707a1 1 0 01-1.414 0l-6-6A1 1 0 014.707 1.293l6 6a1 1 0 010 1.414z"/></svg>{/if}
            </span>
            Shuffle
          </button>
          <button type="button" class={itemCls} onclick={() => { repeat = !repeat; }}>
            <span class="size-3.5 flex items-center justify-center">
              {#if repeat}<svg viewBox="0 0 12 12" fill="currentColor" class="size-3" aria-hidden><path d="M10.707 3.293a1 1 0 010 1.414l-6 6A1 1 0 013.293 9.293l6-6a1 1 0 011.414 0z"/><path d="M10.707 8.707a1 1 0 01-1.414 0l-6-6A1 1 0 014.707 1.293l6 6a1 1 0 010 1.414z"/></svg>{/if}
            </span>
            Repeat
          </button>
          <button type="button" class={itemCls} disabled>
            <span class="size-3.5"></span>
            Enhanced Audio
          </button>

          <hr class="mx-2 my-1 h-px bg-border border-0" />

          <div class="flex flex-col">
            <div class="px-2 py-1.5 font-medium text-muted-foreground text-xs">Sort by</div>
            {#each [["artist", "Artist"], ["album", "Album"], ["title", "Title"]] as [value, label] (value)}
              <button type="button" class={itemCls} onclick={() => { sortBy = value; }}>
                <span class="size-3.5 flex items-center justify-center">
                  {#if sortBy === value}<svg viewBox="0 0 8 8" fill="currentColor" class="size-2" aria-hidden><circle cx="4" cy="4" r="4"/></svg>{/if}
                </span>
                {label}
              </button>
            {/each}
          </div>

          <hr class="mx-2 my-1 h-px bg-border border-0" />

          <button type="button" class="flex min-h-9 w-full cursor-default select-none items-center justify-between gap-4 rounded-sm px-2 py-1 text-base text-foreground outline-none hover:bg-accent hover:text-accent-foreground sm:min-h-8 sm:text-sm" onclick={() => { autoSave = !autoSave; }}>
            Auto save
            <span class="relative ms-auto inline-flex h-[1.125rem] w-8 shrink-0 items-center rounded-full transition-colors {autoSave ? 'bg-primary' : 'bg-input'}">
              <span class="pointer-events-none block size-3.5 rounded-full bg-background shadow-sm transition-transform {autoSave ? 'translate-x-[calc(100%-1px)]' : 'translate-x-0.5'}"></span>
            </span>
          </button>

          <hr class="mx-2 my-1 h-px bg-border border-0" />

          <DrawerNestedRoot>
            <DrawerTrigger class={triggerCls}>
              Add to Playlist
              <ChevronRight class="ms-auto -me-0.5 opacity-80" aria-hidden />
            </DrawerTrigger>
            <DrawerPopup showBar>
              <DrawerPanel>
                <nav class="-m-2 flex flex-col">
                  <div class="flex flex-col">
                    <div class="px-2 py-1.5 font-medium text-muted-foreground text-xs">Add to Playlist</div>
                  </div>
                  <DrawerClose class={itemCls}>Jazz</DrawerClose>
                  <DrawerNestedRoot>
                    <DrawerTrigger class={triggerCls}>
                      Rock
                      <ChevronRight class="ms-auto -me-0.5 opacity-80" aria-hidden />
                    </DrawerTrigger>
                    <DrawerPopup showBar>
                      <DrawerPanel>
                        <nav class="-m-2 flex flex-col">
                          <div class="flex flex-col">
                            <div class="px-2 py-1.5 font-medium text-muted-foreground text-xs">Rock</div>
                          </div>
                          <DrawerClose class={itemCls}>Hard Rock</DrawerClose>
                          <DrawerClose class={itemCls}>Soft Rock</DrawerClose>
                          <DrawerClose class={itemCls}>Classic Rock</DrawerClose>
                          <hr class="mx-2 my-1 h-px bg-border border-0" />
                          <DrawerClose class={itemCls}>Metal</DrawerClose>
                          <DrawerClose class={itemCls}>Punk</DrawerClose>
                          <DrawerClose class={itemCls}>Grunge</DrawerClose>
                          <DrawerClose class={itemCls}>Alternative</DrawerClose>
                          <DrawerClose class={itemCls}>Indie</DrawerClose>
                          <DrawerClose class={itemCls}>Electronic</DrawerClose>
                        </nav>
                      </DrawerPanel>
                    </DrawerPopup>
                  </DrawerNestedRoot>
                  <DrawerClose class={itemCls}>Pop</DrawerClose>
                </nav>
              </DrawerPanel>
            </DrawerPopup>
          </DrawerNestedRoot>

          <hr class="mx-2 my-1 h-px bg-border border-0" />

          <div class="flex flex-col">
            <div class="px-2 py-1.5 font-medium text-muted-foreground text-xs">Danger zone</div>
            <DrawerClose class={destructiveItemCls}>
              <Trash aria-hidden />
              Delete
            </DrawerClose>
          </div>
        </nav>
      </DrawerPanel>
    </DrawerPopup>
  </Drawer>
{:else}
  <Menu>
    <MenuTrigger
      aria-label="Open menu"
      class={buttonVariants({ variant: "outline", size: "icon" })}
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
