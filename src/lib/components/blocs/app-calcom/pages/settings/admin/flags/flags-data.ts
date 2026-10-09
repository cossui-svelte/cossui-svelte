export interface FeatureFlag {
  slug: string;
  description: string;
  enabled: boolean;
  type: string;
}

export interface AssignableUser {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export const FEATURE_FLAGS: FeatureFlag[] = [
  {
    description: 'Enable calendar caching for improved performance',
    enabled: true,
    slug: 'calendar-cache',
    type: 'Operations'
  },
  {
    description: 'Serve cached calendar data to users',
    enabled: true,
    slug: 'calendar-cache-serve',
    type: 'Operations'
  },
  {
    description: 'Enable email notifications',
    enabled: true,
    slug: 'emails',
    type: 'Operations'
  },
  {
    description: 'Enable insights dashboard',
    enabled: true,
    slug: 'insights',
    type: 'Operations'
  },
  {
    description: 'Enable team functionality',
    enabled: true,
    slug: 'teams',
    type: 'Operations'
  },
  {
    description: 'Enable webhook integrations',
    enabled: true,
    slug: 'webhooks',
    type: 'Operations'
  },
  {
    description: 'Enable workflow automations',
    enabled: true,
    slug: 'workflows',
    type: 'Operations'
  },
  {
    description: 'Enable organization features',
    enabled: true,
    slug: 'organizations',
    type: 'Operations'
  },
  {
    description: 'Require email verification during sign up',
    enabled: true,
    slug: 'email-verification',
    type: 'Operations'
  },
  {
    description: 'Disable new user signups',
    enabled: false,
    slug: 'disable-signup',
    type: 'Operations'
  },
  {
    description: 'Enable Google Workspace directory integration',
    enabled: false,
    slug: 'google-workspace-directory',
    type: 'Experiment'
  },
  {
    description: 'Enable user attributes for routing',
    enabled: true,
    slug: 'attributes',
    type: 'Experiment'
  },
  {
    description: 'Use updated organizer request email template',
    enabled: false,
    slug: 'organizer-request-email-v2',
    type: 'Experiment'
  },
  {
    description: 'Enable delegation credential feature',
    enabled: false,
    slug: 'delegation-credential',
    type: 'Experiment'
  },
  {
    description: 'Enable Salesforce CRM tasker integration',
    enabled: false,
    slug: 'salesforce-crm-tasker',
    type: 'Experiment'
  },
  {
    description: 'Use SMTP for workflow emails',
    enabled: false,
    slug: 'workflow-smtp-emails',
    type: 'Experiment'
  },
  {
    description: 'Show log-in overlay on Cal Video',
    enabled: false,
    slug: 'cal-video-log-in-overlay',
    type: 'Experiment'
  },
  {
    description: 'Enable permission-based access control',
    enabled: false,
    slug: 'pbac',
    type: 'Experiment'
  },
  {
    description: 'Enable restriction schedule feature',
    enabled: false,
    slug: 'restriction-schedule',
    type: 'Experiment'
  },
  {
    description: 'Enable new bookings experience (v3)',
    enabled: false,
    slug: 'bookings-v3',
    type: 'Experiment'
  },
  {
    description: 'Enable booking audit logging',
    enabled: false,
    slug: 'booking-audit',
    type: 'Experiment'
  },
  {
    description: 'Enable sidebar tips for onboarding',
    enabled: true,
    slug: 'sidebar-tips',
    type: 'Killswitch'
  },
  {
    description: 'Enable tiered support chat',
    enabled: false,
    slug: 'tiered-support-chat',
    type: 'Killswitch'
  },
  {
    description: 'Review signups against watchlist',
    enabled: false,
    slug: 'signup-watchlist-review',
    type: 'Killswitch'
  }
];

export const USERS: AssignableUser[] = [
  {
    avatarUrl: 'https://pbs.twimg.com/profile_images/1994776674391457792/7utKOMi6_400x400.jpg',
    email: 'pasquale@cal.com',
    id: 'usr_pasquale',
    name: 'Pasquale Vitiello'
  },
  {
    email: 'margaret@cal.com',
    id: 'usr_margaret',
    name: 'Margaret Welsh'
  },
  {
    email: 'brian@cal.com',
    id: 'usr_brian',
    name: 'Brian Smith'
  },
  {
    email: 'anna@cal.com',
    id: 'usr_anna',
    name: 'Anna Taylor'
  },
  {
    email: 'sofia@cal.com',
    id: 'usr_sofia',
    name: 'Sofia Rodriguez'
  },
  {
    email: 'david@cal.com',
    id: 'usr_david',
    name: 'David Chen'
  },
  {
    email: 'elena@cal.com',
    id: 'usr_elena',
    name: 'Elena Rossi'
  },
  {
    email: 'james@cal.com',
    id: 'usr_james',
    name: 'James Lee'
  }
];
