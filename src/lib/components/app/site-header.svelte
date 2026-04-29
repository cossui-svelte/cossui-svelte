<script lang="ts">
  import SiteHeaderBase from "../shared-components/site-header.svelte";
  import { Separator } from "$lib/components/ui/separator";
  import CommandMenu from "./command-menu.svelte";
  import MainNav from "./main-nav.svelte";
  import MobileNav from "./mobile-nav.svelte";

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

  interface ProductItem {
    href: string;
    label: string;
    upcoming?: boolean;
  }

  interface Props {
    navItems?: { href: string; label: string }[];
    tree?: NavTree;
    currentProduct?: string;
    products?: ProductItem[];
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
    <MobileNav class="flex lg:hidden" items={navItems} {tree} />
  {/snippet}

  <MainNav class="hidden lg:flex" items={navItems} />

  <div class="mx-2 hidden w-full flex-1 md:flex md:w-auto md:flex-none">
    <CommandMenu {navItems} {tree} />
  </div>

  <Separator class="h-5 max-md:hidden" orientation="vertical" />
</SiteHeaderBase>
