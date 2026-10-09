import type { Booking, BookingAttendee } from './mock-bookings-data';
import { isBookingAttendee, isBookingHost, mockLoggedInUserId } from './mock-session';

export type BookingListingStatus = 'upcoming' | 'past' | 'cancelled' | 'unconfirmed' | 'recurring';

export type DisableScope = 'HOST_AND_ATTENDEE' | 'ATTENDEE_ONLY';

export type BookingActionId =
  | 'reschedule'
  | 'reschedule_request'
  | 'change_location'
  | 'add_members'
  | 'view_recordings'
  | 'meeting_session_details'
  | 'no_show'
  | 'report'
  | 'cancel';

export interface BookingActionContext {
  attendeeList: BookingAttendee[];
  booking: Booking;
  isAttendee: boolean;
  isBookingInPast: boolean;
  isCalVideoLocation: boolean;
  isCancelled: boolean;
  isConfirmed: boolean;
  isDisabledCancelling: boolean;
  isDisabledRescheduling: boolean;
  isHost: boolean;
  isOngoing: boolean;
  isPending: boolean;
  isRecurring: boolean;
  isRejected: boolean;
  isTabRecurring: boolean;
  isUpcoming: boolean;
  listingStatus: BookingListingStatus;
}

export function isActionDisabledByScope({
  disableFlag,
  isHost,
  scope
}: {
  disableFlag: boolean | null | undefined;
  isHost: boolean;
  scope: DisableScope | null | undefined;
}): boolean {
  if (!disableFlag) {
    return false;
  }

  if (scope === 'ATTENDEE_ONLY' && isHost) {
    return false;
  }

  return true;
}

export function isWithinMinimumRescheduleNotice(
  bookingStartTime: Date | null,
  minimumRescheduleNotice: number | null
): boolean {
  if (!minimumRescheduleNotice || minimumRescheduleNotice <= 0 || !bookingStartTime) {
    return false;
  }

  const now = Date.now();
  const timeUntilBooking = bookingStartTime.getTime() - now;
  const minimumRescheduleNoticeMs = minimumRescheduleNotice * 60 * 1000;

  return timeUntilBooking > 0 && timeUntilBooking < minimumRescheduleNoticeMs;
}

export function createBookingActionContext({
  attendeeList,
  booking,
  listingStatus,
  userId = mockLoggedInUserId
}: {
  attendeeList: BookingAttendee[];
  booking: Booking;
  listingStatus: BookingListingStatus;
  userId?: number;
}): BookingActionContext {
  const now = new Date();
  const isUpcoming = booking.endTime >= now;
  const isOngoing = isUpcoming && now >= booking.startTime;
  const isBookingInPast = booking.endTime < now;
  const isCancelled = booking.status === 'CANCELLED';
  const isConfirmed = booking.status === 'ACCEPTED';
  const isRejected = booking.status === 'REJECTED';
  const isPending = booking.status === 'PENDING';
  const isRecurring = booking.recurringEventId !== null;
  const isTabRecurring = listingStatus === 'recurring';
  const isHost = isBookingHost(booking, userId);
  const isAttendee = isBookingAttendee(booking, userId);
  const eventType = booking.eventType;
  const location = booking.location ?? '';

  return {
    attendeeList,
    booking,
    isAttendee,
    isBookingInPast,
    isCalVideoLocation: !location || location === 'integrations:daily' || location.trim() === '',
    isCancelled,
    isConfirmed,
    isDisabledCancelling: isActionDisabledByScope({
      disableFlag: eventType?.disableCancelling,
      isHost,
      scope: eventType?.disableCancellingScope ?? 'HOST_AND_ATTENDEE'
    }),
    isDisabledRescheduling: isActionDisabledByScope({
      disableFlag: eventType?.disableRescheduling,
      isHost,
      scope: eventType?.disableReschedulingScope ?? 'HOST_AND_ATTENDEE'
    }),
    isHost,
    isOngoing,
    isPending,
    isRecurring,
    isRejected,
    isTabRecurring,
    isUpcoming,
    listingStatus
  };
}

export function isActionDisabled(
  actionId: BookingActionId,
  context: BookingActionContext
): boolean {
  const {
    booking,
    isBookingInPast,
    isCalVideoLocation,
    isCancelled,
    isConfirmed,
    isDisabledCancelling,
    isDisabledRescheduling,
    isHost,
    isOngoing,
    isRejected
  } = context;
  const eventType = booking.eventType;

  switch (actionId) {
    case 'reschedule':
    case 'reschedule_request': {
      const isWithinMinimumNotice =
        !isHost &&
        isWithinMinimumRescheduleNotice(
          booking.startTime,
          eventType?.minimumRescheduleNotice ?? null
        );

      return (
        isCancelled ||
        isRejected ||
        (isBookingInPast && !eventType?.allowReschedulingPastBookings) ||
        isDisabledRescheduling ||
        isWithinMinimumNotice
      );
    }
    case 'cancel':
      return isDisabledCancelling || isBookingInPast || isCancelled || isRejected;
    case 'view_recordings':
      return !(isBookingInPast && isConfirmed && isCalVideoLocation);
    case 'meeting_session_details':
      return !(isBookingInPast && isConfirmed && isCalVideoLocation);
    case 'change_location':
    case 'add_members':
      return isBookingInPast || isCancelled || isRejected;
    case 'no_show':
      return !(isBookingInPast || isOngoing) || !isConfirmed;
    case 'report':
      return booking.report !== null;
    default:
      return false;
  }
}

export function isRescheduleRequestDisabled(context: BookingActionContext): boolean {
  const { booking, isHost } = context;
  const bookingBelongsToTeam = !!booking.eventType?.teamId;

  return (
    (!isHost && !bookingBelongsToTeam) ||
    isActionDisabled('reschedule_request', context) ||
    booking.seatsReferences.length > 0
  );
}

export function getNoShowActionLabel(attendeeList: BookingAttendee[]): string {
  if (attendeeList.length === 1 && attendeeList[0]?.noShow) {
    return 'Unmark as no-show';
  }

  return 'Mark as no-show';
}

export function shouldShowNoShowAttendeeMenu(attendeeList: BookingAttendee[]): boolean {
  return attendeeList.length > 1;
}

export function shouldShowEditActions(context: BookingActionContext): boolean {
  const { isCancelled, isPending, isRecurring, isTabRecurring } = context;

  return !isPending && !(isTabRecurring && isRecurring) && !isCancelled;
}

export function shouldShowIndividualReportButton(context: BookingActionContext): boolean {
  const { booking, isCancelled, isPending, isRejected, isUpcoming } = context;

  return (
    !booking.report &&
    !shouldShowEditActions(context) &&
    (isCancelled || isRejected || (isPending && isUpcoming))
  );
}
