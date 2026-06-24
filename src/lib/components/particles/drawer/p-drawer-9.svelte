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

  const snapPoints = ["300px", 1] as const;
  let snapPoint = $state<(typeof snapPoints)[number] | null>(snapPoints[0]);

  const boxes = Array.from({ length: 48 }, (_, i) => i);
</script>

<Drawer
  position="bottom"
  bind:activeSnapPoint={snapPoint}
  snapPoints={[...snapPoints]}
  snapToSequentialPoints
>
  <DrawerTrigger class={buttonVariants({ variant: "outline" })}>
    With snap points
  </DrawerTrigger>
  <DrawerPopup showBar>
    <DrawerHeader>
      <DrawerTitle>Snap Points</DrawerTitle>
      <DrawerDescription>
        Drag the drawer to snap between a compact peek and full-height view.
      </DrawerDescription>
    </DrawerHeader>
    <DrawerPanel>
      <div class="flex flex-col gap-2">
        {#each boxes as i (i)}
          <div class="h-12 shrink-0 rounded-xl border bg-muted"></div>
        {/each}
      </div>
    </DrawerPanel>
  </DrawerPopup>
</Drawer>
