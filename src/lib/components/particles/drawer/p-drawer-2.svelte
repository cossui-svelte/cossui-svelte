<script lang="ts">
  import { buttonVariants } from "$lib/components/ui/button";
  import {
    Drawer,
    DrawerClose,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerPopup,
    DrawerTitle,
    DrawerTrigger,
  } from "$lib/components/ui/drawer";
</script>

<Drawer>
  <DrawerTrigger class={buttonVariants({ variant: "outline" })}>
    Open drawer
  </DrawerTrigger>
  <DrawerPopup>
    <DrawerHeader class="text-center">
      <DrawerTitle>Notifications</DrawerTitle>
      <DrawerDescription>This is the description of the drawer.</DrawerDescription>
    </DrawerHeader>
    <DrawerFooter variant="bare" class="justify-center sm:justify-center">
      <DrawerClose class={buttonVariants({ variant: "outline" })}>Close</DrawerClose>
    </DrawerFooter>
  </DrawerPopup>
</Drawer>
