<script lang="ts">
  import { z } from "zod";
  import { Button, buttonVariants } from "$lib/components/ui/button";
  import { Field, FieldLabel } from "$lib/components/ui/field";
  import { Form } from "$lib/components/ui/form";
  import { Input } from "$lib/components/ui/input";
  import {
    Sheet,
    SheetClose,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetPanel,
    SheetPopup,
    SheetTitle,
    SheetTrigger,
  } from "$lib/components/ui/sheet";
  import { createForm } from "$lib/hooks/use-superform";

  const schema = z.object({
    name: z.string().min(1),
    username: z.string().min(1),
  });

  const superform = createForm({
    initialData: { name: "Margaret Welsh", username: "@maggie.welsh" },
    onUpdated: (data) => {
      alert(`Saved: ${data.name} / ${data.username}`);
    },
    schema,
  });
</script>

<Sheet>
  <SheetTrigger class={buttonVariants({ variant: "outline" })}
    >Open Sheet</SheetTrigger
  >
  <SheetPopup>
    <SheetHeader>
      <SheetTitle>Edit profile</SheetTitle>
      <SheetDescription>
        Make changes to your profile here. Click save when you're done.
      </SheetDescription>
    </SheetHeader>
    <Form {superform} class="contents">
      <SheetPanel class="grid gap-4">
        <Field name="name">
          <FieldLabel>Name</FieldLabel>
          <Input value="Margaret Welsh" type="text" />
        </Field>
        <Field name="username">
          <FieldLabel>Username</FieldLabel>
          <Input value="@maggie.welsh" type="text" />
        </Field>
      </SheetPanel>
      <SheetFooter>
        <SheetClose class={buttonVariants({ variant: "ghost" })}
          >Cancel</SheetClose
        >
        <Button type="submit" class={buttonVariants()}>Save</Button>
      </SheetFooter>
    </Form>
  </SheetPopup>
</Sheet>
