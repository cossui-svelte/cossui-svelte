<script lang="ts">
  import { buttonVariants } from "$lib/components/ui/button";
  import {
    Menu,
    MenuItem,
    MenuPopup,
    MenuSub,
    MenuSubPopup,
    MenuSubTrigger,
    MenuTrigger,
  } from "$lib/components/ui/menu";
</script>

<Menu>
  <MenuTrigger class={buttonVariants({ variant: "outline" })}>Open menu</MenuTrigger>
  <MenuPopup>
    <MenuItem>Item one</MenuItem>
    <MenuSub>
      <MenuSubTrigger>More</MenuSubTrigger>
      <MenuSubPopup>
        <MenuItem>Sub item A</MenuItem>
        <MenuItem>Sub item B</MenuItem>
      </MenuSubPopup>
    </MenuSub>
    <MenuItem>Item two</MenuItem>
  </MenuPopup>
</Menu>
