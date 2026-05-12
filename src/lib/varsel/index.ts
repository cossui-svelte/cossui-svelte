/**
 * Public API of the Varsel library.
 * Exports the main components, functions, and types required to use the library.
 *
 * @module varsel
 */

export { default as VarselToaster } from "./VarselToaster.svelte";
export { toast } from "./internals";
export type {
	ToastData,
	ToastInput,
	ToastInvoker,
	ToastPosition,
	ToastVariantInput,
	SwipeAxis,
	SwipeDirection,
	PositionedToast,
	VarselItemContext,
	ToastPromiseOptions,
} from "./internals";
