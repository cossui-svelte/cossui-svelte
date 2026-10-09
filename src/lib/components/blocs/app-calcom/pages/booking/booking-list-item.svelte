<script lang="ts">
  import BanknoteIcon from '@lucide/svelte/icons/banknote';
  import SendIcon from '@lucide/svelte/icons/send';
  import VideoIcon from '@lucide/svelte/icons/video';
  import { untrack } from 'svelte';
  import { Badge, badgeVariants } from '#lib/components/ui/badge/index.js';
  import { Button } from '#lib/components/ui/button/index.js';
  import { Tooltip, TooltipPopup, TooltipTrigger } from '#lib/components/ui/tooltip/index.js';
  import { cn } from '#lib/utils.js';
  import {
    ItemLabel,
    ListItem,
    ListItemActions,
    ListItemBadges,
    ListItemContent,
    ListItemDescription,
    ListItemHeader,
    ListItemSpanningTrigger,
    ListItemTitle
  } from '../../components/list-item/index.js';
  import type { BookingListingStatus } from '../../lib/booking-action-rules.js';
  import {
    type Booking,
    formatBookingDate,
    formatBookingTime,
    getBookingParticipants,
    getLocationLabel
  } from '../../lib/mock-bookings-data.js';
  import BookingActions from './booking-actions.svelte';
  import { getAssignmentReasonLabel, getBookingMetadataNumber } from './booking-timezones.js';
  import MeetingTimeInTimezonesPopover from './meeting-time-in-timezones-popover.svelte';
  import RecurringDatesPopover from './recurring-dates-popover.svelte';
  import RescheduledBadge from './rescheduled-badge.svelte';

  let { booking, listingStatus }: { booking: Booking; listingStatus: BookingListingStatus } =
    $props();

  const dateStr = $derived(formatBookingDate(booking.startTime, booking.endTime));
  const timeStr = $derived(formatBookingTime(booking.startTime, booking.endTime));
  const participants = $derived(getBookingParticipants(booking));
  const locationLabel = $derived(getLocationLabel(booking.location));
  const eventTypeColorLight = $derived(booking.eventType?.eventTypeColor?.lightEventTypeColor);
  const eventTypeColorDark = $derived(booking.eventType?.eventTypeColor?.darkEventTypeColor);
  const isCancelled = $derived(booking.status === 'CANCELLED');
  const isPending = $derived(booking.status === 'PENDING');
  const isRejected = $derived(booking.status === 'REJECTED');
  const isTabRecurring = $derived(listingStatus === 'recurring');
  const isRescheduled = $derived(booking.fromReschedule !== null);
  const recurringEventsRemaining = $derived(
    getBookingMetadataNumber(booking, 'recurringEventsRemaining')
  );
  const assignmentReason = $derived(booking.assignmentReason.at(-1));
  const showRejected = $derived(
    isRejected && !isRescheduled && booking.assignmentReason.length === 0
  );
  const showRecurringDates = $derived(
    (listingStatus === 'recurring' ||
      listingStatus === 'unconfirmed' ||
      listingStatus === 'cancelled') &&
      booking.recurringEventId !== null &&
      typeof recurringEventsRemaining === 'number'
  );
  const teamName = $derived(booking.eventType?.team?.name);
  const showPendingPayment = $derived(
    (booking.eventType?.price ?? 0) > 0 && !booking.payment.some((payment) => payment.success)
  );
  const showPaidBadge = $derived(
    booking.paid && booking.payment.some((payment) => payment.success)
  );
  const showPaymentError = $derived(booking.paid && booking.payment.length === 0);
  const paidLabel = $derived(booking.payment[0]?.paymentOption === 'HOLD' ? 'Card held' : 'Paid');
  const showJoinLink = $derived(
    listingStatus === 'upcoming' && !isPending && !isCancelled && !isRejected && locationLabel
  );
  const showRescheduleRequestSentBadge = $derived(isCancelled && booking.rescheduled);
  let attendees = $state(untrack(() => booking.attendees));
</script>

<ListItem>
  <ItemLabel
    colorDark={eventTypeColorDark ?? undefined}
    colorLight={eventTypeColorLight ?? undefined}
  />
  <div class="flex min-w-0 flex-1 flex-col gap-3 md:flex-row md:gap-4">
    <ListItemContent>
      <ListItemHeader>
        <ListItemTitle class="space-x-2">
          <ListItemSpanningTrigger class={cn(isCancelled && 'line-through')}>
            {#snippet child({ props })}
              <!-- svelte-ignore a11y_invalid_attribute -->
              <a {...props} href="#" onclick={(event) => event.preventDefault()}>
                {booking.title}
              </a>
            {/snippet}
          </ListItemSpanningTrigger>
          {#if showRescheduleRequestSentBadge}
            <span class="inline-flex h-lh items-center align-bottom">
              <Badge class="pointer-events-none" variant="secondary">
                <SendIcon aria-hidden="true" />
                Reschedule request sent
              </Badge>
            </span>
          {/if}
          {#if showPendingPayment}
            <span class="inline-flex h-lh items-center align-bottom">
              <Badge class="pointer-events-none" variant="warning">
                <BanknoteIcon aria-hidden="true" />
                Pending payment
              </Badge>
            </span>
          {/if}
        </ListItemTitle>
        {#if participants}
          <ListItemDescription>{participants}</ListItemDescription>
        {/if}
        {#if booking.description}
          <ListItemDescription class="line-clamp-2">
            {booking.description}
          </ListItemDescription>
        {/if}
      </ListItemHeader>

      <ListItemBadges>
        {#if isPending}
          <Badge class="pointer-events-none" variant="warning">Unconfirmed</Badge>
        {/if}
        {#if isRescheduled}
          <RescheduledBadge {booking} />
        {/if}
        {#if showRejected}
          <Badge class="pointer-events-none" variant="secondary">Rejected</Badge>
        {/if}
        {#if teamName}
          <Badge class="pointer-events-none" variant="outline">
            {teamName}
          </Badge>
        {/if}
        {#if assignmentReason}
          <Tooltip>
            <TooltipTrigger
              class={cn(badgeVariants({ variant: 'outline' }), 'pointer-events-none')}
              data-slot="badge"
            >
              {getAssignmentReasonLabel(assignmentReason.reasonString)}
            </TooltipTrigger>
            <TooltipPopup>{assignmentReason.reasonString}</TooltipPopup>
          </Tooltip>
        {/if}
        {#if booking.report}
          <Tooltip>
            <TooltipTrigger
              class={cn(badgeVariants({ variant: 'error' }), 'pointer-events-none')}
              data-slot="badge"
            >
              Reported
            </TooltipTrigger>
            <TooltipPopup>
              {booking.report.description
                ? `${booking.report.reason}: ${booking.report.description}`
                : booking.report.reason}
            </TooltipPopup>
          </Tooltip>
        {/if}
        {#if showPaymentError}
          <Badge class="pointer-events-none" variant="warning">Error collecting card</Badge>
        {/if}
        {#if showPaidBadge}
          <Badge class="pointer-events-none" variant="success">
            {paidLabel}
          </Badge>
        {/if}
        {#if showRecurringDates && typeof recurringEventsRemaining === 'number'}
          <RecurringDatesPopover count={recurringEventsRemaining} />
        {/if}
      </ListItemBadges>
    </ListItemContent>

    <div class="flex flex-col items-start gap-2 md:-order-1 md:w-40 md:shrink-0">
      <div class="flex w-full min-w-0 flex-col items-start gap-1">
        <p class="font-medium text-sm">{dateStr}</p>
        <MeetingTimeInTimezonesPopover {booking} {timeStr} />
      </div>
      {#if showJoinLink}
        <Button
          class="pointer-events-auto min-w-0 max-w-full whitespace-normal"
          href="#join"
          onclick={(event: MouseEvent) => event.preventDefault()}
          size="xs"
          title={locationLabel}
          variant="outline"
        >
          <VideoIcon />
          <span class="truncate">{locationLabel}</span>
        </Button>
      {/if}
    </div>
  </div>

  <ListItemActions>
    <BookingActions
      bind:attendees
      {booking}
      isRecurring={isTabRecurring}
      {listingStatus}
      showPendingActions={isPending}
    />
  </ListItemActions>
</ListItem>
