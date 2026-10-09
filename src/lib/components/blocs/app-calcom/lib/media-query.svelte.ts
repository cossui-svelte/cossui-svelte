import { MediaQuery } from 'svelte/reactivity';

// Tailwind breakpoints used by the original `useMediaQuery("md:max-lg")` style helper.
const QUERIES = {
  'max-md': '(max-width: 767.98px)',
  'md:max-lg': '(min-width: 768px) and (max-width: 1023.98px)',
  'max-lg': '(max-width: 1023.98px)'
} as const;

export const mediaQuery = (key: keyof typeof QUERIES) => new MediaQuery(QUERIES[key]);
