import { tv } from 'tailwind-variants';

export const toastContainerVariants = tv({
  base: 'pointer-events-auto fixed will-change-transform',
  defaultVariants: {
    position: 'bottom-center',
    variant: 'default'
  },
  variants: {
    position: {
      'bottom-center': 'bottom-4 left-1/2 w-full max-w-sm -translate-x-1/2 transform',
      'bottom-left': 'bottom-4 left-4 w-full max-w-sm',
      'bottom-right': 'right-4 bottom-4 w-full max-w-sm',
      'top-center': 'top-4 left-1/2 w-full max-w-sm -translate-x-1/2 transform',
      'top-left': 'top-4 left-4 w-full max-w-sm',
      'top-right': 'top-4 right-4 w-full max-w-sm'
    },
    variant: {
      custom: '',
      default: 'rounded-lg border shadow-lg/5 bg-popover text-popover-foreground',
      destructive: 'rounded-lg border shadow-lg/5 bg-popover text-destructive',
      info: 'rounded-lg border shadow-lg/5 bg-popover text-info',
      success: 'rounded-lg border shadow-lg/5 bg-popover text-success',
      warning: 'rounded-lg border shadow-lg/5 bg-popover text-warning'
    }
  }
});

export const toastContentVariants = tv({
  base: 'relative overflow-hidden rounded-lg before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] dark:before:shadow-[0_-1px_--theme(--color-white/6%)]',
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
