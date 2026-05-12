/**
 * Internal aggregation module.
 * Re-exports core functionality to simplify imports within the library.
 * This file is meant for internal package usage and shouldn't generally be imported directly by consumers.
 */

export { ANIMATION_CONFIG } from "./core/animations";
export {
	FOCUSABLE_SELECTORS,
	focusManager,
	isFocusVisible,
} from "./core/accessibility";
export { POSITION_CONFIGS, type ToastPosition } from "./core/positions";
export {
	SWIPE_DISMISS_THRESHOLD,
	SWIPE_DISMISS_VELOCITY,
	SWIPE_EXIT_DISTANCE,
	SWIPE_REVERSE_CANCEL_THRESHOLD,
	getDefaultSwipeDirections,
	type SwipeAxis,
	type SwipeDirection,
} from "./core/swipe";
export { toastContainerVariants, toastContentVariants } from "./core/variants";
export { cn } from "./core/utils";
export { toast } from "./core/toast-factory";
export { toastState } from "./core/toast-state";
export { toasterInstanceManager } from "./core/toaster-instances";
export type {
	ToastData,
	ToastInput,
	ToastInvoker,
	ToastPromiseOptions,
	ToastVariantInput,
	PositionedToast,
	VarselItemContext,
} from "./core/types";
