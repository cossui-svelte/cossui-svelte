<script lang="ts">
  import { z } from "zod";
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
  import { createForm } from "$lib/hooks/use-superform";

  const schema = z.object({
    name: z.string().min(1),
    username: z.string().min(1),
  });

  const superform = createForm({
    initialData: { name: "Pedro Duarte", username: "@peduarte" },
    schema,
  });
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
    <Form {superform} class="contents">
      <DialogPanel>
        <Field name="name">
          <FieldLabel>Name</FieldLabel>
          <Input/>
        </Field>
        <Field name="username">
          <FieldLabel>Username</FieldLabel>
          <Input/>
        </Field>
      </DialogPanel>
      <DialogFooter>
        <DialogClose class={buttonVariants({ variant: "ghost" })}
          >Cancel</DialogClose
        >
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </Form>
  </DialogPopup>
</Dialog>
