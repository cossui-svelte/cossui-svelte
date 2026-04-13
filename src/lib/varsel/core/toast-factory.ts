import type { Component } from "svelte";
import { toastState } from "./toast-state";
import type {
	PromiseToastState,
	ToastData,
	ToastInvoker,
	ToastPromiseOptions,
} from "./types";

/**
 * Helper to normalize string input into a ToastData object.
 */
const normalizeToastData = (
	data: Omit<ToastData, "id"> | string,
): Omit<ToastData, "id"> => {
	if (typeof data === "string") {
		return { description: data };
	}
	return data;
};

/**
 * Resolves the state of a promise-based toast (success or error) into actual toast data.
 */
const resolvePromiseState = async <Value>(
	value: Value,
	state: PromiseToastState<Value>,
): Promise<Omit<ToastData, "id">> => {
	const resolvedValue =
		typeof state === "function" ? await state(value) : await state;
	return normalizeToastData(resolvedValue);
};

const getPromiseFallbackDescription = (error: unknown): string => {
	if (error instanceof Error) {
		return error.message;
	}
	if (typeof error === "string") {
		return error;
	}
	return "An unknown error occurred while updating the notification.";
};

/**
 * The main entry point for creating toasts.
 * @param data - Toast configuration object or description string.
 * @returns The ID of the created toast.
 */
const createToast: ToastInvoker = ((data: Omit<ToastData, "id"> | string) => {
	return toastState.add(normalizeToastData(data));
}) as ToastInvoker;

/**
 * Creates a success variant toast.
 */
createToast.success = (
	data: Omit<ToastData, "id" | "variant"> | string,
): string => {
	if (typeof data === "string") {
		return toastState.add({ description: data, variant: "success" });
	}
	return toastState.add({ ...data, variant: "success" });
};

/**
 * Creates a warning variant toast.
 */
createToast.warning = (
	data: Omit<ToastData, "id" | "variant"> | string,
): string => {
	if (typeof data === "string") {
		return toastState.add({ description: data, variant: "warning" });
	}
	return toastState.add({ ...data, variant: "warning" });
};

/**
 * Creates an info variant toast.
 */
createToast.info = (
	data: Omit<ToastData, "id" | "variant"> | string,
): string => {
	if (typeof data === "string") {
		return toastState.add({ description: data, variant: "info" });
	}
	return toastState.add({ ...data, variant: "info" });
};

/**
 * Creates an error (destructive) variant toast.
 */
createToast.error = (
	data: Omit<ToastData, "id" | "variant"> | string,
): string => {
	if (typeof data === "string") {
		return toastState.add({ description: data, variant: "destructive" });
	}
	return toastState.add({ ...data, variant: "destructive" });
};

/**
 * Creates a custom component toast.
 * @param component - The Svelte component to render.
 * @param options - Additional options and props for the component.
 */
createToast.custom = (
	component, // Type inferred from ToastInvoker
	options,
): string => {
	return toastState.add({
		...(options ?? {}),
		component: component as Component<any>,
		variant: "custom",
	});
};

/**
 * Creates a toast that tracks a promise's lifecycle.
 * Updates automatically from loading -> success/error.
 *
 * @param promise - The promise to observe.
 * @param options - Configuration for loading, success, and error states.
 * @returns The ID of the toast.
 */
createToast.promise = <T, E = unknown>(
	promise: PromiseLike<T>,
	options: ToastPromiseOptions<T, E>,
): string => {
	const loadingData = normalizeToastData(options.loading);
	const toastId = toastState.add({
		...loadingData,
		duration: loadingData.duration ?? 0,
		isLoading: true,
		showClose: loadingData.showClose ?? true,
	});

	const handleResult = async <Value>(
		state: PromiseToastState<Value>,
		value: Value,
		defaultVariant?: ToastData["variant"],
	) => {
		const payload = await resolvePromiseState(value, state);
		toastState.update(toastId, {
			...payload,
			isLoading: false,
			duration: payload.duration,
			variant: payload.variant ?? defaultVariant,
			showClose: payload.showClose ?? true,
		});
	};

	const applyPromiseFallback = (error: unknown) => {
		toastState.update(toastId, {
			title: "Operation failed",
			description: getPromiseFallbackDescription(error),
			variant: "destructive",
			isLoading: false,
			showClose: true,
			duration: 5000,
		});
	};

	void Promise.resolve(promise)
		.then((value) => {
			return handleResult(options.success, value, "success");
		})
		.catch((error: E) => {
			return handleResult(options.error, error, "destructive");
		})
		.catch((error) => {
			applyPromiseFallback(error);
		});

	return toastId;
};

/**
 * Dismisses a toast by ID.
 */
createToast.dismiss = (id: string): void => {
	toastState.update(id, { shouldClose: true });
};

/**
 * Dismisses all active toasts.
 */
createToast.dismissAll = (): void => {
	toastState.dismissAll();
};

export const toast = createToast;
