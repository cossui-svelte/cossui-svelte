<script lang="ts">
  import ArrowUpRightIcon from '@lucide/svelte/icons/arrow-up-right';
  import CircleFadingPlusIcon from '@lucide/svelte/icons/circle-fading-plus';
  import FileInputIcon from '@lucide/svelte/icons/file-input';
  import FolderPlusIcon from '@lucide/svelte/icons/folder-plus';
  import SearchIcon from '@lucide/svelte/icons/search';
  import {
    Command,
    CommandCollection,
    CommandDialog,
    CommandDialogPopup,
    CommandDialogTrigger,
    CommandEmpty,
    CommandGroup,
    CommandGroupLabel,
    CommandInput,
    CommandItem,
    CommandList,
    CommandPanel,
    CommandSeparator,
    CommandShortcut
  } from '$lib/components/ui/command';
  import { Kbd } from '$lib/components/ui/kbd';

  let open = $state(false);

  $effect(() => {
    function down(e: KeyboardEvent) {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        open = !open;
      }
    }
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  });
</script>

<CommandDialogTrigger
  class="inline-flex h-9 w-fit rounded-md border border-input bg-background px-3 py-2 text-foreground text-sm shadow-xs outline-none transition-[color,box-shadow] placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
  onclick={() => {
    open = true;
  }}
>
  <span class="flex grow items-center">
    <SearchIcon aria-hidden="true" class="-ms-1 me-3 text-muted-foreground/80" size={16} />
    <span class="font-normal text-muted-foreground/70">Search</span>
  </span>
  <Kbd class="ms-12">⌘K</Kbd>
</CommandDialogTrigger>

<CommandDialog bind:open>
  <CommandDialogPopup>
    <Command>
      <CommandInput placeholder="Type a command or search..." />
      <CommandPanel>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandList>
          <CommandGroup>
            <CommandGroupLabel>Quick start</CommandGroupLabel>
            <CommandCollection>
              <CommandItem>
                <FolderPlusIcon aria-hidden="true" class="opacity-60" size={16} />
                <span>New folder</span>
                <CommandShortcut class="justify-center">⌘N</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <FileInputIcon aria-hidden="true" class="opacity-60" size={16} />
                <span>Import document</span>
                <CommandShortcut class="justify-center">⌘I</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <CircleFadingPlusIcon aria-hidden="true" class="opacity-60" size={16} />
                <span>Add block</span>
                <CommandShortcut class="justify-center">⌘B</CommandShortcut>
              </CommandItem>
            </CommandCollection>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup>
            <CommandGroupLabel>Navigation</CommandGroupLabel>
            <CommandCollection>
              <CommandItem>
                <ArrowUpRightIcon aria-hidden="true" class="opacity-60" size={16} />
                <span>Go to dashboard</span>
              </CommandItem>
              <CommandItem>
                <ArrowUpRightIcon aria-hidden="true" class="opacity-60" size={16} />
                <span>Go to apps</span>
              </CommandItem>
              <CommandItem>
                <ArrowUpRightIcon aria-hidden="true" class="opacity-60" size={16} />
                <span>Go to connections</span>
              </CommandItem>
            </CommandCollection>
          </CommandGroup>
        </CommandList>
      </CommandPanel>
    </Command>
  </CommandDialogPopup>
</CommandDialog>
