import { tv } from 'tailwind-variants';

/**
 * TV definition for the main toast container element.
 * Handles positioning logic (absolute/fixed positioning coordinates)
 * and base theming (colors based on variant).
 */
export const toastContainerVariants = tv({
  base: 'pointer-events-auto fixed will-change-transform',
  defaultVariants: {
    position: 'bottom-center',
    variant: 'default'
  },
  variants: {
    /**
     * Determines where the toast is anchored on the screen.
     */
    position: {
      'bottom-center': 'bottom-4 left-1/2 w-full max-w-sm -translate-x-1/2 transform',
      'bottom-left': 'bottom-4 left-4 w-full max-w-sm',
      'bottom-right': 'right-4 bottom-4 w-full max-w-sm',
      'top-center': 'top-4 left-1/2 w-full max-w-sm -translate-x-1/2 transform',
      'top-left': 'top-4 left-4 w-full max-w-sm',
      'top-right': 'top-4 right-4 w-full max-w-sm'
    },
    /**
     * Semantic variant of the toast affecting text colors.
     */
    variant: {
      custom: '',
      default:
        'rounded-vs-lg border shadow-vs-toast border-vs-border bg-vs-popover text-vs-foreground',
      destructive:
        'rounded-vs-lg border shadow-vs-toast border-vs-border bg-vs-popover text-vs-destructive/90',
      info: 'rounded-vs-lg border shadow-vs-toast border-vs-border bg-vs-popover text-vs-info/90',
      success:
        'rounded-vs-lg border shadow-vs-toast border-vs-border bg-vs-popover text-vs-success/90',
      warning:
        'rounded-vs-lg border shadow-vs-toast border-vs-border bg-vs-popover text-vs-warning/90'
    }
  }
});

/**
 * TV definition for the inner content wrapper of the toast.
 * Useful for applying styles specific to the content area (e.g. overflow, padding overrides)
 * separate from the structural container.
 */
export const toastContentVariants = tv({
  base: 'relative overflow-hidden rounded-vs-lg',
  defaultVariants: {
    variant: 'default'
  },
  variants: {
    variant: {
      custom: '',
      default: '',
      destructive: '',
      info: '',
      success: '',
      warning: ''
    }
  }
});
