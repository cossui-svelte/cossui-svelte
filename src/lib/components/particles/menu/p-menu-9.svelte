<script lang="ts">
  import { buttonVariants } from '$lib/components/ui/button';
  import { Menu, MenuCheckboxItem, MenuPopup, MenuTrigger } from '$lib/components/ui/menu';

  let autoSave = $state(true);
  let notifications = $state(false);
  let darkMode = $state(true);
</script>

<Menu>
  <MenuTrigger class={buttonVariants({ variant: 'outline' })}>Open menu</MenuTrigger>
  <MenuPopup>
    <MenuCheckboxItem variant="switch" bind:checked={autoSave}>Auto save</MenuCheckboxItem>
    <MenuCheckboxItem variant="switch" bind:checked={notifications}>Notifications</MenuCheckboxItem>
    <MenuCheckboxItem variant="switch" bind:checked={darkMode}>Dark mode</MenuCheckboxItem>
  </MenuPopup>
</Menu>
