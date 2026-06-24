<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import {
    Drawer,
    DrawerHeader,
    DrawerPanel,
    DrawerPopup,
    DrawerTitle,
  } from "$lib/components/ui/drawer";
</script>

<div class="relative min-h-80 w-full overflow-hidden rounded-xl border">
  <Drawer modal={false} position="left">
    <div class="absolute inset-y-0 start-0 w-8 border-e border-dashed border-input bg-muted z-50 touch-none">
      <span class="pointer-events-none absolute top-1/2 left-0 ms-2 -translate-y-1/2 rotate-90 whitespace-nowrap font-medium text-muted-foreground text-xs uppercase">
        Swipe area
      </span>
    </div>

    <div class="flex min-h-80 items-center justify-center p-6 ps-14 text-center">
      <p class="max-w-56 text-balance text-muted-foreground text-sm">
        Swipe from the left edge to open the menu.
      </p>
    </div>

    <DrawerPopup position="left" showCloseButton variant="straight">
      <DrawerHeader>
        <DrawerTitle>Menu</DrawerTitle>
      </DrawerHeader>
      <DrawerPanel>
        <nav class="-mx-[calc(--spacing(3)-1px)] flex flex-col gap-0.5">
          <Button class="justify-start" href="#" variant="ghost">Home</Button>
          <Button class="justify-start" href="#" variant="ghost">Profile</Button>
          <Button class="justify-start" href="#" variant="ghost">Settings</Button>
          <Button class="justify-start" href="#" variant="ghost">Sign out</Button>
        </nav>
      </DrawerPanel>
    </DrawerPopup>
  </Drawer>
</div>
