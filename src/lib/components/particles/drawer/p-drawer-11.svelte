<script lang="ts">
  import { Button, buttonVariants } from "$lib/components/ui/button";
  import {
    Drawer,
    DrawerHeader,
    DrawerPanel,
    DrawerPopup,
    DrawerTitle,
    DrawerTrigger,
  } from "$lib/components/ui/drawer";

  let open = $state(false);
</script>

<Drawer position="left" bind:open>
  <DrawerTrigger class={buttonVariants({ variant: "outline" })}>
    Open menu
  </DrawerTrigger>
  <DrawerPopup showCloseButton variant="straight">
    <DrawerHeader>
      <DrawerTitle>Menu</DrawerTitle>
    </DrawerHeader>
    <DrawerPanel>
      <nav class="-mx-[calc(--spacing(3)-1px)] flex flex-col gap-0.5">
        <Button class="justify-start" href="#" variant="ghost" onclick={() => { open = false; }}>
          Home
        </Button>
        <Button class="justify-start" href="#" variant="ghost" onclick={() => { open = false; }}>
          Profile
        </Button>
        <Button class="justify-start" href="#" variant="ghost" onclick={() => { open = false; }}>
          Settings
        </Button>
        <Button class="justify-start" href="#" variant="ghost" onclick={() => { open = false; }}>
          Sign out
        </Button>
      </nav>
    </DrawerPanel>
  </DrawerPopup>
</Drawer>
