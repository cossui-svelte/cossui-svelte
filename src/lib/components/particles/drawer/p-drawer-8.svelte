<script lang="ts">
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
  import { Field, FieldLabel } from "$lib/components/ui/field";
  import { Input } from "$lib/components/ui/input";
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
          <DrawerPanel class="grid gap-4">
            <Field>
              <FieldLabel>Name</FieldLabel>
              <Input value="Bora Baloglu" type="text" />
            </Field>
            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input value="bora@example.com" type="email" />
            </Field>
          </DrawerPanel>
          <DrawerFooter>
            <DrawerClose class={buttonVariants({ variant: "ghost" })}>Cancel</DrawerClose>
            <Button type="submit">Save changes</Button>
          </DrawerFooter>
        </DrawerPopup>
      </DrawerNestedRoot>
    </DrawerFooter>
  </DrawerPopup>
</Drawer>
