import type { Booking } from '../../lib/mock-bookings-data.js';

export type MeetingTimezoneEntry = {
  dayOffset: number;
  endTime: string;
  startTime: string;
  timeZone: string;
};

export function getMeetingTimezoneEntries(
  booking: Booking,
  userTimeZone: string
): MeetingTimezoneEntry[] {
  if (booking.attendees.length === 0) {
    return [];
  }

  const uniqueTimezones = [
    userTimeZone,
    ...booking.attendees.map((attendee) => attendee.timeZone)
  ].filter((timeZone, index, timeZones) => timeZones.indexOf(timeZone) === index);

  if (uniqueTimezones.length <= 1) {
    return [];
  }

  const referenceDateKey = getDateKeyInTimezone(booking.startTime, userTimeZone);

  return uniqueTimezones.map((timeZone) => {
    const dateKey = getDateKeyInTimezone(booking.startTime, timeZone);
    let dayOffset = 0;

    if (dateKey > referenceDateKey) {
      dayOffset = 1;
    } else if (dateKey < referenceDateKey) {
      dayOffset = -1;
    }

    return {
      dayOffset,
      endTime: formatTimeInTimezone(booking.endTime, timeZone),
      startTime: formatTimeInTimezone(booking.startTime, timeZone),
      timeZone
    };
  });
}

function formatTimeInTimezone(date: Date, timeZone: string): string {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    hour12: true,
    minute: '2-digit',
    timeZone
  });
}

function getDateKeyInTimezone(date: Date, timeZone: string): string {
  return date.toLocaleDateString('en-CA', { timeZone });
}

export function getAssignmentReasonLabel(reasonString: string): string {
  if (/round robin/i.test(reasonString)) {
    return 'Round robin';
  }

  return 'Assigned';
}

export function getBookingMetadataNumber(booking: Booking, key: string) {
  const value = booking.metadata?.[key];
  return typeof value === 'number' ? value : null;
}

export const recurringDatesPreview = [
  { completed: true, label: '5:01pm - 8 May 2026' },
  { completed: true, label: '5:01pm - 15 May 2026' },
  { completed: false, label: '5:01pm - 22 May 2026' },
  { completed: false, label: '5:01pm - 29 May 2026' },
  { completed: false, label: '5:01pm - 5 June 2026' },
  { completed: false, label: '5:01pm - 12 June 2026' }
];
