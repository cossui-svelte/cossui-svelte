import type { VariantProps } from "class-variance-authority";
import type { Component } from "svelte"; // Use Component

import type { toastContainerVariants } from "./variants";
import type { ToastPosition } from "./positions";
import type { SwipeAxis, SwipeDirection } from "./swipe";

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
	| Omit<ToastData, "id">
	| ((
			value: Value,
		) => string | Omit<ToastData, "id"> | PromiseLike<string | Omit<ToastData, "id">>);

/**
 * Options for the `toast.promise` function.
 */
export type ToastPromiseOptions<
	SuccessValue = unknown,
	ErrorValue = unknown,
> = {
	/** The message or data to show while the promise is pending. */
	loading: Omit<ToastData, "id"> | string;
	/** The message or data to show when the promise resolves successfully. */
	success: PromiseToastState<SuccessValue>;
	/** The message or data to show when the promise rejects. */
	error: PromiseToastState<ErrorValue>;
};

/**
 * The interface for the main `toast` function and its utility methods.
 */
export type ToastInvoker = {
	/**
	 * Creates a default toast notification. 
	 * @param data - The toast options or description string.
	 * @returns The ID of the created toast.
	 */
	(data: Omit<ToastData, "id"> | string): string;
	/**
	 * Creates a success toast notification.
	 */
	success: (data: Omit<ToastData, "id" | "variant"> | string) => string;
	/**
	 * Creates a warning toast notification.
	 */
	warning: (data: Omit<ToastData, "id" | "variant"> | string) => string;
	/**
	 * Creates an info toast notification.
	 */
	info: (data: Omit<ToastData, "id" | "variant"> | string) => string;
	/**
	 * Creates an error toast notification.
	 */
	error: (data: Omit<ToastData, "id" | "variant"> | string) => string;
	/**
	 * Creates a custom component toast.
	 * @param component - The Svelte component to render.
	 * @param options - Additional options and props for the component.
	 */
	custom: <Props extends Record<string, any> = Record<string, any>>(
		component: Component<Props>,
		options?: Omit<ToastData, "id" | "component" | "variant" | "componentProps"> & {
			componentProps?: Omit<Props, "id" | "toast">;
		},
	) => string;
	/**
	 * Creates a toast that updates based on the state of a Promise.
	 * @param promise - The promise to track.
	 * @param options - Configuration for loading, success, and error states.
	 * @returns The ID of the toast.
	 */
	promise: <T, E = unknown>(
		promise: PromiseLike<T>,
		options: ToastPromiseOptions<T, E>,
	) => string;
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
