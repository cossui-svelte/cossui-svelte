<script lang="ts">
  import { buttonVariants } from "$lib/components/ui/button";
  import {
    Dialog,
    DialogClose,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogPopup,
    DialogTitle,
  } from "$lib/components/ui/dialog";
  import { Menu, MenuItem, MenuPopup, MenuTrigger } from "$lib/components/ui/menu";

  let dialogOpen = $state(false);
</script>

<Menu>
  <MenuTrigger class={buttonVariants({ variant: "outline" })}>Open menu</MenuTrigger>
  <MenuPopup align="start">
    <MenuItem onclick={() => { dialogOpen = true; }}>Open dialog</MenuItem>
  </MenuPopup>
</Menu>

<Dialog bind:open={dialogOpen}>
  <DialogPopup>
    <DialogHeader>
      <DialogTitle>Settings</DialogTitle>
      <DialogDescription>Change your preferences</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose class={buttonVariants({ variant: "ghost" })}>Close</DialogClose>
    </DialogFooter>
  </DialogPopup>
</Dialog>
