/**
 * CSS selectors used to identify focusable elements within a toast.
 * Used for managing keyboard focus when interacting with toasts containing actions.
 */
export const FOCUSABLE_SELECTORS = [
	"button:not([disabled])",
	"input:not([disabled])",
	"textarea:not([disabled])",
	"select:not([disabled])",
	"a[href]",
	'[tabindex]:not([tabindex="-1"])',
].join(", ");