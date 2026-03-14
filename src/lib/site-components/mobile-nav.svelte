<script lang="ts">
  import { cn } from "../utils.js";
  import { Dialog } from "bits-ui";
  import { Menu } from "lucide-svelte";
  import Button from "../cossui-components/button.svelte";
  import Badge from "../cossui-components/badge.svelte";
  import Sheet from "../cossui-components/sheet.svelte";
  import SheetPopup from "../cossui-components/sheet-popup.svelte";

  interface PageNode {
    type: "page";
    name: string | unknown;
    url: string;
  }

  interface FolderNode {
    type: "folder";
    $id?: string;
    name: string | unknown;
    children: (PageNode | FolderNode)[];
  }

  interface NavTree {
    children: (PageNode | FolderNode)[];
  }

  interface Props {
    tree?: NavTree;
    items: { href: string; label: string }[];
    pagesNew?: string[];
    class?: string;
  }

  let { tree, items, pagesNew = [], class: className }: Props = $props();

  let open = $state(false);

  function closeNav() {
    open = false;
  }
</script>

<Sheet {open} onOpenChange={(v) => (open = v)}>
  <Dialog.Trigger>
    {#snippet child({ props })}
      <Button
        {...props}
        class={cn("-ms-1.5 relative size-8", className)}
        size="icon"
        variant="ghost"
      >
        <Menu class="size-5" strokeWidth={2} />
        <span class="sr-only">Toggle Menu</span>
      </Button>
    {/snippet}
  </Dialog.Trigger>
  <SheetPopup side="left">
    <div class="flex flex-col gap-12 overflow-auto p-6 pt-8">
      <div class="flex flex-col gap-3">
        <div class="font-medium text-sm">Menu</div>
        <div class="flex flex-col gap-1">
          <a class="flex items-center gap-2 py-1.5 text-muted-foreground" href="/" onclick={closeNav}>
            Home
          </a>
          {#each items as item (item.label)}
            <a
              class="flex items-center gap-2 py-1.5 text-muted-foreground"
              href={item.href}
              onclick={closeNav}
            >
              {item.label}
            </a>
          {/each}
        </div>
      </div>
      {#if tree}
        <div class="flex flex-col gap-8">
          {#each tree.children as group ((group as FolderNode).$id ?? String(group.name))}
            {#if group.type === "folder"}
              <div class="flex flex-col gap-3">
                <div class="font-medium text-sm">{group.name}</div>
                <div class="flex flex-col gap-0.5">
                  {#each group.children as item}
                    {#if item.type === "page"}
                      <a
                        class="flex items-center gap-2 py-1.5 text-muted-foreground"
                        href={item.url}
                        onclick={closeNav}
                      >
                        {item.name}
                        {#if pagesNew.length > 0 && pagesNew.includes(item.url)}
                          <Badge variant="info">New</Badge>
                        {/if}
                      </a>
                    {/if}
                  {/each}
                </div>
              </div>
            {/if}
          {/each}
        </div>
      {/if}
    </div>
  </SheetPopup>
</Sheet>
