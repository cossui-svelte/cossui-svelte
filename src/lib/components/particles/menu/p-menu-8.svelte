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
  <MenuTrigger class={buttonVariants({ variant: "outline" })}>Open menu</MenuTrigger>
  <MenuPopup>
    <MenuItem>Profile</MenuItem>
    <MenuItem>Settings</MenuItem>
    <MenuItem>Log out</MenuItem>
  </MenuPopup>
</Menu>
