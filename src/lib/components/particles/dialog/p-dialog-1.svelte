<script lang="ts">
  import { Button, buttonVariants } from '#lib/components/ui/button/index.js';
  import {
    Dialog,
    DialogClose,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogPanel,
    DialogPopup,
    DialogTitle,
    DialogTrigger
  } from '#lib/components/ui/dialog/index.js';
  import { Field, FieldLabel } from '#lib/components/ui/field/index.js';
  import { Form } from '#lib/components/ui/form/index.js';
  import { Input } from '#lib/components/ui/input/index.js';
</script>

<Dialog>
  <DialogTrigger class={buttonVariants({ variant: 'outline' })}>Edit Profile</DialogTrigger>
  <DialogPopup>
    <DialogHeader>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>
        Make changes to your profile here. Click save when you're done.
      </DialogDescription>
    </DialogHeader>
    <Form class="contents">
      <DialogPanel>
        <Field>
          <FieldLabel>Name</FieldLabel>
          <Input value="Pedro Duarte" />
        </Field>
        <Field>
          <FieldLabel>Username</FieldLabel>
          <Input value="@peduarte" />
        </Field>
      </DialogPanel>
      <DialogFooter>
        <DialogClose class={buttonVariants({ variant: 'ghost' })}>Cancel</DialogClose>
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </Form>
  </DialogPopup>
</Dialog>
