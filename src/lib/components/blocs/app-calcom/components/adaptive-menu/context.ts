import { getContext } from 'svelte';

export type AdaptiveMenuVariant = 'drawer' | 'menu';
export type AdaptiveMenuVisibility = 'all' | 'desktop' | 'mobile';

export const ADAPTIVE_MENU_KEY = Symbol('adaptive-menu');

export function getAdaptiveMenuVariant(): AdaptiveMenuVariant {
  const variant = getContext<AdaptiveMenuVariant | undefined>(ADAPTIVE_MENU_KEY);
  if (!variant) {
    throw new Error('AdaptiveMenu components must be used within AdaptiveMenu.');
  }
  return variant;
}

export function isVisible(
  variant: AdaptiveMenuVariant,
  show: AdaptiveMenuVisibility = 'all'
): boolean {
  return (
    show === 'all' ||
    (show === 'desktop' && variant === 'menu') ||
    (show === 'mobile' && variant === 'drawer')
  );
}
