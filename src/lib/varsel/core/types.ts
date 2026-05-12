import type { VariantProps } from 'tailwind-variants';
import type { Component } from 'svelte'; // Use Component

import type { toastContainerVariants } from './variants';
import type { ToastPosition } from './positions';
import type { SwipeAxis, SwipeDirection } from './swipe';

/**
 * Represents the data structure for a single toast notification.
 */
export interface ToastData extends VariantProps<typeof toastContainerVariants> {
  /** Unique identifier for the toast. */
  id: string;
  /** The main title of the toast notification. */
  title?: string;
  /** Additional details or description displayed below the title. */
  description?: string;
  /** Optional CSS class to apply to the toast container. */
  className?: string;
  /**
   * Duration in milliseconds before the toast automatically closes.
   * Defaults to 5000ms. Set to `0` or `Infinity` to keep open indefinitely.
   */
  duration?: number;
  /** Whether the toast is in a loading state. */
  isLoading?: boolean;
  /** Whether to show the close button. Defaults to `true`. */
  showClose?: boolean;
  /** Optional action button to display within the toast. */
  action?: {
    /** Label for the action button. */
    label: string;
    /** Callback function executed when the action button is clicked. */
    onClick: () => void;
  };
  /** Callback fired when the toast finishes its auto-close timer. */
  onAutoClose?: () => void;
  /** Callback fired when the toast is dismissed manually (button, swipe, `toast.dismiss`, etc.). */
  onDismiss?: () => void;
  /** Internal flag: signals that the toast should begin its closing animation. */
  shouldClose?: boolean;
  /** Internal flag: signals that the toast is currently leaving the DOM. */
  isLeaving?: boolean;
  /** The position on the screen where this toast should appear. */
  position?: ToastPosition;
  /**
   * Announcement priority for assistive technology.
   * - `"low"` (default) renders the toast as a `dialog` (or `alertdialog` for
   *   the destructive variant) and relies on the existing `aria-live` region
   *   for announcements.
   * - `"high"` additionally mounts a visually-hidden `role="alert"` mirror
   *   alongside the toast, so screen readers announce the message
   *   immediately even while the main toast has not received focus.
   */
  priority?: 'low' | 'high';
  /** Custom Svelte component to render instead of the default toast layout. */
  component?: Component<any>; // Use Component<any> for storage
  /** Props to pass to the custom component. */
  componentProps?: Record<string, any>;
}

/**
 * Represents the possible states for a promise-based toast.
 * Can be a static message string, a ToastData object (minus ID), or a function returning one of those.
 */
export type PromiseToastState<Value> =
  | string
  | Omit<ToastData, 'id'>
  | ((
      value: Value
    ) => string | Omit<ToastData, 'id'> | PromiseLike<string | Omit<ToastData, 'id'>>);

/**
 * Options for the `toast.promise` function.
 */
export type ToastPromiseOptions<SuccessValue = unknown, ErrorValue = unknown> = {
  /** The message or data to show while the promise is pending. */
  loading: Omit<ToastData, 'id'> | string;
  /** The message or data to show when the promise resolves successfully. */
  success: PromiseToastState<SuccessValue>;
  /** The message or data to show when the promise rejects. */
  error: PromiseToastState<ErrorValue>;
};

/**
 * The interface for the main `toast` function and its utility methods.
 */
/**
 * Optional shape passed to the `toast()` invoker. `id` is optional and,
 * when provided, makes the call upsert the matching toast in place
 * instead of creating a new one.
 */
export type ToastInput = Omit<ToastData, 'id'> & { id?: string };
/** Same as {@link ToastInput} for variant helpers — `variant` is fixed by the helper. */
export type ToastVariantInput = Omit<ToastData, 'id' | 'variant'> & { id?: string };

export type ToastInvoker = {
  /**
   * Creates a default toast notification, or updates an existing one when
   * `data.id` matches an active toast.
   * @param data - The toast options or description string.
   * @returns The ID of the created or updated toast.
   */
  (data: ToastInput | string): string;
  /**
   * Creates a success toast notification.
   */
  success: (data: ToastVariantInput | string) => string;
  /**
   * Creates a warning toast notification.
   */
  warning: (data: ToastVariantInput | string) => string;
  /**
   * Creates an info toast notification.
   */
  info: (data: ToastVariantInput | string) => string;
  /**
   * Creates an error toast notification.
   */
  error: (data: ToastVariantInput | string) => string;
  /**
   * Creates a custom component toast.
   * @param component - The Svelte component to render.
   * @param options - Additional options and props for the component.
   */
  custom: <Props extends Record<string, any> = Record<string, any>>(
    component: Component<Props>,
    options?: Omit<ToastData, 'id' | 'component' | 'variant' | 'componentProps'> & {
      id?: string;
      componentProps?: Omit<Props, 'id' | 'toast'>;
    }
  ) => string;
  /**
   * Creates a toast that updates based on the state of a Promise.
   * @param promise - The promise to track.
   * @param options - Configuration for loading, success, and error states.
   * @returns A promise that resolves with the original value or rejects with
   *          the original error, so callers can `await` the underlying work.
   */
  promise: <T, E = unknown>(
    promise: PromiseLike<T>,
    options: ToastPromiseOptions<T, E>
  ) => Promise<T>;
  /**
   * Updates an existing toast in place. Useful for streaming progress
   * messages or replacing a loading toast without flicker.
   * @param id - The ID returned when the toast was created.
   * @param data - Partial data to merge into the existing toast. Pass a
   *   string as shorthand for `{ description }`.
   */
  update: (id: string, data: Partial<Omit<ToastData, 'id'>> | string) => void;
  /**
   * Dismisses a specific toast by its ID.
   * @param id - The ID of the toast to dismiss.
   */
  dismiss: (id: string) => void;
  /**
   * Dismisses all currently active toasts.
   */
  dismissAll: () => void;
};

/**
 * Extends `ToastData` with positioning information for rendering.
 */
export type PositionedToast = ToastData & {
  /** The visual index of the toast in the stack. */
  index: number;
  /** The render order index (z-index calculation base). */
  renderIndex: number;
  /** Total number of toasts in the current group. */
  total: number;
};

/**
 * Context provided to toast items (mostly for internal use).
 */
export interface VarselItemContext {
  toast: PositionedToast;
  onRemove: (id: string) => void;
  isGroupHovered?: boolean;
  expandedOffset?: number;
  expandedGap?: number;
  collapsedOffset?: number;
  hiddenCollapsedOffset?: number;
  onHeightChange?: (id: string, height: number) => void;
  onGroupHoverEnter?: () => void;
}

/** Function signature for toast state subscribers. */
export type ToastSubscriber = (toasts: ToastData[]) => void;

export type { ToastPosition, SwipeAxis, SwipeDirection };
