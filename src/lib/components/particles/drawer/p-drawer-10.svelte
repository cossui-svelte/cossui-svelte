<script lang="ts">
  import { Button, buttonVariants } from '#lib/components/ui/button/index.js';
  import {
    Drawer,
    DrawerClose,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerPanel,
    DrawerPopup,
    DrawerTitle,
    DrawerTrigger
  } from '#lib/components/ui/drawer/index.js';
  import { Field, FieldLabel } from '#lib/components/ui/field/index.js';
  import { Form } from '#lib/components/ui/form/index.js';
  import { Input } from '#lib/components/ui/input/index.js';
</script>

<div class="flex flex-wrap gap-2">
  <Drawer position="right">
    <DrawerTrigger class={buttonVariants({ variant: 'outline' })}>Default footer</DrawerTrigger>
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
            <Input type="text" value="Margaret Welsh" />
          </Field>
          <Field>
            <FieldLabel>Username</FieldLabel>
            <Input type="text" value="@maggie.welsh" />
          </Field>
        </DrawerPanel>
        <DrawerFooter>
          <DrawerClose class={buttonVariants({ variant: 'ghost' })}>Cancel</DrawerClose>
          <Button type="submit">Save</Button>
        </DrawerFooter>
      </Form>
    </DrawerPopup>
  </Drawer>

  <Drawer position="right">
    <DrawerTrigger class={buttonVariants({ variant: 'outline' })}>Bare footer</DrawerTrigger>
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
            <Input type="text" value="Margaret Welsh" />
          </Field>
          <Field>
            <FieldLabel>Username</FieldLabel>
            <Input type="text" value="@maggie.welsh" />
          </Field>
        </DrawerPanel>
        <DrawerFooter variant="bare">
          <DrawerClose class={buttonVariants({ variant: 'ghost' })}>Cancel</DrawerClose>
          <Button type="submit">Save</Button>
        </DrawerFooter>
      </Form>
    </DrawerPopup>
  </Drawer>
</div>
