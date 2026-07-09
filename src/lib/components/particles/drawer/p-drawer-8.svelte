<script lang="ts">
  import { z } from "zod";
  import { Button, buttonVariants } from "$lib/components/ui/button";
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
  import { Field, FieldError, FieldLabel } from "$lib/components/ui/field";
  import { Form } from "$lib/components/ui/form";
  import { Input } from "$lib/components/ui/input";
  import { createForm } from "$lib/hooks/use-superform";

  const schema = z.object({
    email: z.string().email("Please enter a valid email."),
    name: z.string().min(1, { message: "Please enter a name." }),
  });

  const superform = createForm({
    initialData: { email: "bora@example.com", name: "Bora Baloglu" },
    schema,
  });
</script>

<Drawer position="right">
  <DrawerTrigger class={buttonVariants({ variant: "outline" })}>
    Nested inset drawers
  </DrawerTrigger>
  <DrawerPopup variant="inset">
    <DrawerHeader>
      <DrawerTitle>Manage team member</DrawerTitle>
      <DrawerDescription>View and manage a user in your team.</DrawerDescription>
    </DrawerHeader>
    <DrawerPanel class="grid gap-4">
      <div class="grid gap-1">
        <p class="text-muted-foreground text-sm">Name</p>
        <p class="font-medium text-sm">Bora Baloglu</p>
      </div>
      <div class="grid gap-1">
        <p class="text-muted-foreground text-sm">Email</p>
        <p class="font-medium text-sm">bora@example.com</p>
      </div>
    </DrawerPanel>
    <DrawerFooter>
      <DrawerNestedRoot position="right">
        <DrawerTrigger class={buttonVariants({ variant: "outline" })}>
          Edit details
        </DrawerTrigger>
        <DrawerPopup variant="inset">
          <DrawerHeader>
            <DrawerTitle>Edit details</DrawerTitle>
            <DrawerDescription>
              Make changes to the member's information.
            </DrawerDescription>
          </DrawerHeader>
          <Form {superform} class="contents">
            <DrawerPanel class="grid gap-4">
              <Field name="name">
                <FieldLabel>Name</FieldLabel>
                <Input type="text" />
                <FieldError />
              </Field>
              <Field name="email">
                <FieldLabel>Email</FieldLabel>
                <Input type="email" />
                <FieldError />
              </Field>
            </DrawerPanel>
            <DrawerFooter>
              <DrawerClose class={buttonVariants({ variant: "ghost" })}>Cancel</DrawerClose>
              <Button type="submit">Save changes</Button>
            </DrawerFooter>
          </Form>
        </DrawerPopup>
      </DrawerNestedRoot>
    </DrawerFooter>
  </DrawerPopup>
</Drawer>
