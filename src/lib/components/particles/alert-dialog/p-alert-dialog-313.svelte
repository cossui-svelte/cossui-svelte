<script lang="ts">
  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogClose,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogPopup,
    AlertDialogTitle,
    AlertDialogTrigger
  } from '$lib/components/ui/alert-dialog';
  import { buttonVariants } from '$lib/components/ui/button';
</script>

<AlertDialog>
  <AlertDialogTrigger class={buttonVariants({ variant: 'outline' })}>
    Alert dialog
  </AlertDialogTrigger>
  <AlertDialogPopup>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>
        Take a moment to review the details provided to ensure you understand the implications.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogClose class={buttonVariants({ variant: 'ghost' })}>Cancel</AlertDialogClose>
      <AlertDialogAction>Okay</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogPopup>
</AlertDialog>
