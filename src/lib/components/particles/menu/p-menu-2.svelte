<script lang="ts">
  import { buttonVariants } from "$lib/components/ui/button";
  import {
    Menu,
    MenuItem,
    MenuPopup,
    MenuTrigger,
  } from "$lib/components/ui/menu";
</script>

<Menu>
  <MenuTrigger class={buttonVariants({ variant: "outline" })}>Hover me</MenuTrigger>
  <MenuPopup>
    <MenuItem>Item one</MenuItem>
    <MenuItem>Item two</MenuItem>
  </MenuPopup>
</Menu>
