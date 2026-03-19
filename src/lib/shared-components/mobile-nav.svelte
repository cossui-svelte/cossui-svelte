<script module lang="ts">
  export type PageNode = {
    type: "page";
    name: string;
    url: string;
  };

  export type FolderNode = {
    type: "folder";
    name: string;
    children: (PageNode | FolderNode)[];
  };

  export type NavTree = {
    children: FolderNode[];
  };
</script>

<script lang="ts">
  import { Dialog } from "bits-ui";
  import { Menu } from "lucide-svelte";
  import { cn } from "$lib/utils.js";
  import Button from "$lib/components/ui/button.svelte";
  import Sheet from "$lib/components/ui/sheet/sheet.svelte";
  import SheetPopup from "$lib/components/ui/sheet/sheet-popup.svelte";

  interface Props {
    tree?: NavTree;
    items: { href: string; label: string }[];
    class?: string;
  }

  let { tree, items, class: className }: Props = $props();

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
        <div class="flex flex-col gap-2">
          <a class="text-muted-foreground" href="/" onclick={closeNav}>Home</a>
          {#each items as item (item.label)}
            <a
              class="text-muted-foreground"
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
          {#each tree.children as group (group.name)}
            {#if group.type === "folder"}
              <div class="flex flex-col gap-3">
                <div class="font-medium text-sm">{group.name}</div>
                <div class="flex flex-col gap-2">
                  {#each group.children as item}
                    {#if item.type === "page"}
                      <a
                        class="text-muted-foreground"
                        href={item.url}
                        onclick={closeNav}
                      >
                        {item.name}
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
