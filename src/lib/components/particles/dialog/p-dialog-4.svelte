<script lang="ts">
  import { Button, buttonVariants } from "$lib/components/ui/button";
  import {
    AlertDialog,
    AlertDialogClose,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogPopup,
    AlertDialogTitle,
  } from "$lib/components/ui/alert-dialog";
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
  import { Field } from "$lib/components/ui/field";
  import { Form } from "$lib/components/ui/form";
  import { Textarea } from "$lib/components/ui/textarea";

  let dialogOpen = $state(false);
  let confirmOpen = $state(false);
  let value = $state("");
</script>

<Dialog
  open={dialogOpen}
  onOpenChange={(o) => {
    if (!o && value) {
      confirmOpen = true;
    } else {
      dialogOpen = o;
    }
  }}
>
  <DialogTrigger
    class={buttonVariants({ variant: "outline" })}
    onclick={() => { dialogOpen = true; }}
  >
    Compose
  </DialogTrigger>
  <DialogPopup showCloseButton={false}>
    <DialogHeader>
      <DialogTitle>New message</DialogTitle>
      <DialogDescription>Type something and try closing.</DialogDescription>
    </DialogHeader>
    <Form
      class="contents"
      onsubmit={(e) => {
        e.preventDefault();
        dialogOpen = false;
      }}
    >
      <DialogPanel>
        <Field>
          <Textarea bind:value />
        </Field>
      </DialogPanel>
      <DialogFooter>
        <DialogClose class={buttonVariants({ variant: "ghost" })}>Cancel</DialogClose>
        <Button
          onclick={() => {
            value = "";
            dialogOpen = false;
          }}
        >
          Send
        </Button>
      </DialogFooter>
    </Form>
  </DialogPopup>
</Dialog>

<AlertDialog bind:open={confirmOpen}>
  <AlertDialogPopup>
    <AlertDialogHeader>
      <AlertDialogTitle>Discard message?</AlertDialogTitle>
      <AlertDialogDescription>
        You have unsaved content. Are you sure you want to discard it?
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogClose class={buttonVariants({ variant: "ghost" })}>
        Keep editing
      </AlertDialogClose>
      <Button
        variant="destructive"
        onclick={() => {
          value = "";
          confirmOpen = false;
          dialogOpen = false;
        }}
      >
        Discard
      </Button>
    </AlertDialogFooter>
  </AlertDialogPopup>
</AlertDialog>
