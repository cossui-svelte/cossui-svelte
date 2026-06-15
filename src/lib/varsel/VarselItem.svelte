<script lang="ts">
	/**
	 * @component
	 * @description
	 * Individual toast component. Handles its own enter/exit animations,
	 * swipe-to-dismiss gestures, auto-closing timer, and rendering of content.
	 */
	import { onDestroy, onMount } from "svelte";
	import { buttonVariants } from "$lib/components/ui/button";
	import {
		ANIMATION_CONFIG,
		FOCUSABLE_SELECTORS,
		focusManager,
		isFocusVisible,
		POSITION_CONFIGS,
		SWIPE_DISMISS_THRESHOLD,
		SWIPE_DISMISS_VELOCITY,
		SWIPE_EXIT_DISTANCE,
		SWIPE_REVERSE_CANCEL_THRESHOLD,
		cn,
		getDefaultSwipeDirections,
		toastContainerVariants,
		toastContentVariants,
		toastState,
		type PositionedToast,
		type ToastPosition,
		type SwipeAxis,
		type SwipeDirection,
	} from "./internals";
	import { hasVariantIcon, variantIconMap } from "./variant-icons";
	import type { IconElement } from "./variant-icons";

	let {
		toast,
		onRemove,
		isGroupHovered = false,
		expandedOffset = 0,
		expandedGap = ANIMATION_CONFIG.EXPANDED_GAP,
		collapsedOffset = undefined,
		hiddenCollapsedOffset = undefined,
		onHeightChange = undefined,
		onGroupHoverEnter = undefined,
		onGroupHoldChange = undefined,
		defaultDuration = 5000,
		defaultShowClose = true,
		pauseOnHover = true,
		offset = undefined,
		expand = true,
		visibleToasts = ANIMATION_CONFIG.MAX_VISIBLE_TOASTS,
		isWindowFocused = true,
	}: {
		toast: PositionedToast;
		onRemove: (id: string) => void;
		isGroupHovered?: boolean;
		expandedOffset?: number;
		expandedGap?: number;
		collapsedOffset?: number;
		hiddenCollapsedOffset?: number;
		onHeightChange?: (id: string, height: number) => void;
		onGroupHoverEnter?: () => void;
		onGroupHoldChange?: (holding: boolean) => void;
		defaultDuration?: number;
		defaultShowClose?: boolean;
		pauseOnHover?: boolean;
		offset?: number | string;
		expand?: boolean;
		visibleToasts?: number;
		isWindowFocused?: boolean;
	} = $props();

	let id = $derived(toast.id);
	let title = $derived(toast.title);
	let description = $derived(toast.description);
	let variant = $derived(toast.variant || "default");
	let duration = $derived(toast.duration ?? defaultDuration);
	let action = $derived(toast.action);
	let isLoading = $derived(toast.isLoading || false);
	let index = $derived(toast.index);
	let renderIndex = $derived(toast.renderIndex);
	let shouldClose = $derived(toast.shouldClose);
	let position = $derived(toast.position || "bottom-center");
	let className = $derived(toast.className || "");
	let onAutoClose = $derived(toast.onAutoClose);
	let onDismiss = $derived(toast.onDismiss);
	let showClose = $derived(toast.showClose ?? defaultShowClose);
	let priority = $derived(toast.priority ?? "low");

	let toastRef = $state<HTMLDivElement | null>(null);
	let isItemHovered = $state(false);
	let isItemFocusVisible = $state(false);
	let isSwiping = $state(false);
	let swipeDismissDirection = $state<SwipeDirection | null>(null);
	let animationState = $state<"entering" | "entered" | "exiting" | "stacking">(
		"entering",
	);

	let timeoutRef: ReturnType<typeof setTimeout> | null = null;
	let timerStartRef: number | null = null;
	let remainingTime = $state<number | null>(Number.NaN);
	let enterAnimationFrame: number | null = null;
	let focusTimeout: ReturnType<typeof setTimeout> | null = null;
	let pointerStart: { x: number; y: number } | null = null;
	let dragStartTime: number | null = null;
	let swipeAxis: SwipeAxis | null = null;
	let lastSwipe = { x: 0, y: 0 };
	let maxSwipeDisplacement = 0;
	let swipeCancelled = false;
	let mounted = $state(false);
	let prevShouldClose = false;
	let previousDuration: number | undefined;
	let isExiting = $state(false);
	let exitAnimationComplete = false;
	let hasAnimatedIn = $state(false);
	let isPointerHeld = false;
	type SpinnerState = "hidden" | "loading" | "finishing";
	let spinnerState = $state<SpinnerState>("hidden");
	let spinnerFinishTimer: ReturnType<typeof setTimeout> | null = null;
	let hasShownSpinner = $state(false);

	type LineElement = Extract<IconElement, { tag: "line" }>;

	$effect(() => {
		if (isLoading) {
			hasShownSpinner = true;
		}
	});

	$effect(() => {
		if (isLoading) {
			spinnerState = "loading";
		} else if (spinnerState === "loading") {
			spinnerState = "finishing";
		}
	});

	$effect(() => {
		if (spinnerState === "finishing") {
			if (!spinnerFinishTimer) {
				spinnerFinishTimer = setTimeout(() => {
					spinnerState = "hidden";
					spinnerFinishTimer = null;
				}, 420);
			}
		} else if (spinnerFinishTimer) {
			clearTimeout(spinnerFinishTimer);
			spinnerFinishTimer = null;
		}
	});

	let shouldRenderSpinner = $derived(spinnerState !== "hidden");

	const handleSpinnerAnimationEnd = (event: AnimationEvent) => {
		if (event.animationName !== "vs-spinner-finish") return;
		spinnerState = "hidden";
	};

	let iconConfig = $derived(
		hasVariantIcon(variant) ? variantIconMap[variant] : undefined,
	);
	let showStatusIcon = $derived(isLoading || Boolean(iconConfig));

	let iconStateClass = $derived(
		!iconConfig
			? undefined
			: !hasShownSpinner
				? "vs-icon--static"
				: isLoading
					? "vs-icon--waiting"
					: "vs-icon--pop",
	);

	const clearSwipeRefs = () => {
		pointerStart = null;
		dragStartTime = null;
		swipeAxis = null;
		lastSwipe = { x: 0, y: 0 };
		maxSwipeDisplacement = 0;
		swipeCancelled = false;
	};

	const getFocusableElements = () => {
		if (!toastRef) return [];
		return Array.from(toastRef.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS));
	};

	type CloseReason = "auto" | "dismiss" | null;
	let closeReason: CloseReason = null;

	const handleTransitionEnd = (event: TransitionEvent) => {
		if (event.target !== toastRef) return;
		if (event.propertyName !== "opacity" && event.propertyName !== "transform") return;
		if (animationState !== "exiting") return;
		if (exitAnimationComplete) return;

		exitAnimationComplete = true;
		if (closeReason === "auto") {
			onAutoClose?.();
		} else if (closeReason === "dismiss") {
			onDismiss?.();
		}
		onRemove(id);
	};

	const shiftFocusOnDismiss = () => {
		if (!toastRef || typeof document === "undefined") return;
		const active = document.activeElement;
		if (!(active instanceof HTMLElement)) return;
		if (!toastRef.contains(active)) return;

		const siblings = Array.from(
			document.querySelectorAll<HTMLElement>("[data-toast-id]"),
		).filter(
			(el) =>
				el !== toastRef &&
				el.getAttribute("data-limited") !== "true" &&
				!el.hasAttribute("inert"),
		);
		const next = siblings[0];
		if (next) {
			const focusable = next.querySelector<HTMLElement>(FOCUSABLE_SELECTORS);
			const target = focusable ?? next;
			try {
				target.focus({ preventScroll: true });
			} catch {
				target.focus();
			}
			return;
		}

		if (focusManager.isClaimed()) {
			focusManager.restoreFocusToPrevElement();
		} else {
			active.blur();
		}
	};

	const handleClose = (reason: Exclude<CloseReason, null> = "dismiss") => {
		if (!toastRef || isExiting) return;

		shiftFocusOnDismiss();

		isExiting = true;
		exitAnimationComplete = false;
		closeReason = reason;

		toastState.update(id, { shouldClose: true });

		if (enterAnimationFrame) {
			cancelAnimationFrame(enterAnimationFrame);
			enterAnimationFrame = null;
		}

		if (timeoutRef) {
			clearTimeout(timeoutRef);
			timeoutRef = null;
		}

		animationState = "exiting";
		toastState.update(id, { shouldClose: true, isLeaving: true });
	};

	$effect(() => {
		const desiredClose = Boolean(shouldClose);
		if (desiredClose && !prevShouldClose) {
			handleClose();
		}
		prevShouldClose = desiredClose;
	});

	onMount(() => {
		mounted = true;
		return () => {
			mounted = false;
			if (enterAnimationFrame) cancelAnimationFrame(enterAnimationFrame);
			if (timeoutRef) clearTimeout(timeoutRef);
			if (focusTimeout) clearTimeout(focusTimeout);
		};
	});

	onDestroy(() => {
		if (enterAnimationFrame) cancelAnimationFrame(enterAnimationFrame);
		if (timeoutRef) clearTimeout(timeoutRef);
		if (focusTimeout) clearTimeout(focusTimeout);
		if (spinnerFinishTimer) {
			clearTimeout(spinnerFinishTimer);
			spinnerFinishTimer = null;
		}
		if (isPointerHeld) {
			isPointerHeld = false;
			onGroupHoldChange?.(false);
		}
	});

	$effect(() => {
		if (mounted && duration !== previousDuration) {
			remainingTime = duration;
			previousDuration = duration;
		}
	});

	$effect(() => {
		if (mounted) {
			if (!toastRef || !onHeightChange) {
				// do nothing
			} else {
				const el = toastRef;
				const notify = () => onHeightChange?.(id, el.offsetHeight);
				const ro = new ResizeObserver(() => notify());
				ro.observe(el);
				notify();
				return () => ro.disconnect();
			}
		}
	});

	const setFocusToToast = () => {
		if (!toastRef) return;
		const focusableElements = getFocusableElements();
		const firstFocusable = focusableElements[0];
		if (firstFocusable) {
			firstFocusable.focus();
			return;
		}
		toastRef.focus();
	};

	$effect(() => {
		if (mounted && toastRef && !isExiting) {
			if (!hasAnimatedIn && isLatest) {
				hasAnimatedIn = true;
				animationState = "entering";
				if (enterAnimationFrame) {
					cancelAnimationFrame(enterAnimationFrame);
				}
				enterAnimationFrame = requestAnimationFrame(() => {
					enterAnimationFrame = requestAnimationFrame(() => {
						animationState = "entered";
						if (action) {
							if (focusTimeout) clearTimeout(focusTimeout);
							focusTimeout = setTimeout(
								() => setFocusToToast(),
								ANIMATION_CONFIG.ENTER_DURATION * 1000,
							);
						}
					});
				});
			} else if (hasAnimatedIn) {
				if (animationState !== "stacking" || index > 0) {
					animationState = "stacking";
				}
			} else {
				animationState = "stacking";
			}
		}
	});

	$effect(() => {
		if (mounted) {
			if (shouldClose || !hasAnimatedIn || duration <= 0) {
				if (timeoutRef) {
					clearTimeout(timeoutRef);
					timeoutRef = null;
				}
				timerStartRef = null;
			} else {
				if (remainingTime == null || Number.isNaN(remainingTime)) {
					remainingTime = duration;
				}

				const isHovering = isGroupHovered || isItemHovered;
				const isPaused =
					(pauseOnHover && isHovering) ||
					isItemFocusVisible ||
					isSwiping ||
					hiddenByStacking ||
					!isWindowFocused;

				if (isPaused) {
					if (timeoutRef) {
						clearTimeout(timeoutRef);
						timeoutRef = null;
					}
					if (timerStartRef !== null) {
						const elapsed = Date.now() - timerStartRef;
						remainingTime = Math.max(0, (remainingTime ?? duration) - elapsed);
						timerStartRef = null;
					}
				} else {
					if (!timeoutRef) {
						const ms = Math.max(0, remainingTime ?? duration);
						if (!Number.isFinite(ms)) {
							// Do not set timeout for infinite duration
						} else if (ms === 0) {
							handleClose("auto");
						} else {
							timerStartRef = Date.now();
							timeoutRef = setTimeout(() => {
								handleClose("auto");
							}, ms);
						}
					}
				}
			}
		}
	});

	$effect(() => {
		if (mounted && toastRef && !isSwiping && !swipeDismissDirection) {
			toastRef.style.setProperty("--swipe-translate-x", "0px");
			toastRef.style.setProperty("--swipe-translate-y", "0px");
		}
	});

	let swipeDirections = $derived(showClose ? getDefaultSwipeDirections(position) : []);

	const handlePointerDown = (event: PointerEvent) => {
		if (!showClose) return;
		if (event.pointerType === "mouse" && event.button !== 0) return;
		if (event.button === 2) return;
		if (isExiting) return;

		const target = event.target as HTMLElement;
		if (target.closest("button, a, input, textarea, select")) {
			return;
		}

		clearSwipeRefs();
		pointerStart = { x: event.clientX, y: event.clientY };
		dragStartTime = Date.now();
		if (toastRef) {
			toastRef.style.setProperty("--swipe-translate-x", "0px");
			toastRef.style.setProperty("--swipe-translate-y", "0px");
		}
		swipeDismissDirection = null;
		isSwiping = true;
		if (!isPointerHeld) {
			isPointerHeld = true;
			onGroupHoldChange?.(true);
		}
		const currentTarget = event.currentTarget as HTMLElement | null;
		currentTarget?.setPointerCapture(event.pointerId);
	};

	const handlePointerMove = (event: PointerEvent) => {
		if (!showClose) return;
		if (!pointerStart) return;
		if (isExiting) return;

		if (event.pointerType === "touch") {
			event.preventDefault();
		}

		const xDelta = event.clientX - pointerStart.x;
		const yDelta = event.clientY - pointerStart.y;

		let axis = swipeAxis;
		if (!axis) {
			if (Math.abs(xDelta) > 1 || Math.abs(yDelta) > 1) {
				axis = Math.abs(xDelta) > Math.abs(yDelta) ? "x" : "y";
				swipeAxis = axis;
			} else {
				return;
			}
		}

		const dampen = (delta: number) => {
			const factor = Math.abs(delta) / 20;
			return delta * (1 / (1.5 + factor));
		};

		let nextX = 0;
		let nextY = 0;

		if (axis === "x") {
			const allowLeft = swipeDirections.includes("left");
			const allowRight = swipeDirections.includes("right");
			if (!allowLeft && !allowRight) {
				swipeAxis = "y";
				axis = "y";
			} else if ((allowLeft && xDelta < 0) || (allowRight && xDelta > 0)) {
				nextX = xDelta;
			} else {
				nextX = dampen(xDelta);
			}
		}

		if (axis === "y") {
			const allowTop = swipeDirections.includes("top");
			const allowBottom = swipeDirections.includes("bottom");
			if (!allowTop && !allowBottom) {
				swipeAxis = "x";
			} else if ((allowTop && yDelta < 0) || (allowBottom && yDelta > 0)) {
				nextY = yDelta;
			} else {
				nextY = dampen(yDelta);
			}
		}

		lastSwipe = { x: nextX, y: nextY };

		const displacement = axis === "x" ? Math.abs(nextX) : Math.abs(nextY);
		if (displacement > maxSwipeDisplacement) {
			maxSwipeDisplacement = displacement;
		}
		if (displacement >= SWIPE_DISMISS_THRESHOLD) {
			swipeCancelled = false;
		} else if (maxSwipeDisplacement - displacement >= SWIPE_REVERSE_CANCEL_THRESHOLD) {
			swipeCancelled = true;
		}

		if (toastRef) {
			toastRef.style.setProperty("--swipe-translate-x", `${nextX}px`);
			toastRef.style.setProperty("--swipe-translate-y", `${nextY}px`);
		}
	};

	const handlePointerUp = (event: PointerEvent) => {
		if (!showClose) return;
		const currentTarget = event.currentTarget as HTMLElement | null;
		if (currentTarget?.hasPointerCapture(event.pointerId)) {
			currentTarget.releasePointerCapture(event.pointerId);
		}

		if (!pointerStart) {
			swipeDismissDirection = null;
			isSwiping = false;
			clearSwipeRefs();
			return;
		}

		const elapsed = dragStartTime ? Date.now() - dragStartTime : 0;

		const axis = swipeAxis;
		const { x, y } = lastSwipe;
		let dismissed = false;

		if (axis && !swipeCancelled) {
			const distance = axis === "x" ? x : y;
			const velocity = elapsed > 0 ? Math.abs(distance) / elapsed : 0;
			const meetsThreshold =
				Math.abs(distance) >= SWIPE_DISMISS_THRESHOLD ||
				velocity > SWIPE_DISMISS_VELOCITY;

			if (meetsThreshold && Math.abs(distance) > 0) {
				let direction: SwipeDirection;
				if (axis === "x") {
					direction = distance > 0 ? "right" : "left";
				} else {
					direction = distance > 0 ? "bottom" : "top";
				}

				if (swipeDirections.includes(direction)) {
					swipeDismissDirection = direction;
					dismissed = true;
					handleClose();
				}
			}
		}

		if (!dismissed) {
			swipeDismissDirection = null;
		}

		isSwiping = false;
		clearSwipeRefs();
		if (isPointerHeld) {
			isPointerHeld = false;
			onGroupHoldChange?.(false);
		}
	};

	const handlePointerCancel = (event: PointerEvent) => {
		if (!showClose) return;
		const currentTarget = event.currentTarget as HTMLElement | null;
		if (currentTarget?.hasPointerCapture(event.pointerId)) {
			currentTarget.releasePointerCapture(event.pointerId);
		}
		swipeDismissDirection = null;
		isSwiping = false;
		clearSwipeRefs();
		if (isPointerHeld) {
			isPointerHeld = false;
			onGroupHoldChange?.(false);
		}
	};

	const zIndexBase = Number(ANIMATION_CONFIG.Z_INDEX_BASE);

	let isTopPosition = $derived(position?.startsWith("top-") ?? false);
	let maxVisibleIndex = $derived(Math.max(0, visibleToasts - 1));
	let visibleIndex = $derived(Math.min(index, maxVisibleIndex));
	let defaultCollapsedOffset = $derived(
		isTopPosition
			? index * ANIMATION_CONFIG.STACK_OFFSET
			: -(index * ANIMATION_CONFIG.STACK_OFFSET),
	);
	let resolvedCollapsedOffset = $derived(
		typeof collapsedOffset === "number" && Number.isFinite(collapsedOffset)
			? collapsedOffset
			: defaultCollapsedOffset,
	);
	let resolvedHiddenCollapsedOffset = $derived(
		typeof hiddenCollapsedOffset === "number" && Number.isFinite(hiddenCollapsedOffset)
			? hiddenCollapsedOffset
			: resolvedCollapsedOffset,
	);
	let scale = $derived(
		Math.max(ANIMATION_CONFIG.MIN_SCALE, 1 - index * ANIMATION_CONFIG.SCALE_FACTOR),
	);
	let visibleScale = $derived(
		Math.max(
			ANIMATION_CONFIG.MIN_SCALE,
			1 - visibleIndex * ANIMATION_CONFIG.SCALE_FACTOR,
		),
	);
	let zIndex = $derived(zIndexBase - renderIndex);
	let stackHidden = $derived(index >= visibleToasts);
	let hiddenByStacking = $derived(stackHidden && animationState !== "exiting");
	let isStackLeader = $derived(index === 0);
	let isLatest = $derived(isStackLeader && !shouldClose);
	let config = $derived(
		POSITION_CONFIGS[(position ?? "bottom-center") as ToastPosition],
	);

	let transformStyle = $derived.by(() => {
		const baseOffsetY = stackHidden
			? resolvedHiddenCollapsedOffset
			: resolvedCollapsedOffset;
		const promotionOffset =
			typeof expandedGap === "number" ? expandedGap : ANIMATION_CONFIG.EXPANDED_GAP;
		const expandedTranslateY = isTopPosition ? expandedOffset : -expandedOffset;
		const hiddenExpandedTranslateY = expandedTranslateY - promotionOffset;

		let translateX = 0;
		let translateY = baseOffsetY;
		let scaleValue = stackHidden
			? visibleIndex === 0
				? 1
				: visibleScale
			: isStackLeader
				? 1
				: scale;
		let opacityValue = stackHidden ? 0 : 1;

		if (stackHidden) {
			if (expand && isGroupHovered && animationState !== "exiting") {
				translateX = 0;
				translateY = hiddenExpandedTranslateY;
				scaleValue = 1;
			}
		} else if (expand && isGroupHovered && animationState !== "exiting") {
			translateX = 0;
			translateY = expandedTranslateY;
			scaleValue = 1;
			opacityValue = 1;
		} else {
			switch (animationState) {
				case "entering":
					translateX = config.animateIn.x;
					translateY = config.animateIn.y;
					scaleValue = 1;
					opacityValue = 0;
					break;
				case "entered":
					translateX = 0;
					translateY = baseOffsetY;
					scaleValue = 1;
					opacityValue = 1;
					break;
				case "exiting": {
					scaleValue = 1;
					opacityValue = 0;
					if (swipeDismissDirection) {
						switch (swipeDismissDirection) {
							case "left":
								translateX = -SWIPE_EXIT_DISTANCE;
								translateY = 0;
								break;
							case "right":
								translateX = SWIPE_EXIT_DISTANCE;
								translateY = 0;
								break;
							case "top":
								translateX = 0;
								translateY = -SWIPE_EXIT_DISTANCE;
								break;
							case "bottom":
								translateX = 0;
								translateY = SWIPE_EXIT_DISTANCE;
								break;
							default:
								translateX = config.animateOut.x;
								translateY = config.animateOut.y;
								break;
						}
					} else {
						translateX = config.animateOut.x;
						translateY = config.animateOut.y;
					}
					break;
				}
				default:
					translateX = 0;
					translateY = baseOffsetY;
					scaleValue = isStackLeader ? 1 : scale;
					opacityValue = stackHidden ? 0 : 1;
					break;
			}
		}

		const transform = `translate(calc(${translateX}px + var(--swipe-translate-x, 0px)), calc(${translateY}px + var(--swipe-translate-y, 0px))) scale(${scaleValue})`;

		return {
			transform,
			opacity: opacityValue,
		};
	});

	let transitionDuration = $derived.by(() => {
		switch (animationState) {
			case "entering":
			case "entered":
				return `${ANIMATION_CONFIG.ENTER_DURATION}s`;
			case "exiting":
				return `${ANIMATION_CONFIG.EXIT_DURATION}s`;
			default:
				return `${ANIMATION_CONFIG.STACK_DURATION}s`;
		}
	});

	let transitionTimingFunction = $derived(
		animationState === "exiting"
			? ANIMATION_CONFIG.EASING_EXIT
			: ANIMATION_CONFIG.EASING_DEFAULT,
	);

	let canSwipe = $derived(showClose && swipeDirections.length > 0);
	let swipeCursorClass = $derived(
		canSwipe ? (isSwiping ? "cursor-grabbing" : "cursor-grab") : undefined,
	);

	let titleId = $derived(title ? `${id}-title` : undefined);
	let descriptionId = $derived(description ? `${id}-desc` : undefined);
	let dialogRole = $derived(
		variant === "destructive" || priority === "high" ? "alertdialog" : "dialog",
	);
	let livePoliteness = $derived(
		(variant === "destructive" || priority === "high" ? "assertive" : "polite") as
			| "assertive"
			| "polite",
	);

	let offsetStyle = $derived.by(() => {
		if (offset === undefined) return undefined;
		const val = typeof offset === "number" ? `${offset}px` : offset;
		if (position.startsWith("top")) return `top: ${val};`;
		if (position.startsWith("bottom")) return `bottom: ${val};`;
		return undefined;
	});

	const handleBlurCapture = (event: FocusEvent) => {
		const next = event.relatedTarget as Node | null;
		if (!toastRef || !next || !toastRef.contains(next)) {
			isItemFocusVisible = false;
		}
	};

	const handleFocusCapture = (event: FocusEvent) => {
		const target = event.target as Element | null;
		if (target && isFocusVisible(target)) {
			isItemFocusVisible = true;
		}
	};
</script>

<div
	bind:this={toastRef}
	class={cn(
		toastContainerVariants({ position, variant }),
		className,
		swipeCursorClass,
		stackHidden && "pointer-events-none",
	)}
	style:transform-origin={position?.startsWith("top-") ? "center top" : "center bottom"}
	style:z-index={zIndex}
	style:transition={isSwiping
		? `transform 0s linear, opacity ${transitionDuration} ${transitionTimingFunction}`
		: `transform ${transitionDuration} ${transitionTimingFunction}, opacity ${transitionDuration} ${transitionTimingFunction}`}
	style:transform={transformStyle.transform}
	style:opacity={transformStyle.opacity}
	style={offsetStyle}
	role={stackHidden ? undefined : dialogRole}
	aria-live={stackHidden ? undefined : livePoliteness}
	aria-atomic={stackHidden ? undefined : "true"}
	aria-modal={stackHidden ? undefined : "false"}
	aria-labelledby={stackHidden ? undefined : titleId}
	aria-describedby={stackHidden ? undefined : descriptionId}
	aria-hidden={stackHidden ? true : undefined}
	tabindex="-1"
	ontransitionend={handleTransitionEnd}
	data-toast-id={id}
	data-priority={priority}
>
	<div
		role="presentation"
		class={cn(swipeCursorClass, "touch-none")}
		aria-busy={isLoading ? "true" : undefined}
		onpointerdown={handlePointerDown}
		onpointermove={handlePointerMove}
		onpointerup={handlePointerUp}
		onpointercancel={handlePointerCancel}
		onmouseenter={() => {
			isItemHovered = true;
			onGroupHoverEnter?.();
		}}
		onmouseleave={() => (isItemHovered = false)}
		onfocuscapture={handleFocusCapture}
		onblurcapture={handleBlurCapture}
	>
		{#if toast.component}
			{@const Component = toast.component}
			<Component {id} {toast} {...toast.componentProps} />
		{:else}
			<div class={cn(toastContentVariants({ variant }))}>
				{#if showClose}
					<button
						type="button"
						onclick={() => handleClose()}
						class={cn(
							"rounded-sm text-foreground/45 hover:bg-muted hover:text-foreground/70 absolute end-2 top-2 cursor-pointer p-1 transition-[background-color,color,box-shadow] duration-100 focus-visible:ring-1 focus-visible:ring-ring/50 focus-visible:outline-none",
						)}
						aria-label="Close toast"
					>
						<svg
							aria-hidden="true"
							class="h-4 w-4"
							viewBox="0 0 18 18"
							fill="none"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<line x1="14" y1="4" x2="4" y2="14" />
							<line x1="4" y1="4" x2="14" y2="14" />
						</svg>
					</button>
				{/if}

				<div class="p-4 pe-8">
					<div class="flex gap-3">
						{#if showStatusIcon}
							<span
								class="relative inline-flex h-4 w-4 shrink-0 items-center justify-center"
							>
								{#if shouldRenderSpinner}
									<span
										class={cn(
											"vs-spinner absolute inset-0",
											spinnerState === "loading"
												? "vs-spinner--active"
												: "vs-spinner--finish",
										)}
										role={spinnerState === "loading" ? "status" : undefined}
										aria-label={spinnerState === "loading" ? "Loading..." : undefined}
										aria-live={spinnerState === "loading" ? "assertive" : undefined}
										onanimationend={handleSpinnerAnimationEnd}
									>
										<svg
											viewBox="0 0 18 18"
											fill="none"
											stroke="currentColor"
											stroke-width="1.5"
											stroke-linecap="round"
											stroke-linejoin="round"
										>
											<line x1="9" y1="1.75" x2="9" y2="4.25" />
											<line
												x1="14.127"
												y1="3.873"
												x2="12.359"
												y2="5.641"
												opacity="0.88"
											/>
											<line x1="16.25" y1="9" x2="13.75" y2="9" opacity="0.75" />
											<line
												x1="14.127"
												y1="14.127"
												x2="12.359"
												y2="12.359"
												opacity="0.63"
											/>
											<line x1="9" y1="16.25" x2="9" y2="13.75" opacity="0.5" />
											<line
												x1="3.873"
												y1="14.127"
												x2="5.641"
												y2="12.359"
												opacity="0.38"
											/>
											<line x1="1.75" y1="9" x2="4.25" y2="9" opacity="0.25" />
											<line
												x1="3.873"
												y1="3.873"
												x2="5.641"
												y2="5.641"
												opacity="0.13"
											/>
										</svg>
									</span>
								{/if}
								{#if iconConfig}
									<span
										class={cn(
											"vs-icon absolute inset-0 flex items-center justify-center",
											iconStateClass,
										)}
										aria-hidden="true"
									>
										<svg
											viewBox={iconConfig.viewBox}
											fill="none"
											stroke="currentColor"
											stroke-width="1.5"
											stroke-linecap="round"
											stroke-linejoin="round"
										>
											{#each iconConfig.elements as element, elementIndex (elementIndex)}
												{#if element.tag === "path"}
													{#if element.fill}
														<path d={element.d} fill="currentColor" stroke="none" />
													{:else}
														<path d={element.d} />
													{/if}
												{:else if element.tag === "line"}
													{@const lineEl = element as LineElement}

													<line
														x1={lineEl.x1}
														y1={lineEl.y1}
														x2={lineEl.x2}
														y2={lineEl.y2}
														opacity={lineEl.opacity ?? undefined}
													/>
												{:else if element.tag === "polyline"}
													<polyline points={element.points} />
												{/if}
											{/each}
										</svg>
									</span>
								{/if}
							</span>
						{/if}
						<div class="min-w-0">
							{#if title}
								<div
									id={titleId}
									class="mb-1 text-sm leading-none font-medium select-none"
								>
									{title}
								</div>
							{/if}
							{#if description}
								<div
									id={descriptionId}
									class="text-muted-foreground text-sm leading-snug text-balance select-none"
								>
									{description}
								</div>
							{/if}
							{#if action}
								<div class="mt-3">
									<button
										type="button"
										onclick={() => {
											action.onClick();
											handleClose();
										}}
										class={buttonVariants({ size: "xs" })}
									>
										{action.label}
									</button>
								</div>
							{/if}
						</div>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>
