import { defineEnvVars } from '@sveltejs/kit/env';
import z from 'zod/v3';

const key = z
  .string()
  .trim()
  .regex(/^[0-9A-Za-z_-]{39}$/, {
    message: 'Not a valid Google Maps API key (expected 39 chars).'
  });

export const variables = defineEnvVars({
  GOOGLE_MAPS_API_KEY: {
    public: true,
    description:
      'The Google Maps API key used for Places Autocomplete. Set GOOGLE_MAPS_API_KEY in your environment. Optional: the autocomplete component degrades gracefully when unset.',
    schema: key.or(z.literal('')).optional()
  }
});
