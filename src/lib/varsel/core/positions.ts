/**
 * Configuration for initial animation states based on toast position.
 * Defines the starting transform values (x, y) for entering and exiting toasts.
 */
export const POSITION_CONFIGS = {
	"top-left": {
		animateIn: { x: -100, y: -20 },
		animateOut: { x: -100, y: -100 },
	},
	"top-center": {
		animateIn: { x: 0, y: -100 },
		animateOut: { x: 0, y: -100 },
	},
	"top-right": {
		animateIn: { x: 100, y: -20 },
		animateOut: { x: 100, y: -100 },
	},
	"bottom-left": {
		animateIn: { x: -100, y: 20 },
		animateOut: { x: -100, y: 100 },
	},
	"bottom-center": {
		animateIn: { x: 0, y: 100 },
		animateOut: { x: 0, y: 100 },
	},
	"bottom-right": {
		animateIn: { x: 100, y: 20 },
		animateOut: { x: 100, y: 100 },
	},
} as const;

/**
 * Available positions for the toaster on the screen.
 */
export type ToastPosition =
	| "top-left"
	| "top-center"
	| "top-right"
	| "bottom-left"
	| "bottom-center"
	| "bottom-right";