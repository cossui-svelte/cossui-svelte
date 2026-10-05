<script lang="ts">
  import { Button, buttonVariants } from '#lib/components/ui/button/index.js';
  import { Field, FieldLabel } from '#lib/components/ui/field/index.js';
  import { Form } from '#lib/components/ui/form/index.js';
  import { Input } from '#lib/components/ui/input/index.js';
  import {
    Sheet,
    SheetClose,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetPanel,
    SheetPopup,
    SheetTitle,
    SheetTrigger
  } from '#lib/components/ui/sheet/index.js';
</script>

<Sheet>
  <SheetTrigger class={buttonVariants({ variant: 'outline' })}>Open Sheet</SheetTrigger>
  <SheetPopup>
    <SheetHeader>
      <SheetTitle>Edit profile</SheetTitle>
      <SheetDescription>
        Make changes to your profile here. Click save when you're done.
      </SheetDescription>
    </SheetHeader>
    <Form class="contents">
      <SheetPanel class="grid gap-4">
        <Field>
          <FieldLabel>Name</FieldLabel>
          <Input type="text" value="Margaret Welsh" />
        </Field>
        <Field>
          <FieldLabel>Username</FieldLabel>
          <Input type="text" value="@maggie.welsh" />
        </Field>
      </SheetPanel>
      <SheetFooter>
        <SheetClose class={buttonVariants({ variant: 'ghost' })}>Cancel</SheetClose>
        <Button type="submit" class={buttonVariants()}>Save</Button>
      </SheetFooter>
    </Form>
  </SheetPopup>
</Sheet>
