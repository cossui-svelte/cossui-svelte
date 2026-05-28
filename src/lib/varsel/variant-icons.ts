/**
 * SVG definitions for status icons (success, warning, error).
 * These are lightweight SVG path data objects rendered by the toast component.
 */
import type { ToastData } from './internals';

const ICON_VARIANTS = ['success', 'warning', 'destructive', 'info'] as const;

export type IconVariant = (typeof ICON_VARIANTS)[number];

export type IconElement =
  | { tag: 'path'; d: string; fill?: boolean }
  | { tag: 'line'; x1: number; y1: number; x2: number; y2: number; opacity?: number }
  | { tag: 'polyline'; points: string }
  | { tag: 'circle'; cx: number; cy: number; r: number };

export interface VariantIconDefinition {
  elements: IconElement[];
  viewBox: string;
}

export const variantIconMap = {
  destructive: {
    elements: [
      { tag: 'line', x1: 14, x2: 4, y1: 4, y2: 14 },
      { tag: 'line', x1: 4, x2: 14, y1: 4, y2: 14 }
    ],
    viewBox: '0 0 18 18'
  },
  info: {
    elements: [
      {
        d: 'M9 16.25C13.004 16.25 16.25 13.004 16.25 9C16.25 4.996 13.004 1.75 9 1.75C4.996 1.75 1.75 4.996 1.75 9C1.75 13.004 4.996 16.25 9 16.25Z',
        tag: 'path'
      },
      {
        d: 'M9 12.75V9.25C9 8.9739 8.7761 8.75 8.5 8.75H7.75',
        tag: 'path'
      },
      {
        d: 'M9 6.75C8.448 6.75 8 6.301 8 5.75C8 5.199 8.448 4.75 9 4.75C9.552 4.75 10 5.199 10 5.75C10 6.301 9.552 6.75 9 6.75Z',
        fill: true,
        tag: 'path'
      }
    ],
    viewBox: '0 0 18 18'
  },
  success: {
    elements: [{ points: '2.75 9.25 6.75 14.25 15.25 3.75', tag: 'polyline' }],
    viewBox: '0 0 18 18'
  },
  warning: {
    elements: [
      {
        d: 'M7.63796 3.48996L2.21295 12.89C1.60795 13.9399 2.36395 15.25 3.57495 15.25H14.425C15.636 15.25 16.392 13.9399 15.787 12.89L10.362 3.48996C9.75696 2.44996 8.24296 2.44996 7.63796 3.48996Z',
        tag: 'path'
      },
      { d: 'M9 6.75V9.75', tag: 'path' },
      {
        d: 'M9 13.5C8.448 13.5 8 13.05 8 12.5C8 11.95 8.448 11.5 9 11.5C9.552 11.5 10 11.9501 10 12.5C10 13.0499 9.552 13.5 9 13.5Z',
        fill: true,
        tag: 'path'
      }
    ],
    viewBox: '0 0 18 18'
  }
} satisfies Record<IconVariant, VariantIconDefinition>;

/**
 * Checks if a given toast variant has an associated icon.
 * @param variant - The variant string to check.
 * @returns True if the variant is one of 'success', 'warning', or 'destructive'.
 */
export const hasVariantIcon = (variant?: ToastData['variant']): variant is IconVariant => {
  return Boolean(variant && ICON_VARIANTS.includes(variant as IconVariant));
};
