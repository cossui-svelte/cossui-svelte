<script lang="ts">
  import { buttonVariants } from '#lib/components/ui/button/index.js';
  import {
    Menu,
    MenuGroup,
    MenuGroupLabel,
    MenuItem,
    MenuPopup,
    MenuSeparator,
    MenuTrigger
  } from '#lib/components/ui/menu/index.js';
</script>

<Menu>
  <MenuTrigger class={buttonVariants({ variant: 'outline' })}>Open menu</MenuTrigger>
  <MenuPopup>
    <MenuGroup>
      <MenuGroupLabel>Account</MenuGroupLabel>
      <MenuItem>Profile</MenuItem>
      <MenuItem>Billing</MenuItem>
    </MenuGroup>
    <MenuSeparator />
    <MenuGroup>
      <MenuGroupLabel>Support</MenuGroupLabel>
      <MenuItem>Docs</MenuItem>
      <MenuItem>Contact</MenuItem>
    </MenuGroup>
  </MenuPopup>
</Menu>
