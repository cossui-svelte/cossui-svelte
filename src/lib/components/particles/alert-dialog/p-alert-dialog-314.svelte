<script lang="ts">
  import CircleAlertIcon from '@lucide/svelte/icons/circle-alert';
  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogClose,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogPopup,
    AlertDialogTitle,
    AlertDialogTrigger
  } from '$lib/components/ui/alert-dialog';
  import { buttonVariants } from '$lib/components/ui/button';
</script>

<AlertDialog>
  <AlertDialogTrigger class={buttonVariants({ variant: 'outline' })}>
    Alert dialog with icon
  </AlertDialogTrigger>
  <AlertDialogPopup>
    <div class="flex flex-col gap-2 px-6 pt-6 max-sm:items-center sm:flex-row sm:gap-4">
      <AlertDialogMedia
        class="flex size-9 shrink-0 items-center justify-center rounded-full border"
      >
        <CircleAlertIcon class="opacity-80" size={16} />
      </AlertDialogMedia>
      <AlertDialogHeader class="p-0">
        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to delete your account? All your data will be removed.
        </AlertDialogDescription>
      </AlertDialogHeader>
    </div>
    <AlertDialogFooter>
      <AlertDialogClose class={buttonVariants({ variant: 'ghost' })}>Cancel</AlertDialogClose>
      <AlertDialogAction>Confirm</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogPopup>
</AlertDialog>
