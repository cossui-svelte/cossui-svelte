<script lang="ts">
  import { buttonVariants } from "$lib/components/ui/button";
  import {
    Drawer,
    DrawerDescription,
    DrawerHeader,
    DrawerPanel,
    DrawerPopup,
    DrawerTitle,
    DrawerTrigger,
  } from "$lib/components/ui/drawer";
</script>

<Drawer position="right">
  <DrawerTrigger class={buttonVariants({ variant: "outline" })}>
    Open drawer
  </DrawerTrigger>
  <DrawerPopup showCloseButton variant="straight">
    <DrawerHeader>
      <DrawerTitle>Notifications</DrawerTitle>
      <DrawerDescription>This is the description of the drawer.</DrawerDescription>
    </DrawerHeader>
    <DrawerPanel>
      <p class="text-muted-foreground text-sm">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris.
      </p>
    </DrawerPanel>
  </DrawerPopup>
</Drawer>
