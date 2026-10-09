export interface ReferenceLink {
  title: string;
  url: string;
}

export const MOCK_AI_RESPONSE = `I'd be happy to help you with billing information for [Cal.com](http://Cal.com)! Here's what you need to know about billing and costs:

## Credit System Overview

[Cal.com](http://Cal.com) uses a credit-based system for messaging (SMS/WhatsApp) and AI phone calls. Credits work as a flexible payment method where **1 credit = $0.01 USD**.

## Credit Allocations by Plan

**Free Users:**
- No free credits included
- Must purchase credits manually from Billing Settings

**Team Plan:**
- 750 credits per team member per month
- Credits reset at the start of each billing cycle
- Additional credits can be purchased from Team Settings

**Organizations (Enterprise):**
- 1000 credits per team member per month
- SMS/WhatsApp sending is free (doesn't consume credits)
- Messaging costs covered through organization billing

## Credit Usage Costs

**SMS/WhatsApp Messages:**
- Charged per segment (not per message)
- Standard messages: up to 160 characters per segment
- Messages with emojis/special characters: up to 70 characters per segment
- International rates vary by country (based on Twilio rates + 80% processing fee)

**[Cal.ai](http://Cal.ai) (AI Phone Agent):**
- 29 credits per minute
- Equals $0.29 per minute

## Paid Bookings

For collecting payments from clients, [Cal.com](http://Cal.com) integrates with Stripe. You can set up paid event types to receive payments when someone books with you.

Would you like more details about any specific aspect of billing, such as setting up paid bookings or purchasing additional credits?`;

export const MOCK_REFERENCE_LINKS: ReferenceLink[] = [
  {
    title: 'Organizations (Enterprise)',
    url: 'https://cal.com/help/billing-and-usage/messaging-credits#organizations-enterprise'
  },
  {
    title: 'Free Users',
    url: 'https://cal.com/help/billing-and-usage/messaging-credits#free-users'
  },
  {
    title: 'Credit System',
    url: 'https://cal.com/help/billing-and-usage/messaging-credits#credit-system'
  },
  {
    title: 'How Many Credits Do You Get?',
    url: 'https://cal.com/help/workflows/credits#how-many-credits-do-you-get'
  },
  {
    title: 'Segment-Based Billing',
    url: 'https://cal.com/help/billing-and-usage/messaging-credits#segment-based-billing'
  },
  {
    title: 'Team Plan',
    url: 'https://cal.com/help/billing-and-usage/messaging-credits#team-plan'
  },
  {
    title: 'How to set up an event type to receive payments',
    url: 'https://cal.com/help/event-types/how-to-receive-payments#how-to-set-up-an-event-type-to-receive-payments'
  },
  {
    title: 'Cal.ai',
    url: 'https://cal.com/help/billing-and-usage/messaging-credits#calai'
  },
  {
    title: 'How does pricing work for Cal.ai? What is the cost per minute?',
    url: 'https://cal.com/help/cal-ai/cal-ai-help#how-does-pricing-work-for-calai-what-is-the-cost-per-minute'
  },
  {
    title: 'Overview of Credits',
    url: 'https://cal.com/help/billing-and-usage/messaging-credits#overview-of-credits'
  },
  {
    title: 'Multiple Field Connections',
    url: 'https://cal.com/help/routing/connect-routing-form-to-booking-questions#multiple-field-connections'
  },
  {
    title: 'Paid Bookings',
    url: 'https://cal.com/help/bookings/paid-bookings#paid-bookings'
  },
  {
    title: '🌍 Other Countries',
    url: 'https://cal.com/help/billing-and-usage/messaging-credits#-other-countries'
  },
  {
    title: 'Create your account',
    url: 'https://cal.com/help/quick-start/create-account#create-your-account'
  },
  {
    title: 'The Solution: Matching Identifiers',
    url: 'https://cal.com/help/routing/connect-routing-form-to-booking-questions#the-solution-matching-identifiers'
  },
  {
    title: 'Step 2: Create a Matching Booking Question',
    url: 'https://cal.com/help/routing/connect-routing-form-to-booking-questions#step-2-create-a-matching-booking-question'
  },
  {
    title: 'Booking Question Configuration',
    url: 'https://cal.com/help/routing/connect-routing-form-to-booking-questions#booking-question-configuration'
  }
];
