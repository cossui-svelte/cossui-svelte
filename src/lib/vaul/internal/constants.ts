export const TRANSITIONS = {
	DURATION: 0.5,
	EASE: [0.32, 0.72, 0, 1],
};

export const TRANSITION_TIMING = `cubic-bezier(${TRANSITIONS.EASE.join(",")})`;
export const TRANSFORM_TRANSITION = `transform ${TRANSITIONS.DURATION}s ${TRANSITION_TIMING}`;
export const OPACITY_TRANSITION = `opacity ${TRANSITIONS.DURATION}s ${TRANSITION_TIMING}`;

export const VELOCITY_THRESHOLD = 0.4;

/** Fraction of drawer height that must be dragged to trigger close */
export const CLOSE_THRESHOLD = 0.25;

/** Time (ms) after scrolling during which dragging is disabled */
export const SCROLL_LOCK_TIMEOUT = 100;

/** Border radius (px) applied to the wrapper when background is scaled */
export const BORDER_RADIUS = 8;

/** Displacement (px) applied to parent drawer when a nested drawer opens */
export const NESTED_DISPLACEMENT = 16;

/** Offset (px) from window top used when calculating the background scale factor */
export const WINDOW_TOP_OFFSET = 26;

/** CSS class added to the drawer element during an active drag */
export const DRAG_CLASS = "vaul-dragging";
