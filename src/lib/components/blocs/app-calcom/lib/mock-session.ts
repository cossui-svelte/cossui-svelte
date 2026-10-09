import type { Booking } from './mock-bookings-data';

/** Prototype stand-in for the authenticated Cal.com user (Pasquale Vitiello). */
export const mockLoggedInUserId = 1;

const mockUserEmails: Record<number, string> = {
  1: 'pasquale@cal.com',
  2: 'keith@cal.com',
  3: 'peer@cal.com'
};

export function getMockUserEmail(userId = mockLoggedInUserId): string | null {
  return mockUserEmails[userId] ?? null;
}

export function isBookingHost(booking: Booking, userId = mockLoggedInUserId): boolean {
  if (booking.user?.id === userId) {
    return true;
  }

  return booking.eventType?.hosts.some((host) => host.userId === userId) ?? false;
}

export function isBookingAttendee(booking: Booking, userId = mockLoggedInUserId): boolean {
  if (isBookingHost(booking, userId)) {
    return false;
  }

  const email = getMockUserEmail(userId);
  if (!email) {
    return false;
  }

  return (
    booking.attendees.some((attendee) => attendee.email === email) ||
    booking.seatsReferences.some((seat) => seat.attendee.email === email)
  );
}
