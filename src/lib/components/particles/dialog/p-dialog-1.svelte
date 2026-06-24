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
    Edit Profile
  </DialogTrigger>
  <DialogPopup>
    <DialogHeader>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>
        Make changes to your profile here. Click save when you're done.
      </DialogDescription>
    </DialogHeader>
    <DialogPanel>
      <Form>
        <Field>
          <FieldLabel>Name</FieldLabel>
          <Input value="Pedro Duarte" />
        </Field>
        <Field>
          <FieldLabel>Username</FieldLabel>
          <Input value="@peduarte" />
        </Field>
      </Form>
    </DialogPanel>
    <DialogFooter>
      <DialogClose class={buttonVariants({ variant: "ghost" })}>Cancel</DialogClose>
      <Button>Save changes</Button>
    </DialogFooter>
  </DialogPopup>
</Dialog>
