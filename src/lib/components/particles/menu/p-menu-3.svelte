<script lang="ts">
  import { buttonVariants } from '$lib/components/ui/button';
  import { Menu, MenuCheckboxItem, MenuPopup, MenuTrigger } from '$lib/components/ui/menu';

  let autoSave = $state(true);
  let notifications = $state(false);
</script>

<Menu>
  <MenuTrigger class={buttonVariants({ variant: 'outline' })}>Open menu</MenuTrigger>
  <MenuPopup>
    <MenuCheckboxItem bind:checked={autoSave}>Auto save</MenuCheckboxItem>
    <MenuCheckboxItem bind:checked={notifications}>Notifications</MenuCheckboxItem>
  </MenuPopup>
</Menu>
