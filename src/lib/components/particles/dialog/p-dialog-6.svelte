<script lang="ts">
  import { Button, buttonVariants } from "$lib/components/ui/button";
  import {
    Dialog,
    DialogClose,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogPanel,
    DialogPopup,
    DialogTitle,
    DialogTrigger,
  } from "$lib/components/ui/dialog";
  import { Field, FieldLabel } from "$lib/components/ui/field";
  import { Form } from "$lib/components/ui/form";
  import { Input } from "$lib/components/ui/input";
</script>

<Dialog>
  <DialogTrigger class={buttonVariants({ variant: "outline" })}>
    Open Dialog
  </DialogTrigger>
  <DialogPopup class="sm:max-w-sm">
    <DialogHeader>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>
        Make changes to your profile here. Click save when you're done.
      </DialogDescription>
    </DialogHeader>
    <Form class="contents">
      <DialogPanel class="grid gap-4">
        <Field>
          <FieldLabel>Name</FieldLabel>
          <Input value="Margaret Welsh" type="text" />
        </Field>
        <Field>
          <FieldLabel>Username</FieldLabel>
          <Input value="@maggie.welsh" type="text" />
        </Field>
      </DialogPanel>
      <DialogFooter variant="bare">
        <DialogClose class={buttonVariants({ variant: "ghost" })}>Cancel</DialogClose>
        <Button type="submit">Save</Button>
      </DialogFooter>
    </Form>
  </DialogPopup>
</Dialog>
