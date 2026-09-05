<script lang="ts">
  import Menu from '@lucide/svelte/icons/menu';
  import { Badge } from '$lib/components/ui/badge';
  import { buttonVariants } from '$lib/components/ui/button';
  import { Drawer, DrawerPanel, DrawerPopup, DrawerTrigger } from '$lib/components/ui/drawer';
  import type { FolderNode, NavTree } from '$lib/docs';
  import { cn } from '$lib/utils';
  import { resolve } from '$app/paths';

  interface Props {
    class?: string;
    items: { href: string; label: string }[];
    pagesNew?: string[];
    tree?: NavTree;
  }

  let { tree, items, pagesNew = [], class: className }: Props = $props();

  let open = $state(false);

  function closeNav() {
    open = false;
  }
</script>

<Drawer bind:open position="left">
  <DrawerTrigger
    class={cn(
      buttonVariants({ size: "icon", variant: "ghost" }),
      "-ms-1.5 relative size-8",
      className,
    )}
  >
    <Menu class="size-5" strokeWidth={2} />
    <span class="sr-only">Toggle Menu</span>
  </DrawerTrigger>
  <DrawerPopup showCloseButton variant="straight">
    <DrawerPanel class="flex flex-col gap-12 p-6 pt-8" scrollFade={false}>
      <div class="flex flex-col gap-3">
        <div class="font-medium text-sm">Menu</div>
        <div class="flex flex-col gap-1">
          <a
            class="flex items-center gap-2 py-1.5 text-muted-foreground"
            href={resolve("/")}
            onclick={closeNav}
          >
            Home
          </a>
          {#each items as item (item.label)}
            <!-- eslint-disable svelte/no-navigation-without-resolve -- item.href is caller-supplied nav data, already app-relative -->
            <a
              class="flex items-center gap-2 py-1.5 text-muted-foreground"
              href={item.href}
              onclick={closeNav}
            >
              {item.label}
            </a>
          <!-- eslint-enable svelte/no-navigation-without-resolve -->
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
                  {#each group.children as item (item.type === "page" ? item.url : String(item.name))}
                    {#if item.type === "page"}
                      <!-- eslint-disable svelte/no-navigation-without-resolve -- item.url is caller-supplied nav data, already app-relative -->
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
                    <!-- eslint-enable svelte/no-navigation-without-resolve -->
                    {/if}
                  {/each}
                </div>
              </div>
            {/if}
          {/each}
        </div>
      {/if}
    </DrawerPanel>
  </DrawerPopup>
</Drawer>
