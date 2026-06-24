<script lang="ts">
  import { buttonVariants } from "$lib/components/ui/button";
  import {
    Menu,
    MenuPopup,
    MenuRadioGroup,
    MenuRadioItem,
    MenuTrigger,
  } from "$lib/components/ui/menu";

  let theme = $state("system");
</script>

<Menu>
  <MenuTrigger class={buttonVariants({ variant: "outline" })}>Open menu</MenuTrigger>
  <MenuPopup>
    <MenuRadioGroup value={theme} onValueChange={(v) => { theme = v; }}>
      <MenuRadioItem value="light">Light</MenuRadioItem>
      <MenuRadioItem value="dark">Dark</MenuRadioItem>
      <MenuRadioItem value="system">System</MenuRadioItem>
    </MenuRadioGroup>
  </MenuPopup>
</Menu>
