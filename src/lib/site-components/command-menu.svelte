<script lang="ts">
  import { cn } from "$lib/utils.js";
  import { Dialog } from "bits-ui";
  import { Search, CornerDownLeft, Atom, BookOpen } from "lucide-svelte";
  import { buttonVariants } from "../button-variants.js";
  import Kbd from "../cossui-components/kbd.svelte";
  import KbdGroup from "../cossui-components/kbd/kbd-group.svelte";

  interface PageItem {
    value: string;
    label: string;
    url: string;
    isComponent: boolean;
    keywords?: string[];
  }

  interface PageGroup {
    value: string;
    items: PageItem[];
  }

  interface PageNode {
    type: "page";
    name: string | unknown;
    url: string;
  }

  interface FolderNode {
    type: "folder";
    name: string | unknown;
    children: (PageNode | FolderNode)[];
  }

  interface NavTree {
    children: (PageNode | FolderNode)[];
  }

  interface Props {
    tree?: NavTree;
    navItems?: { href: string; label: string }[];
    packageManager?: "pnpm" | "npm" | "yarn" | "bun";
  }

  let { tree, navItems, packageManager = "pnpm" }: Props = $props();

  let open = $state(false);
  let query = $state("");
  let selectedType = $state<"page" | "component" | null>(null);
  let copyPayload = $state("");

  // Detect macOS
  let isMac = $state(false);
  $effect(() => {
    if (typeof navigator !== "undefined") {
      isMac = /Mac|iPhone|iPad/.test(navigator.platform);
    }
  });

  // Build grouped items from tree
  const groupedItems = $derived<PageGroup[]>(
    (() => {
      const groups: PageGroup[] = [];

      if (navItems && navItems.length > 0) {
        groups.push({
          items: navItems.map((item) => ({
            isComponent: false,
            keywords: ["nav", "navigation", item.label.toLowerCase()],
            label: item.label,
            url: item.href,
            value: `Navigation ${item.label}`,
          })),
          value: "Pages",
        });
      }

      if (tree) {
        tree.children.forEach((group) => {
          if (group.type === "folder") {
            const items: PageItem[] = [];
            group.children.forEach((item) => {
              if (item.type === "page") {
                const isComponent = item.url.includes("/components/");
                const itemName = String(item.name ?? "");
                items.push({
                  isComponent,
                  keywords: isComponent ? ["component"] : undefined,
                  label: itemName,
                  url: item.url,
                  value: itemName ? `${String(group.name)} ${itemName}` : "",
                });
              }
            });
            if (items.length > 0) {
              groups.push({ items, value: String(group.name) });
            }
          }
        });
      }

      return groups;
    })(),
  );

  // Filter items based on search query
  const filteredGroups = $derived<PageGroup[]>(
    (() => {
      if (!query.trim()) return groupedItems;
      const q = query.toLowerCase();
      return groupedItems
        .map((group) => ({
          ...group,
          items: group.items.filter(
            (item) =>
              item.label.toLowerCase().includes(q) ||
              item.keywords?.some((k) => k.includes(q)),
          ),
        }))
        .filter((group) => group.items.length > 0);
    })(),
  );

  function handleItemHighlight(item: PageItem) {
    if (item.isComponent) {
      const componentName = item.url.split("/").pop();
      selectedType = "component";
      const registryItem = `@coss/${componentName}`;
      let cmd: string;
      switch (packageManager) {
        case "pnpm":
          cmd = `pnpm dlx shadcn@latest add ${registryItem}`;
          break;
        case "bun":
          cmd = `bunx --bun shadcn@latest add ${registryItem}`;
          break;
        case "yarn":
          cmd = `yarn dlx shadcn@latest add ${registryItem}`;
          break;
        default:
          cmd = `npx shadcn@latest add ${registryItem}`;
      }
      copyPayload = cmd;
    } else {
      selectedType = "page";
      copyPayload = "";
    }
  }

  async function copyPayloadToClipboard() {
    if (copyPayload) {
      try {
        await navigator.clipboard.writeText(copyPayload);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
  }

  $effect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }
        e.preventDefault();
        open = !open;
      }

      if (e.key === "c" && (e.metaKey || e.ctrlKey) && open) {
        if (selectedType === "page" || selectedType === "component") {
          copyPayloadToClipboard();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  });
</script>

<!-- Trigger button -->
<Dialog.Root bind:open>
  <Dialog.Trigger>
    {#snippet child({ props })}
      <button
        {...props}
        class={cn(
          buttonVariants({ variant: "outline" }),
          "gap-2 text-muted-foreground",
        )}
        type="button"
      >
        <Search class="size-4" strokeWidth={2} />
        <span class="hidden sm:inline">Search documentation…</span>
        <KbdGroup class="gap-1">
          <Kbd>{isMac ? "⌘" : "Ctrl"}</Kbd>
          <Kbd class="aspect-square">K</Kbd>
        </KbdGroup>
      </button>
    {/snippet}
  </Dialog.Trigger>

  <Dialog.Portal>
    <Dialog.Overlay
      class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
    />
    <Dialog.Content
      class="fixed top-[10%] left-1/2 z-50 w-full max-w-lg -translate-x-1/2 overflow-hidden rounded-2xl border bg-popover shadow-xl data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
    >
      <!-- Search input -->
      <div class="flex items-center gap-2 border-b px-4 py-3">
        <Search class="size-4 shrink-0 text-muted-foreground" strokeWidth={2} />
        <input
          autofocus
          bind:value={query}
          class="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          placeholder="Search documentation…"
          type="text"
        />
      </div>

      <!-- Results -->
      <div class="max-h-[60vh] overflow-y-auto p-2">
        {#if filteredGroups.length === 0}
          <div class="px-4 py-8 text-center text-muted-foreground text-sm">
            No results found.
          </div>
        {:else}
          {#each filteredGroups as group (group.value)}
            <div class="mb-2">
              <div
                class="px-2 py-1.5 text-muted-foreground text-xs font-medium"
              >
                {group.value}
              </div>
              {#each group.items as item (item.value)}
                <a
                  class="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm transition-colors hover:bg-accent focus:bg-accent focus:outline-none"
                  href={item.url}
                  onclick={() => {
                    open = false;
                  }}
                  onmouseenter={() => handleItemHighlight(item)}
                  onfocus={() => handleItemHighlight(item)}
                >
                  {#if item.isComponent}
                    <Atom class="size-4 opacity-80" strokeWidth={2} />
                  {:else}
                    <BookOpen class="size-4 opacity-80" strokeWidth={2} />
                  {/if}
                  <span class="flex-1">{item.label}</span>
                </a>
              {/each}
            </div>
          {/each}
        {/if}
      </div>

      <!-- Footer -->
      <div
        class="flex items-center justify-between border-t px-4 py-2 text-muted-foreground text-xs"
      >
        <div class="flex items-center gap-2">
          <span class="whitespace-nowrap">Go to Page</span>
          <Kbd>
            <CornerDownLeft class="size-3" strokeWidth={2} />
          </Kbd>
        </div>
        {#if copyPayload}
          <div class="flex min-w-0 items-center gap-2">
            <span class="truncate font-mono">{copyPayload}</span>
            <KbdGroup>
              <Kbd>{isMac ? "⌘" : "Ctrl"}</Kbd>
              <Kbd>C</Kbd>
            </KbdGroup>
          </div>
        {/if}
      </div>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
