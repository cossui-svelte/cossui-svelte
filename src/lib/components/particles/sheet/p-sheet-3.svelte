<script lang="ts">
  import { buttonVariants } from "$lib/components/ui/button";
  import {
    Sheet,
    SheetDescription,
    SheetHeader,
    SheetPanel,
    SheetPopup,
    SheetTitle,
    SheetTrigger,
  } from "$lib/components/ui/sheet";

  const lorem =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
</script>

<div class="flex flex-wrap gap-2">
  <Sheet>
    <SheetTrigger class={buttonVariants({ variant: "outline" })}>Open Right</SheetTrigger>
    <SheetPopup showCloseButton={false}>
      <SheetHeader>
        <SheetTitle>Right</SheetTitle>
        <SheetDescription>Right side of the screen.</SheetDescription>
      </SheetHeader>
      <SheetPanel><p>{lorem}</p></SheetPanel>
    </SheetPopup>
  </Sheet>

  <Sheet>
    <SheetTrigger class={buttonVariants({ variant: "outline" })}>Open Left</SheetTrigger>
    <SheetPopup showCloseButton={false} side="left">
      <SheetHeader>
        <SheetTitle>Left</SheetTitle>
        <SheetDescription>Left side of the screen.</SheetDescription>
      </SheetHeader>
      <SheetPanel><p>{lorem}</p></SheetPanel>
    </SheetPopup>
  </Sheet>

  <Sheet>
    <SheetTrigger class={buttonVariants({ variant: "outline" })}>Open Top</SheetTrigger>
    <SheetPopup showCloseButton={false} side="top">
      <SheetHeader>
        <SheetTitle>Top</SheetTitle>
        <SheetDescription>Top of the screen.</SheetDescription>
      </SheetHeader>
      <SheetPanel><p>{lorem}</p></SheetPanel>
    </SheetPopup>
  </Sheet>

  <Sheet>
    <SheetTrigger class={buttonVariants({ variant: "outline" })}>Open Bottom</SheetTrigger>
    <SheetPopup showCloseButton={false} side="bottom">
      <SheetHeader>
        <SheetTitle>Bottom</SheetTitle>
        <SheetDescription>Bottom of the screen.</SheetDescription>
      </SheetHeader>
      <SheetPanel><p>{lorem}</p></SheetPanel>
    </SheetPopup>
  </Sheet>
</div>
