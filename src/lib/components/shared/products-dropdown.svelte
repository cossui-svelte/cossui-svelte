<script lang="ts">
  import { DropdownMenu } from "bits-ui";
  import { ChevronDown } from "lucide-svelte";
  import { cn } from "$lib/utils.js";
  import { Badge } from "$lib/components/ui/badge";
  import { Button } from "$lib/components/ui/button";
  import Menu from "$lib/components/ui/menu.svelte";
  import MenuPopup from "$lib/components/ui/menu-popup.svelte";

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

  const menuItemClass =
    "[&>svg]:-mx-0.5 flex min-h-8 cursor-default select-none items-center gap-2 rounded-sm px-2 py-1 text-base text-foreground outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-64 sm:min-h-7 sm:text-sm [&>svg:not([class*='opacity-'])]:opacity-80 [&>svg:not([class*='size-'])]:size-4.5 sm:[&>svg:not([class*='size-'])]:size-4 [&>svg]:pointer-events-none [&>svg]:shrink-0";
</script>

<Menu>
  <DropdownMenu.Trigger>
    {#snippet child({ props })}
      <Button {...props} variant="ghost">
        Products
        <ChevronDown class="size-4" />
      </Button>
    {/snippet}
  </DropdownMenu.Trigger>
  <MenuPopup align="center" sideOffset={4}>
    {#each items as item (item.href)}
      {@const { href, isExternal } = getLinkHref(item)}
      <DropdownMenu.Item>
        {#snippet child({ props })}
          <a
            {...props}
            {href}
            class={cn(menuItemClass, "group justify-between")}
            target={isExternal ? "_self" : undefined}
          >
            <span
              class="font-heading in-data-highlighted:text-foreground text-muted-foreground"
            >
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
          </a>
        {/snippet}
      </DropdownMenu.Item>
    {/each}
  </MenuPopup>
</Menu>
