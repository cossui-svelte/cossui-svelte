/**
 * Mock data for bookings that matches Cal.com's data structure.
 * This enables easier integration with the actual Cal.com API later.
 *
 * Based on Cal.com's Booking model from packages/trpc/server/routers/viewer/bookings/get.handler.ts
 */

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export type BookingStatus = 'ACCEPTED' | 'PENDING' | 'CANCELLED' | 'REJECTED' | 'AWAITING_HOST';

export type SchedulingType = 'ROUND_ROBIN' | 'COLLECTIVE' | 'MANAGED' | null;

export interface BookingUser {
  id: number;
  name: string | null;
  email: string;
  avatarUrl: string | null;
  username: string | null;
  timeZone: string;
}

export interface BookingAttendee {
  id: number;
  email: string;
  name: string;
  timeZone: string;
  locale: string | null;
  bookingId: number;
  noShow: boolean | null;
}

export type DisableScope = 'HOST_AND_ATTENDEE' | 'ATTENDEE_ONLY';

export interface BookingEventType {
  id: number;
  slug: string;
  title: string;
  eventName: string | null;
  price: number;
  recurringEvent: {
    freq: number;
    count: number;
    interval: number;
  } | null;
  currency: string;
  metadata: Record<string, unknown> | null;
  disableGuests: boolean;
  bookingFields: unknown[] | null;
  seatsPerTimeSlot: number | null;
  seatsShowAttendees: boolean;
  seatsShowAvailabilityCount: boolean;
  eventTypeColor: {
    lightEventTypeColor: string;
    darkEventTypeColor: string;
  } | null;
  customReplyToEmail: string | null;
  allowReschedulingPastBookings: boolean;
  hideOrganizerEmail: boolean;
  disableCancelling: boolean;
  disableCancellingScope: DisableScope;
  disableRescheduling: boolean;
  disableReschedulingScope: DisableScope;
  minimumRescheduleNotice: number;
  teamId: number | null;
  parentId: number | null;
  schedulingType: SchedulingType;
  hosts: {
    userId: number;
    user: {
      id: number;
      email: string;
    };
  }[];
  length: number;
  team: {
    id: number;
    name: string;
    slug: string;
  } | null;
  hostGroups: {
    id: number;
    name: string;
  }[];
}

export interface BookingReference {
  id: number;
  type: string;
  uid: string;
  meetingId: string | null;
  meetingPassword: string | null;
  meetingUrl: string | null;
  bookingId: number;
  externalCalendarId: string | null;
  deleted: boolean | null;
  credentialId: number | null;
}

export interface BookingPayment {
  paymentOption: string | null;
  amount: number;
  currency: string;
  success: boolean;
  appId: string | null;
  refunded: boolean;
}

export interface BookingSeat {
  referenceUid: string;
  attendee: {
    email: string;
  };
}

export interface AssignmentReason {
  id: number;
  reasonString: string;
  bookingId: number;
  createdAt: Date;
}

export interface BookingReport {
  id: number;
  reportedById: number;
  reason: string;
  description: string | null;
  createdAt: Date;
}

export interface Booking {
  id: number;
  title: string;
  userPrimaryEmail: string | null;
  description: string | null;
  customInputs: Record<string, unknown> | null;
  startTime: Date;
  createdAt: Date;
  updatedAt: Date;
  endTime: Date;
  metadata: Record<string, unknown> | null;
  uid: string;
  responses: Record<string, unknown> | null;
  recurringEventId: string | null;
  location: string | null;
  status: BookingStatus;
  paid: boolean;
  fromReschedule: string | null;
  rescheduled: boolean;
  rescheduledBy: string | null;
  cancelledBy: string | null;
  isRecorded: boolean;
  cancellationReason: string | null;
  rejectionReason: string | null;
  routedFromRoutingFormReponse: { id: number } | null;
  eventType: BookingEventType | null;
  references: BookingReference[];
  payment: BookingPayment[];
  user: BookingUser | null;
  attendees: BookingAttendee[];
  seatsReferences: BookingSeat[];
  assignmentReason: AssignmentReason[];
  report: BookingReport | null;
}

// =============================================================================
// MOCK DATA
// =============================================================================

const userPasquale: BookingUser = {
  avatarUrl: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=72&h=72&dpr=2&q=80',
  email: 'pasquale@cal.com',
  id: 1,
  name: 'Pasquale Vitiello',
  timeZone: 'Europe/Rome',
  username: 'pasquale'
};

const userKeith: BookingUser = {
  avatarUrl: null,
  email: 'keith@cal.com',
  id: 2,
  name: 'Keith Williams',
  timeZone: 'America/Los_Angeles',
  username: 'keith'
};

const userPeer: BookingUser = {
  avatarUrl: 'https://images.unsplash.com/photo-1655874819398-c6dfbec68ac7?w=72&h=72&dpr=2&q=80',
  email: 'peer@cal.com',
  id: 3,
  name: 'Peer Richelsen',
  timeZone: 'Europe/London',
  username: 'peer'
};

const _userCarina: BookingUser = {
  avatarUrl: null,
  email: 'carina@cal.com',
  id: 4,
  name: 'Carina Wollheim',
  timeZone: 'Europe/Berlin',
  username: 'carina'
};

const _userJonathan: BookingUser = {
  avatarUrl: null,
  email: 'jonathan@cal.com',
  id: 5,
  name: 'Jonathan Djalo',
  timeZone: 'Europe/London',
  username: 'jonathan'
};

const _userSusan: BookingUser = {
  avatarUrl: null,
  email: 'susan@example.com',
  id: 6,
  name: 'Susan Moeller',
  timeZone: 'America/New_York',
  username: 'susan'
};

const _userDavid: BookingUser = {
  avatarUrl: null,
  email: 'david@example.com',
  id: 7,
  name: 'David Borenius',
  timeZone: 'Europe/Stockholm',
  username: 'david'
};

const defaultEventType: BookingEventType = {
  allowReschedulingPastBookings: false,
  bookingFields: null,
  currency: 'usd',
  customReplyToEmail: null,
  disableCancelling: false,
  disableCancellingScope: 'HOST_AND_ATTENDEE',
  disableGuests: false,
  disableRescheduling: false,
  disableReschedulingScope: 'HOST_AND_ATTENDEE',
  eventName: null,
  eventTypeColor: null,
  hideOrganizerEmail: false,
  hostGroups: [],
  hosts: [],
  id: 1,
  length: 30,
  metadata: null,
  minimumRescheduleNotice: 0,
  parentId: null,
  price: 0,
  recurringEvent: null,
  schedulingType: null,
  seatsPerTimeSlot: null,
  seatsShowAttendees: false,
  seatsShowAvailabilityCount: false,
  slug: '30min',
  team: null,
  teamId: null,
  title: '30 Min Meeting'
};

const defaultBookingFields = {
  assignmentReason: [],
  cancellationReason: null,
  cancelledBy: null,
  customInputs: null,
  fromReschedule: null,
  isRecorded: false,
  metadata: null,
  paid: false,
  payment: [],
  recurringEventId: null,
  references: [],
  rejectionReason: null,
  report: null,
  rescheduled: false,
  rescheduledBy: null,
  responses: null,
  routedFromRoutingFormReponse: null,
  seatsReferences: []
};

export const mockPastBookings: Booking[] = [
  {
    ...defaultBookingFields,
    attendees: [
      {
        bookingId: 1,
        email: 'keith@cal.com',
        id: 1,
        locale: 'en',
        name: 'Keith Williams',
        noShow: false,
        timeZone: 'America/Los_Angeles'
      },
      {
        bookingId: 1,
        email: 'pasquale@cal.com',
        id: 2,
        locale: 'en',
        name: 'Pasquale Vitiello',
        noShow: false,
        timeZone: 'Europe/Rome'
      }
    ],
    createdAt: new Date('2025-11-20T10:00:00'),
    description: 'Ship-room for the calendar sync patch and open PR queue.',
    endTime: new Date('2025-11-25T15:00:00'),
    eventType: {
      ...defaultEventType,
      id: 10,
      length: 20,
      slug: 'engineering-chat',
      title: 'Engineering Chat'
    },
    id: 1,
    location: 'integrations:daily',
    rescheduled: true,
    startTime: new Date('2025-11-25T14:40:00'),
    status: 'ACCEPTED',
    title: 'Release checklist sync',
    uid: 'abc123-booking-1',
    updatedAt: new Date('2025-11-24T09:30:00'),
    user: userPasquale,
    userPrimaryEmail: 'pasquale@cal.com'
  },
  {
    ...defaultBookingFields,
    attendees: [
      {
        bookingId: 2,
        email: 'carina@cal.com',
        id: 3,
        locale: 'en',
        name: 'Carina Wollheim',
        noShow: false,
        timeZone: 'Europe/Berlin'
      },
      {
        bookingId: 2,
        email: 'jonathan@cal.com',
        id: 4,
        locale: 'en',
        name: 'Jonathan Djalo',
        noShow: false,
        timeZone: 'Europe/London'
      },
      {
        bookingId: 2,
        email: 'pasquale@cal.com',
        id: 5,
        locale: 'en',
        name: 'Pasquale Vitiello',
        noShow: false,
        timeZone: 'Europe/Rome'
      }
    ],
    createdAt: new Date('2025-11-01T14:00:00'),
    description: 'Discussion about the platform onboarding flow and upcoming improvements.',
    endTime: new Date('2025-11-07T12:00:00'),
    eventType: {
      ...defaultEventType,
      eventTypeColor: {
        darkEventTypeColor: '#f53468',
        lightEventTypeColor: '#f53468'
      },
      id: 11,
      slug: 'platform-meeting',
      title: 'Platform Meeting'
    },
    id: 2,
    location: 'integrations:daily',
    rescheduled: false,
    startTime: new Date('2025-11-07T11:30:00'),
    status: 'ACCEPTED',
    title: 'Platform onboarding roadmap',
    uid: 'abc123-booking-2',
    updatedAt: new Date('2025-11-01T14:00:00'),
    user: userPasquale,
    userPrimaryEmail: 'pasquale@cal.com'
  },
  {
    ...defaultBookingFields,
    attendees: [
      {
        bookingId: 3,
        email: 'keith@cal.com',
        id: 6,
        locale: 'en',
        name: 'Keith Williams',
        noShow: false,
        timeZone: 'America/Los_Angeles'
      },
      {
        bookingId: 3,
        email: 'pasquale@cal.com',
        id: 7,
        locale: 'en',
        name: 'Pasquale Vitiello',
        noShow: false,
        timeZone: 'Europe/Rome'
      }
    ],
    createdAt: new Date('2025-11-01T09:00:00'),
    description: null,
    endTime: new Date('2025-11-06T15:20:00'),
    eventType: {
      ...defaultEventType,
      id: 10,
      length: 20,
      slug: 'engineering-chat',
      title: 'Engineering Chat'
    },
    id: 3,
    location: 'integrations:daily',
    rescheduled: false,
    startTime: new Date('2025-11-06T15:00:00'),
    status: 'ACCEPTED',
    title: 'Auth refactor pairing',
    uid: 'abc123-booking-3',
    updatedAt: new Date('2025-11-01T09:00:00'),
    user: userPasquale,
    userPrimaryEmail: 'pasquale@cal.com'
  },
  {
    ...defaultBookingFields,
    attendees: [
      {
        bookingId: 4,
        email: 'susan@example.com',
        id: 8,
        locale: 'en',
        name: 'Elena Muro',
        noShow: false,
        timeZone: 'America/New_York'
      },
      {
        bookingId: 4,
        email: 'pasquale@cal.com',
        id: 9,
        locale: 'en',
        name: 'Pasquale Vitiello',
        noShow: false,
        timeZone: 'Europe/Rome'
      }
    ],
    createdAt: new Date('2025-10-28T11:00:00'),
    description: 'Billing v2 scope — proration rules and dunning.',
    endTime: new Date('2025-11-03T15:30:00'),
    eventType: defaultEventType,
    id: 4,
    location: 'integrations:google_meet',
    rescheduled: false,
    startTime: new Date('2025-11-03T15:00:00'),
    status: 'ACCEPTED',
    title: 'Billing v2 scope pass',
    uid: 'abc123-booking-4',
    updatedAt: new Date('2025-10-28T11:00:00'),
    user: userPasquale,
    userPrimaryEmail: 'pasquale@cal.com'
  },
  {
    ...defaultBookingFields,
    attendees: [
      {
        bookingId: 5,
        email: 'pasquale@cal.com',
        id: 10,
        locale: 'en',
        name: 'Pasquale Vitiello',
        noShow: false,
        timeZone: 'Europe/Rome'
      },
      {
        bookingId: 5,
        email: 'otto@nordvik.io',
        id: 11,
        locale: 'en',
        name: 'Otto Nordvik',
        noShow: false,
        timeZone: 'Europe/Stockholm'
      }
    ],
    createdAt: new Date('2025-10-01T08:00:00'),
    description: 'Channel terms and co-marketing for Nordvik.',
    endTime: new Date('2025-10-13T16:00:00'),
    eventType: defaultEventType,
    id: 5,
    location: 'integrations:google_meet',
    rescheduled: true,
    startTime: new Date('2025-10-13T15:30:00'),
    status: 'ACCEPTED',
    title: 'Nordvik partnership check-in',
    uid: 'abc123-booking-5',
    updatedAt: new Date('2025-10-12T14:00:00'),
    user: userPasquale,
    userPrimaryEmail: 'pasquale@cal.com'
  },
  {
    ...defaultBookingFields,
    attendees: [
      {
        bookingId: 6,
        email: 'peer@cal.com',
        id: 12,
        locale: 'en',
        name: 'Peer Richelsen',
        noShow: false,
        timeZone: 'Europe/London'
      },
      {
        bookingId: 6,
        email: 'keith@cal.com',
        id: 13,
        locale: 'en',
        name: 'Keith Williams',
        noShow: false,
        timeZone: 'America/Los_Angeles'
      },
      {
        bookingId: 6,
        email: 'pasquale@cal.com',
        id: 14,
        locale: 'en',
        name: 'Pasquale Vitiello',
        noShow: false,
        timeZone: 'Europe/Rome'
      }
    ],
    createdAt: new Date('2025-10-05T10:00:00'),
    description: 'Component library cutover plan and breaking changes.',
    endTime: new Date('2025-10-10T17:30:00'),
    eventType: {
      ...defaultEventType,
      id: 12,
      schedulingType: 'COLLECTIVE',
      slug: 'team-meeting',
      team: {
        id: 1,
        name: 'Cal.com',
        slug: 'cal'
      },
      teamId: 1,
      title: 'Team Meeting'
    },
    id: 6,
    location: 'integrations:google_meet',
    rescheduled: false,
    startTime: new Date('2025-10-10T17:00:00'),
    status: 'ACCEPTED',
    title: 'Design system migration',
    uid: 'abc123-booking-6',
    updatedAt: new Date('2025-10-05T10:00:00'),
    user: userPasquale,
    userPrimaryEmail: 'pasquale@cal.com'
  },
  {
    ...defaultBookingFields,
    attendees: [
      {
        bookingId: 7,
        email: 'priya@helixstudio.co',
        id: 15,
        locale: 'en',
        name: 'Priya Narayan',
        noShow: false,
        timeZone: 'America/Los_Angeles'
      }
    ],
    createdAt: new Date('2025-10-01T09:00:00'),
    description: 'Paid office hours — pricing page teardown.',
    endTime: new Date('2025-10-08T14:45:00'),
    eventType: {
      ...defaultEventType,
      eventTypeColor: {
        darkEventTypeColor: '#fd6d06',
        lightEventTypeColor: '#fd6d06'
      },
      id: 5,
      length: 45,
      price: 9900,
      slug: 'paid-consultation',
      title: 'Paid Consultation'
    },
    id: 7,
    location: 'integrations:zoom',
    paid: true,
    payment: [
      {
        amount: 9900,
        appId: 'stripe',
        currency: 'usd',
        paymentOption: 'ON_BOOKING',
        refunded: false,
        success: true
      }
    ],
    rescheduled: false,
    startTime: new Date('2025-10-08T14:00:00'),
    status: 'ACCEPTED',
    title: 'Office hours w/ Priya Narayan',
    uid: 'abc123-booking-7',
    updatedAt: new Date('2025-10-01T09:00:00'),
    user: userPasquale,
    userPrimaryEmail: 'pasquale@cal.com'
  },
  {
    ...defaultBookingFields,
    attendees: [
      {
        bookingId: 8,
        email: 'designer@example.com',
        id: 16,
        locale: 'en',
        name: 'Livia Marsh',
        noShow: null,
        timeZone: 'America/New_York'
      }
    ],
    cancellationReason: 'Schedule conflict - will reschedule for next week.',
    cancelledBy: 'user',
    createdAt: new Date('2025-09-28T15:00:00'),
    description: 'Mobile nav comps — round two feedback.',
    endTime: new Date('2025-10-05T10:30:00'),
    eventType: {
      ...defaultEventType,
      id: 13,
      slug: 'design-review',
      title: 'Design Review'
    },
    id: 8,
    location: 'integrations:daily',
    rescheduled: false,
    startTime: new Date('2025-10-05T10:00:00'),
    status: 'CANCELLED',
    title: 'Mobile nav critique',
    uid: 'abc123-booking-8',
    updatedAt: new Date('2025-10-04T08:00:00'),
    user: userPasquale,
    userPrimaryEmail: 'pasquale@cal.com'
  },
  {
    ...defaultBookingFields,
    attendees: [
      {
        bookingId: 9,
        email: 'team@cal.com',
        id: 17,
        locale: 'en',
        name: 'Marco Bellini',
        noShow: false,
        timeZone: 'Europe/London'
      }
    ],
    createdAt: new Date('2025-09-01T10:00:00'),
    description: 'Standing ops review — incidents and on-call handoff.',
    endTime: new Date('2025-10-02T09:30:00'),
    eventType: {
      ...defaultEventType,
      id: 6,
      recurringEvent: {
        count: 12,
        freq: 2,
        interval: 1
      },
      slug: 'weekly-sync',
      title: 'Weekly Sync'
    },
    id: 9,
    location: 'integrations:daily',
    recurringEventId: 'recurring-abc123',
    rescheduled: false,
    startTime: new Date('2025-10-02T09:00:00'),
    status: 'ACCEPTED',
    title: 'Ops weekly (series)',
    uid: 'abc123-booking-9',
    updatedAt: new Date('2025-09-01T10:00:00'),
    user: userPasquale,
    userPrimaryEmail: 'pasquale@cal.com'
  },
  {
    ...defaultBookingFields,
    assignmentReason: [
      {
        bookingId: 10,
        createdAt: new Date('2025-09-20T11:00:00'),
        id: 1,
        reasonString: 'Round Robin: Assigned based on availability and equal distribution'
      }
    ],
    attendees: [
      {
        bookingId: 10,
        email: 'prospect@company.com',
        id: 18,
        locale: 'en',
        name: 'Sam Whitfield',
        noShow: false,
        timeZone: 'America/Chicago'
      }
    ],
    createdAt: new Date('2025-09-20T11:00:00'),
    description: 'Inbound from trade-show badge scan.',
    endTime: new Date('2025-09-28T16:30:00'),
    eventType: {
      ...defaultEventType,
      eventTypeColor: {
        darkEventTypeColor: '#0dbf82',
        lightEventTypeColor: '#0dbf82'
      },
      hosts: [
        {
          user: { email: 'pasquale@cal.com', id: 1 },
          userId: 1
        },
        {
          user: { email: 'keith@cal.com', id: 2 },
          userId: 2
        }
      ],
      id: 101,
      schedulingType: 'ROUND_ROBIN',
      slug: 'sales-call',
      team: {
        id: 1,
        name: 'Cal.com',
        slug: 'cal'
      },
      teamId: 1,
      title: 'Sales Call'
    },
    id: 10,
    location: 'integrations:zoom',
    rescheduled: false,
    startTime: new Date('2025-09-28T16:00:00'),
    status: 'ACCEPTED',
    title: 'Inbound — Whitfield & Co.',
    uid: 'abc123-booking-10',
    updatedAt: new Date('2025-09-20T11:00:00'),
    user: userPasquale,
    userPrimaryEmail: 'pasquale@cal.com'
  },
  {
    ...defaultBookingFields,
    attendees: [
      {
        bookingId: 11,
        email: 'attendee1@example.com',
        id: 19,
        locale: 'en',
        name: 'Claire Dubois',
        noShow: false,
        timeZone: 'America/New_York'
      },
      {
        bookingId: 11,
        email: 'attendee2@example.com',
        id: 20,
        locale: 'fr',
        name: 'Henri Laurent',
        noShow: false,
        timeZone: 'Europe/Paris'
      }
    ],
    createdAt: new Date('2025-09-10T10:00:00'),
    description: 'Live walkthrough for EU prospects.',
    endTime: new Date('2025-09-25T19:00:00'),
    eventType: {
      ...defaultEventType,
      eventTypeColor: null,
      id: 7,
      length: 60,
      seatsPerTimeSlot: 50,
      seatsShowAttendees: true,
      seatsShowAvailabilityCount: true,
      slug: 'webinar',
      title: 'Webinar'
    },
    id: 11,
    isRecorded: true,
    location: 'integrations:zoom',
    rescheduled: false,
    seatsReferences: [
      { attendee: { email: 'attendee1@example.com' }, referenceUid: 'seat-1' },
      { attendee: { email: 'attendee2@example.com' }, referenceUid: 'seat-2' }
    ],
    startTime: new Date('2025-09-25T18:00:00'),
    status: 'ACCEPTED',
    title: 'Webinar — scheduling at scale',
    uid: 'abc123-booking-11',
    updatedAt: new Date('2025-09-10T10:00:00'),
    user: userPasquale,
    userPrimaryEmail: 'pasquale@cal.com'
  },
  {
    ...defaultBookingFields,
    attendees: [
      {
        bookingId: 12,
        email: 'noshow@example.com',
        id: 21,
        locale: 'en',
        name: 'Tyler Brooks',
        noShow: true,
        timeZone: 'America/Los_Angeles'
      }
    ],
    createdAt: new Date('2025-09-15T09:00:00'),
    description: null,
    endTime: new Date('2025-09-20T11:15:00'),
    eventType: {
      ...defaultEventType,
      id: 1,
      length: 15,
      slug: '15min',
      title: '15 Min Meeting'
    },
    id: 12,
    location: 'integrations:daily',
    rescheduled: false,
    startTime: new Date('2025-09-20T11:00:00'),
    status: 'ACCEPTED',
    title: 'Intro call — Tyler Brooks',
    uid: 'abc123-booking-12',
    updatedAt: new Date('2025-09-20T11:30:00'),
    user: userPasquale,
    userPrimaryEmail: 'pasquale@cal.com'
  },
  {
    ...defaultBookingFields,
    attendees: [
      {
        bookingId: 13,
        email: 'enterprise@example.com',
        id: 22,
        locale: 'en',
        name: 'Renata Vogel',
        noShow: false,
        timeZone: 'America/New_York'
      },
      {
        bookingId: 13,
        email: 'sales@cal.com',
        id: 23,
        locale: 'en',
        name: 'Jonah Pike',
        noShow: false,
        timeZone: 'America/Los_Angeles'
      }
    ],
    createdAt: new Date('2025-09-01T10:00:00'),
    description: 'Enterprise rollout — SSO, SCIM, and seat mapping.',
    endTime: new Date('2025-09-10T16:00:00'),
    eventType: {
      ...defaultEventType,
      eventTypeColor: {
        darkEventTypeColor: '#0dbf82',
        lightEventTypeColor: '#0dbf82'
      },
      id: 20,
      length: 60,
      price: 29900,
      recurringEvent: {
        count: 4,
        freq: 2,
        interval: 1
      },
      schedulingType: 'ROUND_ROBIN',
      slug: 'enterprise-onboarding',
      team: {
        id: 2,
        name: 'Sales Team',
        slug: 'sales'
      },
      teamId: 2,
      title: 'Enterprise Onboarding'
    },
    id: 13,
    location: 'integrations:zoom',
    paid: true,
    payment: [
      {
        amount: 29900,
        appId: 'stripe',
        currency: 'usd',
        paymentOption: 'ON_BOOKING',
        refunded: false,
        success: true
      }
    ],
    recurringEventId: 'recurring-stress-test',
    rescheduled: false,
    startTime: new Date('2025-09-10T15:00:00'),
    status: 'PENDING',
    title: 'Acme rollout — onboarding block',
    uid: 'abc123-booking-13',
    updatedAt: new Date('2025-09-05T14:00:00'),
    user: userPasquale,
    userPrimaryEmail: 'pasquale@cal.com'
  }
];

export const mockUpcomingBookings: Booking[] = [
  {
    ...defaultBookingFields,
    attendees: [
      {
        bookingId: 100,
        email: 'peer@cal.com',
        id: 100,
        locale: 'en',
        name: 'Peer Richelsen',
        noShow: null,
        timeZone: 'Europe/London'
      },
      {
        bookingId: 100,
        email: 'keith@cal.com',
        id: 101,
        locale: 'en',
        name: 'Keith Williams',
        noShow: null,
        timeZone: 'America/Los_Angeles'
      }
    ],
    createdAt: new Date('2026-01-10T10:00:00'),
    description: 'Q1 bets, staffing, and milestone dates.',
    endTime: new Date('2026-01-15T15:00:00'),
    eventType: {
      ...defaultEventType,
      id: 14,
      length: 60,
      schedulingType: 'COLLECTIVE',
      slug: 'product-planning',
      team: {
        id: 1,
        name: 'Cal.com',
        slug: 'cal'
      },
      teamId: 1,
      title: 'Product Planning'
    },
    id: 100,
    location: 'integrations:google_meet',
    rescheduled: false,
    startTime: new Date('2026-01-15T14:00:00'),
    status: 'ACCEPTED',
    title: 'Q1 roadmap working session',
    uid: 'upcoming-booking-1',
    updatedAt: new Date('2026-01-10T10:00:00'),
    user: userPasquale,
    userPrimaryEmail: 'pasquale@cal.com'
  },
  {
    ...defaultBookingFields,
    attendees: [
      {
        bookingId: 101,
        email: 'candidate@example.com',
        id: 102,
        locale: 'en',
        name: 'Rina Okonkwo',
        noShow: null,
        timeZone: 'America/New_York'
      }
    ],
    createdAt: new Date('2026-01-12T09:00:00'),
    description: 'Systems design panel — take-home debrief pending.',
    endTime: new Date('2026-01-20T11:00:00'),
    eventType: {
      ...defaultEventType,
      eventTypeColor: null,
      id: 102,
      length: 60,
      schedulingType: 'COLLECTIVE',
      slug: 'technical-interview',
      team: {
        id: 1,
        name: 'Cal.com',
        slug: 'cal'
      },
      teamId: 1,
      title: 'Technical Interview'
    },
    id: 101,
    location: 'integrations:zoom',
    rescheduled: false,
    startTime: new Date('2026-01-20T10:00:00'),
    status: 'PENDING',
    title: 'Pending — Rina Okonkwo (backend)',
    uid: 'upcoming-booking-2',
    updatedAt: new Date('2026-01-12T09:00:00'),
    user: userPasquale,
    userPrimaryEmail: 'pasquale@cal.com'
  },
  {
    ...defaultBookingFields,
    attendees: [
      {
        bookingId: 102,
        email: 'pasquale@cal.com',
        id: 103,
        locale: 'en',
        name: 'Pasquale Vitiello',
        noShow: null,
        timeZone: 'Europe/Rome'
      },
      {
        bookingId: 102,
        email: 'carina@cal.com',
        id: 104,
        locale: 'en',
        name: 'Carina Wollheim',
        noShow: null,
        timeZone: 'Europe/Berlin'
      }
    ],
    createdAt: new Date('2026-01-18T11:00:00'),
    description: 'Thursday release train and hotfix queue.',
    endTime: new Date('2026-01-25T16:00:00'),
    eventType: {
      ...defaultEventType,
      id: 10,
      length: 30,
      slug: 'engineering-chat',
      title: 'Engineering Chat'
    },
    id: 102,
    location: 'integrations:daily',
    rescheduled: false,
    startTime: new Date('2026-01-25T15:30:00'),
    status: 'ACCEPTED',
    title: 'Release train sync',
    uid: 'upcoming-booking-3',
    updatedAt: new Date('2026-01-18T11:00:00'),
    user: userKeith,
    userPrimaryEmail: 'keith@cal.com'
  },
  {
    ...defaultBookingFields,
    attendees: [
      {
        bookingId: 103,
        email: 'keith@cal.com',
        id: 105,
        locale: 'en',
        name: 'Keith Williams',
        noShow: null,
        timeZone: 'America/Los_Angeles'
      },
      {
        bookingId: 103,
        email: 'jonathan@cal.com',
        id: 106,
        locale: 'en',
        name: 'Jonathan Djalo',
        noShow: null,
        timeZone: 'Europe/London'
      }
    ],
    createdAt: new Date('2026-01-20T09:00:00'),
    description: 'Settings IA — nav density and empty states.',
    endTime: new Date('2026-01-28T12:00:00'),
    eventType: {
      ...defaultEventType,
      eventTypeColor: {
        darkEventTypeColor: '#3b82f6',
        lightEventTypeColor: '#3b82f6'
      },
      id: 15,
      length: 45,
      slug: 'design-review',
      title: 'Design Review'
    },
    id: 103,
    location: 'integrations:google_meet',
    rescheduled: false,
    startTime: new Date('2026-01-28T11:15:00'),
    status: 'ACCEPTED',
    title: 'Settings IA critique',
    uid: 'upcoming-booking-4',
    updatedAt: new Date('2026-01-20T09:00:00'),
    user: userPeer,
    userPrimaryEmail: 'peer@cal.com'
  }
];

function getMockBooking(bookings: Booking[], index: number): Booking {
  const booking = bookings[index];

  if (!booking) {
    throw new Error(`Missing mock booking at index ${index}`);
  }

  return booking;
}

function getMockEventType(booking: Booking): BookingEventType {
  if (!booking.eventType) {
    throw new Error(`Missing event type for mock booking ${booking.id}`);
  }

  return booking.eventType;
}

const baseUpcomingPlanning = getMockBooking(mockUpcomingBookings, 0);
const baseUpcomingPending = getMockBooking(mockUpcomingBookings, 1);
const baseUpcomingEngineering = getMockBooking(mockUpcomingBookings, 2);
const baseCancelledDesignReview = getMockBooking(mockPastBookings, 7);
const basePastRecurring = getMockBooking(mockPastBookings, 8);
const basePastStressTest = getMockBooking(mockPastBookings, 12);

const upcomingPaidConsultation: Booking = {
  ...baseUpcomingPlanning,
  attendees: [
    {
      bookingId: 104,
      email: 'founder@example.com',
      id: 107,
      locale: 'en',
      name: 'Nadia Elmasri',
      noShow: null,
      timeZone: 'America/New_York'
    }
  ],
  description: 'Strategy block — pricing experiments still open.',
  endTime: new Date('2026-02-03T17:45:00'),
  eventType: {
    ...defaultEventType,
    eventTypeColor: {
      darkEventTypeColor: '#fd6d06',
      lightEventTypeColor: '#fd6d06'
    },
    id: 16,
    length: 45,
    price: 14900,
    slug: 'paid-strategy',
    title: 'Paid Strategy Session'
  },
  id: 104,
  location: 'integrations:zoom',
  payment: [],
  startTime: new Date('2026-02-03T17:00:00'),
  title: 'Strategy block w/ Nadia Elmasri',
  uid: 'upcoming-booking-5'
};

function createTodayDate(hours: number, minutes: number): Date {
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
}

const upcomingTodayMeeting: Booking = {
  ...baseUpcomingPlanning,
  attendees: [
    {
      bookingId: 106,
      email: 'carina@cal.com',
      id: 108,
      locale: 'en',
      name: 'Carina Wollheim',
      noShow: null,
      timeZone: 'Europe/Berlin'
    }
  ],
  createdAt: createTodayDate(9, 0),
  description: 'Morning standup — blockers only.',
  endTime: createTodayDate(11, 0),
  eventType: {
    ...defaultEventType,
    eventTypeColor: {
      darkEventTypeColor: '#0dbf82',
      lightEventTypeColor: '#0dbf82'
    },
    id: 18,
    length: 60,
    slug: 'team-sync',
    title: 'Team Sync'
  },
  id: 106,
  location: 'integrations:google_meet',
  startTime: createTodayDate(10, 0),
  title: 'Product standup',
  uid: 'upcoming-booking-today',
  updatedAt: createTodayDate(9, 0)
};

function createRelativeDate(minutesFromNow: number): Date {
  return new Date(Date.now() + minutesFromNow * 60 * 1000);
}

const upcomingMinimumNoticeBooking: Booking = {
  ...baseUpcomingPlanning,
  attendees: [
    {
      bookingId: 107,
      email: 'guest@example.com',
      id: 109,
      locale: 'en',
      name: 'Tomás Ribeiro',
      noShow: null,
      timeZone: 'America/New_York'
    }
  ],
  description: 'Investor prep — deck v4 and dry run.',
  endTime: createRelativeDate(75),
  eventType: {
    ...defaultEventType,
    id: 23,
    length: 30,
    minimumRescheduleNotice: 120,
    slug: 'notice-demo',
    title: 'Investor prep call'
  },
  id: 107,
  location: 'integrations:zoom',
  startTime: createRelativeDate(45),
  title: 'Investor prep w/ Tomás Ribeiro',
  uid: 'upcoming-booking-notice',
  updatedAt: new Date()
};

const upcomingAttendeeOnlyRestrictions: Booking = {
  ...baseUpcomingEngineering,
  attendees: [
    {
      bookingId: 108,
      email: 'client@example.com',
      id: 110,
      locale: 'en',
      name: 'Gemma Walsh',
      noShow: null,
      timeZone: 'Europe/London'
    }
  ],
  description: 'MSA redlines — attendee cannot cancel without host.',
  endTime: new Date('2026-03-12T11:30:00'),
  eventType: {
    ...defaultEventType,
    disableCancelling: true,
    disableCancellingScope: 'ATTENDEE_ONLY',
    disableRescheduling: true,
    disableReschedulingScope: 'ATTENDEE_ONLY',
    id: 24,
    slug: 'host-only-actions',
    title: 'Contract walkthrough'
  },
  id: 108,
  location: 'integrations:google_meet',
  startTime: new Date('2026-03-12T11:00:00'),
  title: 'MSA walkthrough — Gemma Walsh',
  uid: 'upcoming-booking-scope',
  updatedAt: new Date('2026-03-01T09:00:00')
};

const upcomingRescheduledRecurring: Booking = {
  ...baseUpcomingEngineering,
  description: 'Moved by the booker — conflicts with travel.',
  endTime: new Date('2026-02-06T10:30:00'),
  eventType: {
    ...defaultEventType,
    eventTypeColor: {
      darkEventTypeColor: '#8b5cf6',
      lightEventTypeColor: '#8b5cf6'
    },
    id: 17,
    length: 30,
    recurringEvent: {
      count: 8,
      freq: 2,
      interval: 1
    },
    slug: 'customer-check-in',
    title: 'Customer Check-in'
  },
  fromReschedule: 'previous-booking-uid',
  id: 105,
  metadata: {
    recurringEventsRemaining: 6,
    recurringPattern: 'Every week for 8 occurrences'
  },
  recurringEventId: 'recurring-upcoming-check-in',
  rescheduled: true,
  rescheduledBy: 'Nadia Elmasri',
  startTime: new Date('2026-02-06T10:00:00'),
  title: 'Customer check-in (series)',
  uid: 'upcoming-booking-6'
};

const unconfirmedTeamBooking: Booking = {
  ...baseUpcomingPending,
  attendees: [
    {
      bookingId: 106,
      email: 'enterprise@example.com',
      id: 108,
      locale: 'en',
      name: 'Helena Gruber',
      noShow: null,
      timeZone: 'America/Chicago'
    }
  ],
  description: 'Security questionnaire + sandbox access.',
  endTime: new Date('2026-02-10T16:30:00'),
  eventType: {
    ...defaultEventType,
    eventTypeColor: {
      darkEventTypeColor: '#0dbf82',
      lightEventTypeColor: '#0dbf82'
    },
    hosts: [
      {
        user: { email: 'pasquale@cal.com', id: 1 },
        userId: 1
      },
      {
        user: { email: 'keith@cal.com', id: 2 },
        userId: 2
      }
    ],
    id: 18,
    schedulingType: 'ROUND_ROBIN',
    slug: 'enterprise-demo',
    team: {
      id: 2,
      name: 'Sales Team',
      slug: 'sales'
    },
    teamId: 2,
    title: 'Enterprise Demo'
  },
  id: 106,
  location: 'integrations:teams',
  startTime: new Date('2026-02-10T16:00:00'),
  title: 'Enterprise demo — awaiting confirm',
  uid: 'unconfirmed-booking-2'
};

const unconfirmedTeamEventType = getMockEventType(unconfirmedTeamBooking);

const unconfirmedPaidRecurring: Booking = {
  ...unconfirmedTeamBooking,
  description: 'Four-part onboarding series; payment not captured yet.',
  endTime: new Date('2026-02-12T15:00:00'),
  eventType: {
    ...unconfirmedTeamEventType,
    price: 29900,
    recurringEvent: {
      count: 4,
      freq: 2,
      interval: 1
    },
    slug: 'paid-onboarding-series',
    title: 'Paid Onboarding Series'
  },
  id: 107,
  metadata: {
    recurringEventsRemaining: 4,
    recurringPattern: 'Every week for 4 occurrences'
  },
  payment: [],
  recurringEventId: 'recurring-unconfirmed-onboarding',
  startTime: new Date('2026-02-12T14:00:00'),
  title: 'Onboarding series — pending payment',
  uid: 'unconfirmed-booking-3'
};

const cancelledTeamBooking: Booking = {
  ...baseCancelledDesignReview,
  cancellationReason: 'Customer asked to move the project review.',
  description: 'Design critique for the analytics shell.',
  endTime: new Date('2025-10-15T13:00:00'),
  eventType: {
    ...defaultEventType,
    eventTypeColor: {
      darkEventTypeColor: '#3b82f6',
      lightEventTypeColor: '#3b82f6'
    },
    id: 19,
    schedulingType: 'COLLECTIVE',
    slug: 'team-design-review',
    team: {
      id: 1,
      name: 'Cal.com',
      slug: 'cal'
    },
    teamId: 1,
    title: 'Team Design Review'
  },
  id: 14,
  rescheduled: true,
  startTime: new Date('2025-10-15T12:30:00'),
  title: 'Analytics shell review',
  uid: 'cancelled-booking-2'
};

const cancelledPaidRecurring: Booking = {
  ...baseCancelledDesignReview,
  cancellationReason: 'Payment was not completed before the deadline.',
  description: 'Advisory retainer — card never confirmed.',
  endTime: new Date('2025-10-18T11:45:00'),
  eventType: {
    ...defaultEventType,
    eventTypeColor: {
      darkEventTypeColor: '#fd6d06',
      lightEventTypeColor: '#fd6d06'
    },
    id: 21,
    length: 45,
    price: 19900,
    recurringEvent: {
      count: 6,
      freq: 2,
      interval: 2
    },
    slug: 'paid-advisory',
    title: 'Paid Advisory'
  },
  id: 15,
  metadata: {
    recurringEventsRemaining: 3,
    recurringPattern: 'Every 2 weeks for 6 occurrences'
  },
  payment: [],
  recurringEventId: 'recurring-cancelled-paid',
  startTime: new Date('2025-10-18T11:00:00'),
  title: 'Advisory retainer (series)',
  uid: 'cancelled-booking-3'
};

const recurringYogaClass: Booking = {
  ...defaultBookingFields,
  attendees: [
    {
      bookingId: 200,
      email: 'pro@example.com',
      id: 200,
      locale: 'en',
      name: 'Jordan Hale',
      noShow: null,
      timeZone: 'Europe/Rome'
    }
  ],
  createdAt: new Date('2026-05-01T09:00:00'),
  description: null,
  endTime: new Date('2026-05-22T17:31:00'),
  eventType: {
    ...defaultEventType,
    eventTypeColor: {
      darkEventTypeColor: '#8b5cf6',
      lightEventTypeColor: '#8b5cf6'
    },
    id: 200,
    length: 30,
    recurringEvent: {
      count: 6,
      freq: 2,
      interval: 1
    },
    slug: 'yoga-class',
    title: 'Yoga class'
  },
  id: 200,
  location: 'integrations:daily',
  metadata: {
    recurringEventsRemaining: 4,
    recurringPattern: 'Every week for 6 occurrences'
  },
  recurringEventId: 'recurring-yoga-class',
  rescheduled: false,
  startTime: new Date('2026-05-22T17:01:00'),
  status: 'ACCEPTED',
  title: 'Yoga class',
  uid: 'recurring-booking-1',
  updatedAt: new Date('2026-05-01T09:00:00'),
  user: userPasquale,
  userPrimaryEmail: 'pasquale@cal.com'
};

const recurringYogaEventType = getMockEventType(recurringYogaClass);

const recurringUnconfirmedTennisClass: Booking = {
  ...recurringYogaClass,
  attendees: [
    {
      bookingId: 201,
      email: 'pro@example.com',
      id: 201,
      locale: 'en',
      name: 'Jordan Hale',
      noShow: null,
      timeZone: 'Europe/Rome'
    }
  ],
  endTime: new Date('2026-05-23T18:01:00'),
  eventType: {
    ...recurringYogaEventType,
    eventTypeColor: {
      darkEventTypeColor: '#0dbf82',
      lightEventTypeColor: '#0dbf82'
    },
    id: 201,
    recurringEvent: {
      count: 5,
      freq: 2,
      interval: 2
    },
    slug: 'tennis-class',
    title: 'Tennis class'
  },
  id: 201,
  metadata: {
    recurringEventsRemaining: 5,
    recurringPattern: 'Every 2 weeks for 5 occurrences'
  },
  recurringEventId: 'recurring-tennis-class',
  startTime: new Date('2026-05-23T17:01:00'),
  status: 'PENDING',
  title: 'Tennis class',
  uid: 'recurring-booking-2'
};

const recurringSeededYogaClass: Booking = {
  ...recurringYogaClass,
  attendees: [
    {
      bookingId: 202,
      email: 'pro@example.com',
      id: 202,
      locale: 'en',
      name: 'Jordan Hale',
      noShow: null,
      timeZone: 'Europe/Rome'
    }
  ],
  description: 'Fixture row for seeded recurrence metadata.',
  endTime: new Date('2026-05-24T17:31:00'),
  eventType: {
    ...recurringYogaEventType,
    id: 202,
    slug: 'seeded-yoga-class',
    title: 'Sunrise flow'
  },
  id: 202,
  metadata: {
    recurringEventsRemaining: 1,
    recurringPattern: 'Every week for 3 occurrences'
  },
  recurringEventId: 'recurring-seeded-yoga-class',
  startTime: new Date('2026-05-24T17:01:00'),
  title: 'Sunrise flow (seeded)',
  uid: 'recurring-booking-3'
};

const recurringPaidTeamWorkshop: Booking = {
  ...recurringYogaClass,
  attendees: [
    {
      bookingId: 203,
      email: 'ops@example.com',
      id: 203,
      locale: 'en',
      name: 'Inès Moreau',
      noShow: null,
      timeZone: 'America/New_York'
    },
    {
      bookingId: 203,
      email: 'product@example.com',
      id: 204,
      locale: 'en',
      name: 'Felix Hart',
      noShow: null,
      timeZone: 'Europe/London'
    }
  ],
  description: 'Recurring workshop — invoice still outstanding.',
  endTime: new Date('2026-05-26T16:00:00'),
  eventType: {
    ...defaultEventType,
    eventTypeColor: {
      darkEventTypeColor: '#fd6d06',
      lightEventTypeColor: '#fd6d06'
    },
    id: 203,
    length: 60,
    price: 49900,
    recurringEvent: {
      count: 10,
      freq: 2,
      interval: 1
    },
    schedulingType: 'COLLECTIVE',
    slug: 'paid-team-workshop',
    team: {
      id: 1,
      name: 'Cal.com',
      slug: 'cal'
    },
    teamId: 1,
    title: 'Facilitation workshop'
  },
  id: 203,
  metadata: {
    recurringEventsRemaining: 8,
    recurringPattern: 'Every week for 10 occurrences'
  },
  payment: [],
  recurringEventId: 'recurring-paid-team-workshop',
  startTime: new Date('2026-05-26T15:00:00'),
  title: 'Facilitation workshop (series)',
  uid: 'recurring-booking-4'
};

const recurringRescheduledClass: Booking = {
  ...recurringYogaClass,
  description: 'Attendee moved the May slot to avoid overlap.',
  endTime: new Date('2026-05-27T09:45:00'),
  eventType: {
    ...recurringYogaEventType,
    eventTypeColor: {
      darkEventTypeColor: '#3b82f6',
      lightEventTypeColor: '#3b82f6'
    },
    id: 204,
    slug: 'pilates-class',
    title: 'Pilates class'
  },
  fromReschedule: 'previous-pilates-booking',
  id: 204,
  metadata: {
    recurringEventsRemaining: 2,
    recurringPattern: 'Every month for 4 occurrences'
  },
  recurringEventId: 'recurring-pilates-class',
  rescheduled: true,
  rescheduledBy: 'Jordan Hale',
  startTime: new Date('2026-05-27T09:15:00'),
  title: 'Pilates class',
  uid: 'recurring-booking-5'
};

const pastReportedBooking: Booking = {
  ...defaultBookingFields,
  attendees: [
    {
      bookingId: 16,
      email: 'unknown@example.com',
      id: 18,
      locale: 'en',
      name: 'M. Jensen',
      noShow: false,
      timeZone: 'America/New_York'
    }
  ],
  createdAt: new Date('2025-10-18T08:00:00'),
  description: 'Walk-in via public link — flagged after the call.',
  endTime: new Date('2025-10-20T11:00:00'),
  eventType: {
    ...defaultEventType,
    id: 22,
    slug: '30min',
    title: '30 Min Meeting'
  },
  id: 16,
  location: 'integrations:zoom',
  report: {
    createdAt: new Date('2025-10-20T11:05:00'),
    description: 'Unrecognized attendee used a generic booking link.',
    id: 1,
    reason: 'Spam or unwanted booking',
    reportedById: userPasquale.id
  },
  startTime: new Date('2025-10-20T10:30:00'),
  status: 'ACCEPTED',
  title: 'Inbound — M. Jensen',
  uid: 'past-booking-reported',
  updatedAt: new Date('2025-10-20T11:05:00'),
  user: userPasquale,
  userPrimaryEmail: 'pasquale@cal.com'
};

export const mockPastBookingsForTab: Booking[] = [
  pastReportedBooking,
  ...mockPastBookings.filter(
    (booking) => booking.status !== 'CANCELLED' && booking.status !== 'PENDING'
  )
];

export const mockUpcomingBookingsForTab: Booking[] = [
  upcomingTodayMeeting,
  upcomingMinimumNoticeBooking,
  upcomingAttendeeOnlyRestrictions,
  ...mockUpcomingBookings,
  upcomingPaidConsultation,
  upcomingRescheduledRecurring
];

export const mockUnconfirmedBookings: Booking[] = [
  baseUpcomingPending,
  unconfirmedTeamBooking,
  unconfirmedPaidRecurring
];

export const mockRecurringBookings: Booking[] = [
  recurringYogaClass,
  recurringUnconfirmedTennisClass,
  recurringSeededYogaClass,
  recurringPaidTeamWorkshop,
  recurringRescheduledClass,
  upcomingRescheduledRecurring,
  unconfirmedPaidRecurring,
  basePastRecurring,
  basePastStressTest
];

export const mockCancelledBookings: Booking[] = [
  ...mockPastBookings.filter((booking) => booking.status === 'CANCELLED'),
  cancelledTeamBooking,
  cancelledPaidRecurring
];

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

export function isBookingToday(date: Date, referenceDate: Date = new Date()): boolean {
  return (
    date.getFullYear() === referenceDate.getFullYear() &&
    date.getMonth() === referenceDate.getMonth() &&
    date.getDate() === referenceDate.getDate()
  );
}

export function formatBookingDate(startTime: Date, endTime?: Date): string {
  const isUpcoming = (endTime ?? startTime) >= new Date();
  const bookingYear = startTime.getFullYear();
  const currentYear = new Date().getFullYear();
  const isDifferentYear = bookingYear !== currentYear;
  const weekday = startTime.toLocaleDateString('en-US', { weekday: 'short' });
  const day = startTime.getDate();
  const monthShort = startTime.toLocaleDateString('en-US', { month: 'short' });
  const monthLong = startTime.toLocaleDateString('en-US', { month: 'long' });

  if (isUpcoming) {
    if (isDifferentYear) {
      return `${weekday}, ${day} ${monthShort} ${bookingYear}`;
    }

    return `${weekday}, ${day} ${monthShort}`;
  }

  return `${day} ${monthLong} ${bookingYear}`;
}

export function formatBookingTime(startTime: Date, endTime: Date): string {
  const formatTime = (d: Date) =>
    d.toLocaleTimeString('en-US', {
      hour: 'numeric',
      hour12: true,
      minute: '2-digit'
    });
  return `${formatTime(startTime)} - ${formatTime(endTime)}`;
}

export function getBookingParticipants(booking: Booking): string {
  const names = booking.attendees.map((a) => a.name);
  if (names.length === 0) return '';
  const firstName = names[0] ?? '';
  if (names.length === 1) return firstName;
  const secondName = names[1] ?? '';
  if (names.length === 2) return `${firstName} and ${secondName}`;
  const lastName = names[names.length - 1] ?? '';
  return `${names.slice(0, -1).join(', ')} and ${lastName}`;
}

export function getLocationLabel(location: string | null): string {
  if (!location) return '';
  const locationMap: Record<string, string> = {
    'integrations:daily': 'Join Cal Video',
    'integrations:google_meet': 'Join Google Meet',
    'integrations:teams': 'Join Microsoft Teams',
    'integrations:zoom': 'Join Zoom'
  };
  return locationMap[location] || location;
}

export function getLocationIcon(location: string | null): 'video' | 'phone' | 'location' | null {
  if (!location) return null;
  if (location.startsWith('integrations:')) return 'video';
  if (location.includes('phone')) return 'phone';
  return 'location';
}

// =============================================================================
// FILTER FUNCTIONS
// =============================================================================

export interface BookingFilter {
  categoryId: string;
  selectedOptionIds: string[];
}

export function filterBookings(bookings: Booking[], filters: BookingFilter[]): Booking[] {
  if (filters.length === 0) return bookings;

  return bookings.filter((booking) => {
    return filters.every((filter) => {
      const { categoryId, selectedOptionIds } = filter;
      if (selectedOptionIds.length === 0) return true;

      switch (categoryId) {
        case 'event-type': {
          const eventTypeTitle = booking.eventType?.title?.toLowerCase() ?? '';
          const eventTypeSlug = booking.eventType?.slug?.toLowerCase() ?? '';
          return selectedOptionIds.some((optionId) => {
            const optionLabel = getEventTypeLabel(optionId).toLowerCase();
            return (
              eventTypeTitle.includes(optionLabel) ||
              eventTypeSlug.includes(optionId.replace(/-/g, ''))
            );
          });
        }
        case 'member': {
          const hostName = booking.user?.name?.toLowerCase() ?? '';
          const hostEmail = booking.user?.email?.toLowerCase() ?? '';
          return selectedOptionIds.some((optionId) => {
            const memberName = optionId.replace(/-/g, ' ').toLowerCase();
            return hostName.includes(memberName) || hostEmail.includes(optionId.replace(/-/g, ''));
          });
        }
        case 'attendees-name': {
          return selectedOptionIds.some((optionId) => {
            const searchName = optionId.replace(/-/g, ' ').toLowerCase();
            return booking.attendees.some((attendee) =>
              attendee.name.toLowerCase().includes(searchName)
            );
          });
        }
        case 'attendee-email': {
          return selectedOptionIds.some((optionId) => {
            return booking.attendees.some((attendee) =>
              attendee.email.toLowerCase().includes(optionId.split('-')[0] ?? '')
            );
          });
        }
        case 'date-range': {
          const now = new Date();
          const bookingDate = new Date(booking.startTime);
          return selectedOptionIds.some((optionId) => {
            switch (optionId) {
              case 'today':
                return isSameDay(bookingDate, now);
              case 'yesterday':
                return isSameDay(bookingDate, addDays(now, -1));
              case 'this-week':
                return isWithinWeek(bookingDate, now);
              case 'last-week':
                return isWithinLastWeek(bookingDate, now);
              case 'this-month':
                return isSameMonth(bookingDate, now);
              case 'last-month':
                return isLastMonth(bookingDate, now);
              default:
                return true;
            }
          });
        }
        case 'booking-uid': {
          return selectedOptionIds.some((optionId) =>
            booking.uid.toLowerCase().includes(optionId.toLowerCase())
          );
        }
        default:
          return true;
      }
    });
  });
}

function getEventTypeLabel(optionId: string): string {
  const labels: Record<string, string> = {
    '15-min': '15 Min Meeting',
    '30-min': '30 Min Meeting',
    '60-min': '60 Min Meeting',
    consultation: 'Consultation',
    interview: 'Interview',
    onboarding: 'Onboarding Call'
  };
  return labels[optionId] ?? optionId;
}

function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function isWithinWeek(date: Date, referenceDate: Date): boolean {
  const startOfWeek = new Date(referenceDate);
  startOfWeek.setDate(referenceDate.getDate() - referenceDate.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 7);
  return date >= startOfWeek && date < endOfWeek;
}

function isWithinLastWeek(date: Date, referenceDate: Date): boolean {
  const startOfLastWeek = new Date(referenceDate);
  startOfLastWeek.setDate(referenceDate.getDate() - referenceDate.getDay() - 7);
  startOfLastWeek.setHours(0, 0, 0, 0);
  const endOfLastWeek = new Date(startOfLastWeek);
  endOfLastWeek.setDate(startOfLastWeek.getDate() + 7);
  return date >= startOfLastWeek && date < endOfLastWeek;
}

function isSameMonth(date: Date, referenceDate: Date): boolean {
  return (
    date.getFullYear() === referenceDate.getFullYear() &&
    date.getMonth() === referenceDate.getMonth()
  );
}

function isLastMonth(date: Date, referenceDate: Date): boolean {
  const lastMonth = new Date(referenceDate);
  lastMonth.setMonth(lastMonth.getMonth() - 1);
  return date.getFullYear() === lastMonth.getFullYear() && date.getMonth() === lastMonth.getMonth();
}
