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

  let isMobile = $state(false);

  $effect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    isMobile = mq.matches;
    const handler = (e: MediaQueryListEvent) => { isMobile = e.matches; };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  });
</script>

{#if isMobile}
  <Drawer>
    <DrawerTrigger class={buttonVariants({ variant: "outline" })}>Open</DrawerTrigger>
    <DrawerPopup showBar>
      <DrawerHeader>
        <DrawerTitle>Edit profile</DrawerTitle>
        <DrawerDescription>
          Make changes to your profile here. Click save when you're done.
        </DrawerDescription>
      </DrawerHeader>
      <Form class="contents">
        <DrawerPanel class="grid gap-4" scrollable={false}>
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
          <Button type="submit">Save</Button>
        </DrawerFooter>
      </Form>
    </DrawerPopup>
  </Drawer>
{:else}
  <Dialog>
    <DialogTrigger class={buttonVariants({ variant: "outline" })}>Open</DialogTrigger>
    <DialogPopup class="sm:max-w-sm">
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <Form class="contents">
        <DialogPanel class="grid gap-4">
          <Field>
            <FieldLabel>Name</FieldLabel>
            <Input value="Margaret Welsh" type="text" />
          </Field>
          <Field>
            <FieldLabel>Username</FieldLabel>
            <Input value="@maggie.welsh" type="text" />
          </Field>
        </DialogPanel>
        <DialogFooter>
          <DialogClose class={buttonVariants({ variant: "ghost" })}>Cancel</DialogClose>
          <Button type="submit">Save</Button>
        </DialogFooter>
      </Form>
    </DialogPopup>
  </Dialog>
{/if}
