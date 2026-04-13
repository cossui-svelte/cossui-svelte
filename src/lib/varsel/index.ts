/**
 * Public API of the Varsel library.
 * Exports the main components, functions, and types required to use the library.
 *
 * @module varsel
 */

export type {
  PositionedToast,
  SwipeAxis,
  SwipeDirection,
  ToastData,
  ToastInvoker,
  ToastPosition,
  ToastPromiseOptions,
  VarselItemContext
} from './internals';
export { toast } from './internals';
export { default as VarselToaster } from './VarselToaster.svelte';
