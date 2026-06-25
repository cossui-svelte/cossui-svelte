<script lang="ts">
  import ArrowDown from "@lucide/svelte/icons/arrow-down";
  import ArrowUp from "@lucide/svelte/icons/arrow-up";
  import CornerDownLeft from "@lucide/svelte/icons/corner-down-left";
  import { buttonVariants } from "$lib/components/ui/button";
  import {
    Command,
    CommandCollection,
    CommandDialog,
    CommandDialogPopup,
    CommandDialogTrigger,
    CommandEmpty,
    CommandFooter,
    CommandGroup,
    CommandGroupLabel,
    CommandInput,
    CommandItem,
    CommandList,
    CommandPanel,
    CommandSeparator,
    CommandShortcut,
  } from "$lib/components/ui/command";
  import { Kbd, KbdGroup } from "$lib/components/ui/kbd";

  interface Item {
    label: string;
    shortcut?: string;
    value: string;
  }

  interface Group {
    items: Item[];
    value: string;
  }

  const suggestions: Item[] = [
    { label: "Linear", shortcut: "⌘L", value: "linear" },
    { label: "Figma", shortcut: "⌘F", value: "figma" },
    { label: "Slack", shortcut: "⌘S", value: "slack" },
    { label: "YouTube", shortcut: "⌘Y", value: "youtube" },
    { label: "Raycast", shortcut: "⌘R", value: "raycast" },
  ];

  const commands: Item[] = [
    { label: "Clipboard History", shortcut: "⌘⇧C", value: "clipboard-history" },
    { label: "Import Extension", shortcut: "⌘I", value: "import-extension" },
    { label: "Create Snippet", shortcut: "⌘N", value: "create-snippet" },
    { label: "System Preferences", shortcut: "⌘,", value: "system-preferences" },
    { label: "Window Management", shortcut: "⌘⇧W", value: "window-management" },
  ];

  const groupedItems: Group[] = [
    { items: suggestions, value: "Suggestions" },
    { items: commands, value: "Commands" },
  ];

  let open = $state(false);

  $effect(() => {
    function down(e: KeyboardEvent) {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        open = !open;
      }
    }
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  });
</script>

<CommandDialog bind:open>
  <CommandDialogTrigger class={buttonVariants({ variant: "outline" })}>
    Open Command Palette
    <KbdGroup>
      <Kbd>⌘</Kbd>
      <Kbd>J</Kbd>
    </KbdGroup>
  </CommandDialogTrigger>
  <CommandDialogPopup>
    <Command>
      <CommandInput placeholder="Search for apps and commands..." />
      <CommandPanel>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandList>
          {#each groupedItems as group (group.value)}
            <CommandGroup>
              <CommandGroupLabel>{group.value}</CommandGroupLabel>
              <CommandCollection>
                {#each group.items as item (item.value)}
                  <CommandItem value={item.value} onSelect={() => { open = false; }}>
                    <span class="flex-1">{item.label}</span>
                    {#if item.shortcut}
                      <CommandShortcut>{item.shortcut}</CommandShortcut>
                    {/if}
                  </CommandItem>
                {/each}
              </CommandCollection>
            </CommandGroup>
            <CommandSeparator />
          {/each}
        </CommandList>
      </CommandPanel>
      <CommandFooter>
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2">
            <KbdGroup>
              <Kbd><ArrowUp /></Kbd>
              <Kbd><ArrowDown /></Kbd>
            </KbdGroup>
            <span>Navigate</span>
          </div>
          <div class="flex items-center gap-2">
            <Kbd><CornerDownLeft /></Kbd>
            <span>Open</span>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <Kbd>Esc</Kbd>
          <span>Close</span>
        </div>
      </CommandFooter>
    </Command>
  </CommandDialogPopup>
</CommandDialog>
