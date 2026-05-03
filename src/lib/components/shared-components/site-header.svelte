<script lang="ts">
  import type { Snippet } from "svelte";
  import GithubLink from "./github-link.svelte";
  import ModeSwitcher from "./mode-switcher.svelte";
  import ProductLabel from "./product-label.svelte";
  import ProductsDropdown from "./products-dropdown.svelte";

  interface ProductItem {
    href: string;
    label: string;
  }

  interface Props {
    products: ProductItem[];
    mobileNav?: Snippet;
    children?: Snippet;
    currentProduct?: string;
  }

  let { products, mobileNav, children, currentProduct }: Props = $props();

  const gatewayOrigin: string = import.meta.env.VITE_COSS_URL ?? "";
  const gatewayHome = gatewayOrigin ? `${gatewayOrigin}/` : "/";
  const isExternal = !!gatewayOrigin;
</script>

<header
  class="sticky top-0 z-40 w-full bg-sidebar/80 backdrop-blur-sm before:absolute before:inset-x-0 before:bottom-0 before:h-px before:bg-border/64"
>
  <div
    class="container relative flex h-(--header-height) w-full items-center justify-between gap-2 px-4 sm:px-6"
  >
    {@render mobileNav?.()}
    <div
      class="-mt-0.5 flex shrink-0 items-center gap-1.5 font-heading text-2xl sm:text-[1.625em]"
    >
      {#if isExternal}
        <a aria-label="Home" href={gatewayHome}>coss.ui</a>
      {:else}
        <a aria-label="Home" href={gatewayHome}>coss.ui</a>
      {/if}
      <ProductLabel {currentProduct} items={products} />
    </div>
    <div class="ms-auto flex items-center gap-2 md:flex-1 md:justify-end">
      {@render children?.()}
      <ProductsDropdown items={products} />
      <GithubLink />
      <ModeSwitcher />
    </div>
  </div>
</header>
