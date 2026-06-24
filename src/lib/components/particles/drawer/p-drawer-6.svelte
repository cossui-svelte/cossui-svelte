<script lang="ts">
  import { buttonVariants } from "$lib/components/ui/button";
  import {
    Drawer,
    DrawerClose,
    DrawerFooter,
    DrawerHeader,
    DrawerPanel,
    DrawerPopup,
    DrawerTitle,
    DrawerTrigger,
  } from "$lib/components/ui/drawer";

  const boxes = Array.from({ length: 48 }, (_, i) => i);
</script>

<Drawer>
  <DrawerTrigger class={buttonVariants({ variant: "outline" })}>
    Scrollable content
  </DrawerTrigger>
  <DrawerPopup showBar>
    <DrawerHeader>
      <DrawerTitle>Scrollable content</DrawerTitle>
    </DrawerHeader>
    <DrawerPanel>
      <div class="flex flex-col gap-2">
        {#each boxes as i (i)}
          <div class="h-12 shrink-0 rounded-xl border bg-muted"></div>
        {/each}
      </div>
    </DrawerPanel>
    <DrawerFooter>
      <DrawerClose class={buttonVariants({ variant: "outline" })}>Close</DrawerClose>
    </DrawerFooter>
  </DrawerPopup>
</Drawer>
