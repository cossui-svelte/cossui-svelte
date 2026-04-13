import type { ToastPosition } from "./positions";

/** Directions in which a toast can be swiped to dismiss. */
export type SwipeDirection = "top" | "bottom" | "left" | "right";
/** Axes along which swipe gestures are tracked. */
export type SwipeAxis = "x" | "y";

/** Minimum pixel distance required to trigger a swipe dismissal. */
export const SWIPE_DISMISS_THRESHOLD = 45;
/** Minimum velocity (pixels/ms) required to trigger a swipe dismissal. */
export const SWIPE_DISMISS_VELOCITY = 0.11;
/** Distance in pixels to move the toast during the exit animation after a swipe. */
export const SWIPE_EXIT_DISTANCE = 600;

/**
 * Determines the allowed swipe directions based on the toast's position.
 * For example, a "top-right" toast can be swiped "top" or "right".
 *
 * @param position - The toast's position on screen.
 * @returns An array of allowed swipe directions.
 */
export const getDefaultSwipeDirections = (
	position?: ToastPosition | null,
): SwipeDirection[] => {
	if (!position) {
		return ["top", "bottom", "left", "right"];
	}

	const [vertical, horizontal] = position.split("-") as [
		string,
		string | undefined,
	];
	const directions: SwipeDirection[] = [];

	if (vertical === "top" || vertical === "bottom") {
		directions.push(vertical);
	}

	if (horizontal === "left" || horizontal === "right") {
		directions.push(horizontal);
	}

	if (directions.length === 0) {
		directions.push("top", "bottom");
	}

	return directions;
};