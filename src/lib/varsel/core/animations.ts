/**
 * Global configuration constants for toast animations and stacking behavior.
 * These values control timing, spacing, scaling, and easing of toast transitions.
 */
export const ANIMATION_CONFIG = {
	/** Duration of the entry animation in seconds. */
	ENTER_DURATION: 0.75,
	/** Duration of the exit animation in seconds. */
	EXIT_DURATION: 0.75,
	/** Duration of the stack reorganization animation in seconds. */
	STACK_DURATION: 0.75,
	/** Vertical offset (in pixels) between stacked toasts in collapsed state. */
	STACK_OFFSET: 16,
	/** Vertical gap (in pixels) between toasts in expanded (hover) state. */
	EXPANDED_GAP: 12,
	/** Scale reduction factor for each subsequent toast in the stack. */
	SCALE_FACTOR: 0.04,
	/** Minimum scale value for the furthest toast in the stack. */
	MIN_SCALE: 0.92,
	/** Maximum number of toasts visible in the stack at once. */
	MAX_VISIBLE_TOASTS: 3,
	/** Base z-index for the toast layer. */
	Z_INDEX_BASE: 50,
	/** Default cubic-bezier easing function for animations. */
	EASING_DEFAULT: "var(--ease-vs-toast)",
	/** Easing function for exit animations. */
	EASING_EXIT: "var(--ease-vs-toast)",
} as const;