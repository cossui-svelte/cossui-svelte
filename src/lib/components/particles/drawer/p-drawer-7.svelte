<script lang="ts">
  import { buttonVariants } from "$lib/components/ui/button";
  import {
    Drawer,
    DrawerClose,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerNestedRoot,
    DrawerPanel,
    DrawerPopup,
    DrawerTitle,
    DrawerTrigger,
  } from "$lib/components/ui/drawer";
</script>

<Drawer>
  <DrawerTrigger class={buttonVariants({ variant: "outline" })}>
    Nested drawers
  </DrawerTrigger>
  <DrawerPopup showBar>
    <DrawerHeader class="text-center">
      <DrawerTitle>First step</DrawerTitle>
      <DrawerDescription>
        This is the first step. Tap the button below to continue to the next screen.
      </DrawerDescription>
    </DrawerHeader>
    <DrawerFooter variant="bare" class="justify-center sm:justify-center">
      <DrawerClose class={buttonVariants({ variant: "ghost" })}>Cancel</DrawerClose>
      <DrawerNestedRoot>
        <DrawerTrigger class={buttonVariants({ variant: "outline" })}>Continue</DrawerTrigger>
        <DrawerPopup showBar>
          <DrawerHeader class="text-center">
            <DrawerTitle>Second step</DrawerTitle>
            <DrawerDescription>
              You've reached the second step. Tap the button below to continue to the next screen.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerPanel>
            <div class="flex justify-center">
              <div class="size-48 shrink-0 rounded-xl border bg-muted"></div>
            </div>
          </DrawerPanel>
          <DrawerFooter variant="bare" class="justify-center sm:justify-center">
            <DrawerClose class={buttonVariants({ variant: "ghost" })}>Back</DrawerClose>
            <DrawerNestedRoot>
              <DrawerTrigger class={buttonVariants({ variant: "outline" })}>Continue</DrawerTrigger>
              <DrawerPopup showBar>
                <DrawerHeader class="text-center">
                  <DrawerTitle>Third step</DrawerTitle>
                  <DrawerDescription>
                    You've reached the final step. You can close this drawer or go back.
                  </DrawerDescription>
                </DrawerHeader>
                <DrawerPanel>
                  <div class="flex justify-center">
                    <div class="size-32 shrink-0 rounded-full border bg-muted"></div>
                  </div>
                </DrawerPanel>
              </DrawerPopup>
            </DrawerNestedRoot>
          </DrawerFooter>
        </DrawerPopup>
      </DrawerNestedRoot>
    </DrawerFooter>
  </DrawerPopup>
</Drawer>
