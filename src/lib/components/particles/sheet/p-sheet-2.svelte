<script lang="ts">
  import { buttonVariants } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import {
    Sheet,
    SheetClose,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetPanel,
    SheetPopup,
    SheetTitle,
    SheetTrigger,
  } from "$lib/components/ui/sheet";
</script>

<Sheet>
  <SheetTrigger class={buttonVariants({ variant: "outline" })}>Open Sheet</SheetTrigger>
  <SheetPopup variant="inset">
    <SheetHeader>
      <SheetTitle>Edit profile</SheetTitle>
      <SheetDescription>
        Make changes to your profile here. Click save when you're done.
      </SheetDescription>
    </SheetHeader>
    <form class="contents">
      <SheetPanel class="grid gap-4">
        <div class="flex flex-col gap-1.5">
          <label class="text-sm font-medium">Name</label>
          <Input value="Margaret Welsh" type="text" />
        </div>
        <div class="flex flex-col gap-1.5">
          <label class="text-sm font-medium">Username</label>
          <Input value="@maggie.welsh" type="text" />
        </div>
      </SheetPanel>
      <SheetFooter>
        <SheetClose class={buttonVariants({ variant: "ghost" })}>Cancel</SheetClose>
        <button type="submit" class={buttonVariants()}>Save</button>
      </SheetFooter>
    </form>
  </SheetPopup>
</Sheet>
