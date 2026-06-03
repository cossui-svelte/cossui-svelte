<script module lang="ts">
  interface PageNode {
    type: "page";
    $id?: string;
    name: string | unknown;
    url: string;
  }

  interface FolderNode {
    type: "folder";
    $id?: string;
    name: string | unknown;
    children: (PageNode | FolderNode)[];
  }

  export interface NavTree {
    children: (PageNode | FolderNode)[];
  }
</script>

<script lang="ts">
  import { cn } from "$lib/utils";
  import { page } from "$app/state";
  import { Badge } from "$lib/components/ui/badge";

  interface Props {
    tree: NavTree;
    pagesNew?: string[];
    class?: string;
  }

  let { tree, pagesNew = [], class: className }: Props = $props();
</script>

<aside
  class={cn(
    "sticky top-(--header-height) z-30 hidden h-[calc(100svh-var(--header-height))] overflow-y-auto bg-transparent lg:flex lg:flex-col",
    className,
  )}
>
  <div class="px-4 py-2">
    <div class="h-(--top-spacing) shrink-0"></div>
    {#each tree.children as group (group.$id ?? String(group.name))}
      {#if group.type === "folder"}
        <div class="mb-4 flex flex-col gap-1">
          <div
            class="flex h-7 items-center px-0 text-sm font-medium text-sidebar-accent-foreground"
          >
            {group.name}
          </div>
          <ul class="flex flex-col gap-0.5">
            {#each group.children as item}
              {#if item.type === "page"}
                <li>
                  <a
                    href={item.url}
                    class={cn(
                      "flex items-center gap-2 rounded-md ps-3.5 py-1.5 text-sm transition-colors",
                      item.url === page.url.pathname
                        ? "font-medium text-foreground"
                        : "text-muted-foreground hover:bg-transparent hover:text-foreground",
                    )}
                  >
                    {item.name}
                    {#if pagesNew.length > 0 && pagesNew.includes(item.url)}
                      <Badge variant="info">New</Badge>
                    {/if}
                  </a>
                </li>
              {/if}
            {/each}
          </ul>
        </div>
      {/if}
    {/each}
  </div>
</aside>
