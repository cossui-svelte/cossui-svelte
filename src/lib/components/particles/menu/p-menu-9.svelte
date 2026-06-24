<script lang="ts">
  import { buttonVariants } from "$lib/components/ui/button";
  import {
    Menu,
    MenuCheckboxItem,
    MenuPopup,
    MenuTrigger,
  } from "$lib/components/ui/menu";

  let autoSave = $state(true);
  let notifications = $state(false);
  let darkMode = $state(true);
</script>

<Menu>
  <MenuTrigger class={buttonVariants({ variant: "outline" })}>Open menu</MenuTrigger>
  <MenuPopup>
    <MenuCheckboxItem variant="switch" checked={autoSave} onCheckedChange={(v) => { autoSave = v; }}>
      Auto save
    </MenuCheckboxItem>
    <MenuCheckboxItem variant="switch" checked={notifications} onCheckedChange={(v) => { notifications = v; }}>
      Notifications
    </MenuCheckboxItem>
    <MenuCheckboxItem variant="switch" checked={darkMode} onCheckedChange={(v) => { darkMode = v; }}>
      Dark mode
    </MenuCheckboxItem>
  </MenuPopup>
</Menu>
