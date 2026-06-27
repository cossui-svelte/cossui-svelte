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
  import { Input } from "$lib/components/ui/input";
</script>

<Dialog>
  <DialogTrigger class={buttonVariants({ variant: "outline" })}>
    Open parent
  </DialogTrigger>
  <DialogPopup showCloseButton={false}>
    <DialogHeader>
      <DialogTitle>Manage team member</DialogTitle>
      <DialogDescription>View and manage a user in your team.</DialogDescription>
    </DialogHeader>
    <DialogPanel class="grid gap-4">
      <div class="grid gap-1">
        <p class="text-muted-foreground text-sm">Name</p>
        <p class="font-medium text-sm">Bora Baloglu</p>
      </div>
      <div class="grid gap-1">
        <p class="text-muted-foreground text-sm">Email</p>
        <p class="font-medium text-sm">bora@example.com</p>
      </div>
    </DialogPanel>
    <DialogFooter>
      <Dialog>
        <DialogTrigger class={buttonVariants({ variant: "outline" })}>
          Edit details
        </DialogTrigger>
        <DialogPopup showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Edit details</DialogTitle>
            <DialogDescription>
              Make changes to the member's information.
            </DialogDescription>
          </DialogHeader>
          <DialogPanel class="grid gap-4">
            <Field name="name">
              <FieldLabel>Name</FieldLabel>
              <Input value="Bora Baloglu" type="text" />
            </Field>
            <Field name="email">
              <FieldLabel>Email</FieldLabel>
              <Input value="bora@example.com" type="text" />
            </Field>
          </DialogPanel>
          <DialogFooter>
            <DialogClose class={buttonVariants({ variant: "ghost" })}>Cancel</DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogPopup>
      </Dialog>
    </DialogFooter>
  </DialogPopup>
</Dialog>
