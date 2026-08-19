import { Toast as ToastPrimitive } from '@shardsui/svelte/toast';
import type { ComponentProps } from 'svelte';

export type {
  ToastManagerAddOptions,
  ToastManagerPromiseOptions,
  ToastManagerUpdateOptions,
  ToastObject
} from '@shardsui/svelte/toast';

export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export type ToastData = {
  rootProps?: Omit<
    ComponentProps<typeof ToastPrimitive.Root>,
    'children' | 'class' | 'swipeDirection' | 'toast'
  >;
  tooltipStyle?: boolean;
};

export const toastManager = new ToastPrimitive.Manager<ToastData>();

export const anchoredToastManager = new ToastPrimitive.Manager<ToastData>();
