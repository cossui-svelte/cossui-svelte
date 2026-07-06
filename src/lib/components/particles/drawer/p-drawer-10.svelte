<script lang="ts">
  import { z } from "zod";
  import { Button, buttonVariants } from "$lib/components/ui/button";
  import {
    Drawer,
    DrawerClose,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerPanel,
    DrawerPopup,
    DrawerTitle,
    DrawerTrigger,
  } from "$lib/components/ui/drawer";
  import { Field, FieldLabel } from "$lib/components/ui/field";
  import { Form } from "$lib/components/ui/form";
  import { Input } from "$lib/components/ui/input";
  import { createForm } from "$lib/hooks/use-superform";

  const schema = z.object({
    name: z.string().min(1),
    username: z.string().min(1),
  });

  const defaultFooterForm = createForm({
    initialData: { name: "Margaret Welsh", username: "@maggie.welsh" },
    schema,
  });

  const bareFooterForm = createForm({
    initialData: { name: "Margaret Welsh", username: "@maggie.welsh" },
    schema,
  });
</script>

<div class="flex flex-wrap gap-2">
  <Drawer position="right">
    <DrawerTrigger class={buttonVariants({ variant: "outline" })}>
      Default footer
    </DrawerTrigger>
    <DrawerPopup variant="inset">
      <DrawerHeader>
        <DrawerTitle>Edit profile</DrawerTitle>
        <DrawerDescription>
          Make changes to your profile here. Click save when you're done.
        </DrawerDescription>
      </DrawerHeader>
      <Form superform={defaultFooterForm} class="contents">
        <DrawerPanel class="grid gap-4">
          <Field name="name">
            <FieldLabel>Name</FieldLabel>
            <Input type="text" />
          </Field>
          <Field name="username">
            <FieldLabel>Username</FieldLabel>
            <Input type="text" />
          </Field>
        </DrawerPanel>
        <DrawerFooter>
          <DrawerClose class={buttonVariants({ variant: "ghost" })}>Cancel</DrawerClose>
          <Button type="submit">Save</Button>
        </DrawerFooter>
      </Form>
    </DrawerPopup>
  </Drawer>

  <Drawer position="right">
    <DrawerTrigger class={buttonVariants({ variant: "outline" })}>
      Bare footer
    </DrawerTrigger>
    <DrawerPopup variant="inset">
      <DrawerHeader>
        <DrawerTitle>Edit profile</DrawerTitle>
        <DrawerDescription>
          Make changes to your profile here. Click save when you're done.
        </DrawerDescription>
      </DrawerHeader>
      <Form superform={bareFooterForm} class="contents">
        <DrawerPanel class="grid gap-4">
          <Field name="name">
            <FieldLabel>Name</FieldLabel>
            <Input type="text" />
          </Field>
          <Field name="username">
            <FieldLabel>Username</FieldLabel>
            <Input type="text" />
          </Field>
        </DrawerPanel>
        <DrawerFooter variant="bare">
          <DrawerClose class={buttonVariants({ variant: "ghost" })}>Cancel</DrawerClose>
          <Button type="submit">Save</Button>
        </DrawerFooter>
      </Form>
    </DrawerPopup>
  </Drawer>
</div>
