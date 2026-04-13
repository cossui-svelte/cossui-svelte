/**
 * Internal aggregation module.
 * Re-exports core functionality to simplify imports within the library.
 * This file is meant for internal package usage and shouldn't generally be imported directly by consumers.
 */

export { FOCUSABLE_SELECTORS } from './core/accessibility';
export { ANIMATION_CONFIG } from './core/animations';
export { POSITION_CONFIGS, type ToastPosition } from './core/positions';
export {
  getDefaultSwipeDirections,
  SWIPE_DISMISS_THRESHOLD,
  SWIPE_DISMISS_VELOCITY,
  SWIPE_EXIT_DISTANCE,
  type SwipeAxis,
  type SwipeDirection
} from './core/swipe';
export { toast } from './core/toast-factory';
export { toastState } from './core/toast-state';
export { toasterInstanceManager } from './core/toaster-instances';
export type {
  PositionedToast,
  ToastData,
  ToastInvoker,
  ToastPromiseOptions,
  VarselItemContext
} from './core/types';
export { cn } from './core/utils';
export {
  toastContainerVariants,
  toastContentVariants
} from './core/variants';
