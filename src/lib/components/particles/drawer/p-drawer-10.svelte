<script lang="ts">
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
      <Form class="contents">
        <DrawerPanel class="grid gap-4">
          <Field>
            <FieldLabel>Name</FieldLabel>
            <Input value="Margaret Welsh" type="text" />
          </Field>
          <Field>
            <FieldLabel>Username</FieldLabel>
            <Input value="@maggie.welsh" type="text" />
          </Field>
        </DrawerPanel>
        <DrawerFooter>
          <DrawerClose class={buttonVariants({ variant: "ghost" })}>Cancel</DrawerClose>
          <Button>Save</Button>
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
      <Form class="contents">
        <DrawerPanel class="grid gap-4">
          <Field>
            <FieldLabel>Name</FieldLabel>
            <Input value="Margaret Welsh" type="text" />
          </Field>
          <Field>
            <FieldLabel>Username</FieldLabel>
            <Input value="@maggie.welsh" type="text" />
          </Field>
        </DrawerPanel>
        <DrawerFooter variant="bare">
          <DrawerClose class={buttonVariants({ variant: "ghost" })}>Cancel</DrawerClose>
          <Button>Save</Button>
        </DrawerFooter>
      </Form>
    </DrawerPopup>
  </Drawer>
</div>
