<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Separator } from "$lib/components/ui/separator";
  import CommandMenu from "./command-menu.svelte";
  import MainNav from "./main-nav.svelte";
  import SiteHeaderBase from "./site-header.svelte";

  interface PageNode {
    name: string | unknown;
    type: "page";
    url: string;
  }

  interface FolderNode {
    $id?: string;
    children: (PageNode | FolderNode)[];
    name: string | unknown;
    type: "folder";
  }

  interface NavTree {
    children: (PageNode | FolderNode)[];
  }

  interface ProductItem {
    href: string;
    label: string;
    upcoming?: boolean;
  }

  interface Props {
    currentProduct?: string;
    navItems?: { href: string; label: string }[];
    products?: ProductItem[];
    tree?: NavTree;
  }

  let {
    navItems = [],
    tree,
    currentProduct = "ui",
    products = [],
  }: Props = $props();
</script>

<SiteHeaderBase {currentProduct} {products}>
  {#snippet mobileNav()}
    <!--  BUG TODO: If you activate this line, the page is unresponsive
  <MobileNav class="flex lg:hidden" items={navItems} {tree} /> -->
  {/snippet}

  <div class="flex gap-2">
    <Button variant="ghost">
      <a href="/docs">Docs</a>
    </Button>
    <Button variant="ghost">
      <a href="/particles">Particles</a>
    </Button>
  </div>

  <MainNav class="hidden lg:flex" items={navItems} />

  <div class="mx-2 hidden w-full flex-1 md:flex md:w-auto md:flex-none">
    <CommandMenu {navItems} {tree} />
  </div>

  <Separator class="h-5 max-md:hidden" orientation="vertical" />
</SiteHeaderBase>
