<script lang="ts">
  import ChevronDown from "@lucide/svelte/icons/chevron-down";
  import { Badge } from "$lib/components/ui/badge";
  import { buttonVariants } from "$lib/components/ui/button";
  import { Menu, MenuLinkItem, MenuPopup, MenuTrigger } from "$lib/components/ui/menu";

  interface ProductItem {
    href: string;
    label: string;
    upcoming?: boolean;
  }

  interface Props {
    items: ProductItem[];
  }

  let { items }: Props = $props();

  const gatewayOrigin: string = import.meta.env.VITE_COSS_URL ?? "";
  const uiGatewayOrigin: string = import.meta.env.VITE_COSS_UI_URL ?? "";

  function getLinkHref(item: ProductItem): {
    href: string;
    isExternal: boolean;
  } {
    const isHomePage = item.href === "/";
    if (gatewayOrigin && !isHomePage) {
      return { href: `${gatewayOrigin}${item.href}`, isExternal: true };
    }
    if (uiGatewayOrigin && isHomePage) {
      return { href: uiGatewayOrigin, isExternal: true };
    }
    return { href: item.href, isExternal: false };
  }

</script>

<Menu>
  <MenuTrigger class={buttonVariants({ variant: "ghost" })}>
    Products
    <ChevronDown class="size-4" />
  </MenuTrigger>
  <MenuPopup align="center" sideOffset={4}>
    {#each items as item (item.href)}
      {@const { href, isExternal } = getLinkHref(item)}
      <MenuLinkItem
        {href}
        target={isExternal ? "_self" : undefined}
        class="group justify-between"
      >
        <span class="font-heading in-data-highlighted:text-foreground text-muted-foreground">
          {item.label}
        </span>
        {#if item.upcoming}
          <Badge
            class="-me-0.5 font-medium opacity-0 group-hover:opacity-100"
            size="sm"
            variant="info"
          >
            Upcoming
          </Badge>
        {/if}
      </MenuLinkItem>
    {/each}
  </MenuPopup>
</Menu>
