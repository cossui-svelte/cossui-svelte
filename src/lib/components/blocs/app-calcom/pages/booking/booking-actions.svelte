<script lang="ts">
  import CalendarClockIcon from '@lucide/svelte/icons/calendar-clock';
  import CheckIcon from '@lucide/svelte/icons/check';
  import CirclePlayIcon from '@lucide/svelte/icons/circle-play';
  import CircleXIcon from '@lucide/svelte/icons/circle-x';
  import EllipsisIcon from '@lucide/svelte/icons/ellipsis';
  import EyeIcon from '@lucide/svelte/icons/eye';
  import EyeOffIcon from '@lucide/svelte/icons/eye-off';
  import FlagIcon from '@lucide/svelte/icons/flag';
  import InfoIcon from '@lucide/svelte/icons/info';
  import MapPinIcon from '@lucide/svelte/icons/map-pin';
  import UserPlusIcon from '@lucide/svelte/icons/user-plus';
  import XIcon from '@lucide/svelte/icons/x';
  import { Button, buttonVariants } from '#lib/components/ui/button/index.js';
  import {
    Drawer,
    DrawerClose,
    DrawerMenu,
    DrawerMenuCheckboxItem,
    DrawerMenuGroup,
    DrawerMenuGroupLabel,
    DrawerMenuSeparator,
    DrawerPanel,
    DrawerPopup,
    DrawerTrigger,
    drawerMenuItemClass
  } from '#lib/components/ui/drawer/index.js';
  import { Group, GroupSeparator } from '#lib/components/ui/group/index.js';
  import {
    Menu,
    MenuCheckboxItem,
    MenuGroup,
    MenuGroupLabel,
    MenuItem,
    MenuPopup,
    MenuSeparator,
    MenuSub,
    MenuSubPopup,
    MenuSubTrigger,
    MenuTrigger
  } from '#lib/components/ui/menu/index.js';
  import { Tooltip, TooltipPopup, TooltipTrigger } from '#lib/components/ui/tooltip/index.js';
  import {
    type BookingListingStatus,
    createBookingActionContext,
    getNoShowActionLabel,
    isActionDisabled,
    isRescheduleRequestDisabled,
    shouldShowEditActions,
    shouldShowIndividualReportButton,
    shouldShowNoShowAttendeeMenu
  } from '../../lib/booking-action-rules.js';
  import type { Booking, BookingAttendee } from '../../lib/mock-bookings-data.js';

  type Props = {
    attendees: BookingAttendee[];
    booking: Booking;
    isRecurring?: boolean;
    listingStatus: BookingListingStatus;
    showPendingActions?: boolean;
  };

  let {
    attendees = $bindable(),
    booking,
    isRecurring,
    listingStatus,
    showPendingActions
  }: Props = $props();

  const actionContext = $derived(
    createBookingActionContext({
      attendeeList: attendees,
      booking,
      listingStatus
    })
  );

  const showEditActions = $derived(shouldShowEditActions(actionContext));
  const showStandaloneReport = $derived(shouldShowIndividualReportButton(actionContext));
  const hasStandaloneActions = $derived(showPendingActions);

  const disabled = $derived({
    addGuests: isActionDisabled('add_members', actionContext),
    cancel: isActionDisabled('cancel', actionContext),
    changeLocation: isActionDisabled('change_location', actionContext),
    meetingSessionDetails: isActionDisabled('meeting_session_details', actionContext),
    noShow: isActionDisabled('no_show', actionContext),
    report: isActionDisabled('report', actionContext),
    requestReschedule: isRescheduleRequestDisabled(actionContext),
    reschedule: isActionDisabled('reschedule', actionContext),
    viewRecordings: isActionDisabled('view_recordings', actionContext)
  });

  const noShowLabel = $derived(getNoShowActionLabel(attendees));
  const singleAttendee = $derived(attendees.length === 1);
  const showAttendeeMenu = $derived(shouldShowNoShowAttendeeMenu(attendees));
  const NoShowIcon = $derived(singleAttendee && attendees[0]?.noShow ? EyeIcon : EyeOffIcon);

  function toggleAttendeeNoShow(email: string) {
    attendees = attendees.map((attendee) =>
      attendee.email === email ? { ...attendee, noShow: !attendee.noShow } : attendee
    );
  }

  function toggleSingleAttendeeNoShow() {
    const attendee = attendees[0];
    if (!attendee) {
      return;
    }

    toggleAttendeeNoShow(attendee.email);
  }

  // Menu (desktop)
  const showCancelAllRemaining = $derived(isRecurring);
  const showCancelEvent = $derived(showEditActions && !isRecurring);
  const showCancel = $derived(showCancelAllRemaining || showCancelEvent);

  // Drawer (mobile)
  const drawerShowReject = $derived(showPendingActions);
  const drawerShowConfirm = $derived(showPendingActions);
  const drawerShowCancelAllRemaining = $derived(showEditActions && isRecurring);
  const drawerShowCancelEvent = $derived(showEditActions && !isRecurring);
  const hasBottomGroup = $derived(
    drawerShowReject || drawerShowConfirm || drawerShowCancelAllRemaining || drawerShowCancelEvent
  );
</script>

{#snippet tooltipIconButton(Icon: typeof XIcon, label: string, variant: 'outline' | 'default')}
  <Tooltip>
    <TooltipTrigger aria-label={label} class={buttonVariants({ size: 'icon', variant })}>
      <Icon />
    </TooltipTrigger>
    <TooltipPopup>{label}</TooltipPopup>
  </Tooltip>
{/snippet}

<div class="relative z-1 flex items-center gap-2">
  {#if hasStandaloneActions}
    <div class="max-md:hidden xl:hidden">
      <Group>
        {@render tooltipIconButton(XIcon, isRecurring ? 'Reject all' : 'Reject', 'outline')}
        <GroupSeparator />
        {@render tooltipIconButton(CheckIcon, isRecurring ? 'Confirm all' : 'Confirm', 'default')}
      </Group>
    </div>
    <div class="hidden items-center gap-2 xl:flex">
      <Button size="xs" variant="outline">{isRecurring ? 'Reject all' : 'Reject'}</Button>
      <Button size="xs">{isRecurring ? 'Confirm all' : 'Confirm'}</Button>
    </div>
  {/if}
  {#if showStandaloneReport}
    <div class="max-md:hidden">
      <Tooltip>
        <TooltipTrigger as="span" class="inline-flex">
          <Button
            aria-label="Report booking"
            disabled={disabled.report}
            size="icon"
            variant="destructive-outline"
          >
            <FlagIcon />
          </Button>
        </TooltipTrigger>
        <TooltipPopup>Report booking</TooltipPopup>
      </Tooltip>
    </div>
  {/if}

  <div class="max-md:hidden">
    <Menu>
      <Tooltip>
        <TooltipTrigger as="span" class="inline-flex">
          <MenuTrigger
            aria-label="Options"
            class={buttonVariants({ size: 'icon', variant: 'outline' })}
          >
            <EllipsisIcon />
          </MenuTrigger>
        </TooltipTrigger>
        <TooltipPopup>Options</TooltipPopup>
      </Tooltip>
      <MenuPopup align="end">
        {#if showEditActions}
          <MenuGroup>
            <MenuGroupLabel>Edit event</MenuGroupLabel>
            <MenuItem disabled={disabled.reschedule}>
              <CalendarClockIcon />
              Reschedule booking
            </MenuItem>
            <MenuItem disabled={disabled.requestReschedule}>
              <CalendarClockIcon />
              Request reschedule
            </MenuItem>
            <MenuItem disabled={disabled.changeLocation}>
              <MapPinIcon />
              Edit location
            </MenuItem>
            <MenuItem disabled={disabled.addGuests}>
              <UserPlusIcon />
              Add guests
            </MenuItem>
          </MenuGroup>
          <MenuSeparator />
        {/if}
        <MenuGroup>
          <MenuGroupLabel>After event</MenuGroupLabel>
          <MenuItem disabled={disabled.viewRecordings}>
            <CirclePlayIcon />
            View recordings
          </MenuItem>
          <MenuItem disabled={disabled.meetingSessionDetails}>
            <InfoIcon />
            View Session Details
          </MenuItem>
          {#if showAttendeeMenu}
            <MenuSub>
              <MenuSubTrigger disabled={disabled.noShow}>
                <EyeOffIcon />
                Mark as no-show
              </MenuSubTrigger>
              <MenuSubPopup>
                {#each attendees as attendee (attendee.email)}
                  <MenuCheckboxItem
                    checked={attendee.noShow ?? false}
                    disabled={disabled.noShow}
                    onCheckedChange={() => toggleAttendeeNoShow(attendee.email)}
                  >
                    {attendee.name}
                  </MenuCheckboxItem>
                {/each}
              </MenuSubPopup>
            </MenuSub>
          {:else}
            <MenuItem disabled={disabled.noShow} onclick={toggleSingleAttendeeNoShow}>
              <NoShowIcon />
              {noShowLabel}
            </MenuItem>
          {/if}
        </MenuGroup>
        <MenuSeparator />
        <MenuGroup>
          <MenuItem disabled={disabled.report} variant="destructive">
            <FlagIcon />
            Report booking
          </MenuItem>
        </MenuGroup>
        {#if showCancel}
          <MenuSeparator />
          <MenuGroup>
            <MenuItem disabled={disabled.cancel} variant="destructive">
              <CircleXIcon />
              {showCancelAllRemaining ? 'Cancel all remaining' : 'Cancel event'}
            </MenuItem>
          </MenuGroup>
        {/if}
      </MenuPopup>
    </Menu>
  </div>

  <div class="md:hidden">
    <Drawer>
      <DrawerTrigger
        aria-label="Options"
        class={buttonVariants({ size: 'icon', variant: 'outline' })}
      >
        <EllipsisIcon aria-hidden="true" />
      </DrawerTrigger>
      <DrawerPopup showBar>
        <DrawerPanel>
          <DrawerMenu>
            {#if showEditActions}
              <DrawerMenuGroup>
                <DrawerMenuGroupLabel>Edit event</DrawerMenuGroupLabel>
                <DrawerClose class={drawerMenuItemClass} disabled={disabled.reschedule}>
                  <CalendarClockIcon aria-hidden="true" />
                  Reschedule booking
                </DrawerClose>
                <button
                  class={drawerMenuItemClass}
                  data-variant="default"
                  disabled={disabled.requestReschedule}
                  type="button"
                >
                  <CalendarClockIcon aria-hidden="true" />
                  Request reschedule
                </button>
                <DrawerClose class={drawerMenuItemClass} disabled={disabled.changeLocation}>
                  <MapPinIcon aria-hidden="true" />
                  Edit location
                </DrawerClose>
                <DrawerClose class={drawerMenuItemClass} disabled={disabled.addGuests}>
                  <UserPlusIcon aria-hidden="true" />
                  Add guests
                </DrawerClose>
              </DrawerMenuGroup>
              <DrawerMenuSeparator />
            {/if}
            <DrawerMenuGroup>
              <DrawerMenuGroupLabel>After event</DrawerMenuGroupLabel>
              <button
                class={drawerMenuItemClass}
                data-variant="default"
                disabled={disabled.viewRecordings}
                type="button"
              >
                <CirclePlayIcon aria-hidden="true" />
                View recordings
              </button>
              <DrawerClose class={drawerMenuItemClass} disabled={disabled.meetingSessionDetails}>
                <InfoIcon aria-hidden="true" />
                View Session Details
              </DrawerClose>
              {#if showAttendeeMenu}
                <DrawerMenuGroupLabel>Mark as no-show</DrawerMenuGroupLabel>
                {#each attendees as attendee (attendee.email)}
                  <DrawerMenuCheckboxItem
                    checked={attendee.noShow ?? false}
                    disabled={disabled.noShow}
                    onCheckedChange={() => toggleAttendeeNoShow(attendee.email)}
                  >
                    {attendee.name}
                  </DrawerMenuCheckboxItem>
                {/each}
              {:else}
                <DrawerClose
                  class={drawerMenuItemClass}
                  disabled={disabled.noShow}
                  onclick={toggleSingleAttendeeNoShow}
                >
                  <NoShowIcon aria-hidden="true" />
                  {noShowLabel}
                </DrawerClose>
              {/if}
            </DrawerMenuGroup>
            <DrawerMenuSeparator />
            <DrawerClose
              class={drawerMenuItemClass}
              data-variant="destructive"
              disabled={disabled.report}
            >
              <FlagIcon aria-hidden="true" />
              Report booking
            </DrawerClose>
            {#if hasBottomGroup}
              <DrawerMenuSeparator />
              <DrawerMenuGroup>
                {#if drawerShowReject}
                  <DrawerClose class={drawerMenuItemClass}>
                    <XIcon aria-hidden="true" />
                    {isRecurring ? 'Reject all' : 'Reject'}
                  </DrawerClose>
                {/if}
                {#if drawerShowConfirm}
                  <DrawerClose class={drawerMenuItemClass}>
                    <CheckIcon aria-hidden="true" />
                    {isRecurring ? 'Confirm all' : 'Confirm'}
                  </DrawerClose>
                {/if}
                {#if drawerShowCancelAllRemaining}
                  <DrawerClose
                    class={drawerMenuItemClass}
                    data-variant="destructive"
                    disabled={disabled.cancel}
                  >
                    <CircleXIcon aria-hidden="true" />
                    Cancel all remaining
                  </DrawerClose>
                {/if}
                {#if drawerShowCancelEvent}
                  <DrawerClose
                    class={drawerMenuItemClass}
                    data-variant="destructive"
                    disabled={disabled.cancel}
                  >
                    <CircleXIcon aria-hidden="true" />
                    Cancel event
                  </DrawerClose>
                {/if}
              </DrawerMenuGroup>
            {/if}
          </DrawerMenu>
        </DrawerPanel>
      </DrawerPopup>
    </Drawer>
  </div>
</div>
