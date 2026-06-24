<script lang="ts">
  import { buttonVariants } from "$lib/components/ui/button";
  import {
    Menu,
    MenuLinkItem,
    MenuPopup,
    MenuTrigger,
  } from "$lib/components/ui/menu";
</script>

<Menu>
  <MenuTrigger class={buttonVariants({ variant: "outline" })}>Open menu</MenuTrigger>
  <MenuPopup>
    <MenuLinkItem href="/docs">Docs</MenuLinkItem>
    <MenuLinkItem href="/particles">Particles</MenuLinkItem>
  </MenuPopup>
</Menu>
