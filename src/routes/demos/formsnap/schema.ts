import { z } from 'zod';

export const themes = ['light', 'dark'] as const;
export const languages = ['en', 'es', 'fr'] as const;
export const allergies = ['peanuts', 'dairy', 'gluten', 'soy', 'shellfish'] as const;

export const schema = z.object({
  allergies: z.array(z.enum(allergies)),
  bio: z.string().optional(),
  email: z.string().email('Please enter a valid email.'),
  language: z.enum(languages).default('en'),
  marketingEmails: z.boolean().default(true),
  theme: z.enum(themes).default('light')
});
