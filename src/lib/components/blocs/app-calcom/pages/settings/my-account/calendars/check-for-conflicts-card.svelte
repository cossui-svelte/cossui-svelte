<script lang="ts">
  import PlusIcon from '@lucide/svelte/icons/plus';
  import {
    AlertDialog,
    AlertDialogClose,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogPopup,
    AlertDialogTitle
  } from '#lib/components/ui/alert-dialog/index.js';
  import { Button, buttonVariants } from '#lib/components/ui/button/index.js';
  import {
    Card,
    CardFrame,
    CardFrameAction,
    CardFrameDescription,
    CardFrameHeader,
    CardFrameTitle,
    CardPanel
  } from '#lib/components/ui/card/index.js';
  import CalendarAccountBlock, { type CalendarAccount } from './calendar-account-block.svelte';

  const calendarAccounts: CalendarAccount[] = [
    {
      calendars: [
        { label: 'example@cal.com', value: 'example' },
        { label: 'Team', value: 'team' }
      ],
      email: 'example@cal.com',
      showMenu: false
    },
    {
      calendars: [{ label: 'example2@gmail.com', value: 'gmail' }],
      email: 'example2@gmail.com',
      showMenu: true
    }
  ];

  let accounts = $state(calendarAccounts);
  let removeDialogOpen = $state(false);
  let accountToRemove = $state<CalendarAccount | null>(null);

  function handleRemoveClick(account: CalendarAccount) {
    accountToRemove = account;
    removeDialogOpen = true;
  }

  function handleRemoveConfirm() {
    if (!accountToRemove) return;
    const email = accountToRemove.email;
    accounts = accounts.filter((a) => a.email !== email);
    removeDialogOpen = false;
    accountToRemove = null;
  }

  function handleRemoveDialogOpenChange(open: boolean) {
    removeDialogOpen = open;
    if (!open) accountToRemove = null;
  }
</script>

<CardFrame>
  <CardFrameHeader>
    <CardFrameTitle>Check for conflicts</CardFrameTitle>
    <CardFrameDescription>
      Select which calendars you want to check for conflicts to prevent double bookings.
    </CardFrameDescription>
    <CardFrameAction>
      <Button variant="outline">
        <PlusIcon />
        Add
      </Button>
    </CardFrameAction>
  </CardFrameHeader>

  <Card>
    <CardPanel class="p-0!">
      {#each accounts as account (account.email)}
        <CalendarAccountBlock {account} onRemoveClick={handleRemoveClick} />
      {/each}
    </CardPanel>
  </Card>
</CardFrame>

<AlertDialog bind:open={removeDialogOpen} onOpenChange={handleRemoveDialogOpenChange}>
  <AlertDialogPopup>
    <AlertDialogHeader>
      <AlertDialogTitle>Remove app</AlertDialogTitle>
      <AlertDialogDescription>Are you sure you want to remove this app?</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogClose class={buttonVariants({ variant: 'ghost' })}>Cancel</AlertDialogClose>
      <AlertDialogClose
        class={buttonVariants({ variant: 'destructive' })}
        onclick={handleRemoveConfirm}
      >
        Remove app
      </AlertDialogClose>
    </AlertDialogFooter>
  </AlertDialogPopup>
</AlertDialog>
