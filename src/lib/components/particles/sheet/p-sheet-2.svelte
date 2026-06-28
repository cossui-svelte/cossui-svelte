<script lang="ts">
  import { Button, buttonVariants } from "$lib/components/ui/button";
  import { Field } from "$lib/components/ui/field";
  import { Form } from "$lib/components/ui/form";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
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
  <SheetTrigger class={buttonVariants({ variant: "outline" })}
    >Open Sheet</SheetTrigger
  >
  <SheetPopup variant="inset">
    <SheetHeader>
      <SheetTitle>Edit profile</SheetTitle>
      <SheetDescription>
        Make changes to your profile here. Click save when you're done.
      </SheetDescription>
    </SheetHeader>
    <Form class="contents">
      <SheetPanel class="grid gap-4">
        <Field class="flex flex-col gap-1.5">
          <Label class="text-sm font-medium">Name</Label>
          <Input value="Margaret Welsh" type="text" />
        </Field>
        <Field class="flex flex-col gap-1.5">
          <Label class="text-sm font-medium">Username</Label>
          <Input value="@maggie.welsh" type="text" />
        </Field>
      </SheetPanel>
      <SheetFooter>
        <SheetClose class={buttonVariants({ variant: "ghost" })}
          >Cancel</SheetClose
        >
        <Button type="submit" class={buttonVariants()}>Save</Button>
      </SheetFooter>
    </Form>
  </SheetPopup>
</Sheet>
