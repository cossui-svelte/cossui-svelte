<script lang="ts">
/**
 * @component
 * @description
 * Internal component responsible for grouping toasts by position and calculating
 * their stacking offsets (both collapsed and expanded).
 * It handles the "hover to expand" logic and manages the lifecycle of toast groups.
 */
import VarselItem from "./VarselItem.svelte";
import {
	ANIMATION_CONFIG,
	type PositionedToast,
	type ToastData,
	type ToastPosition,
} from "./internals";

let {
	toasts = [],
	onRemove,
	expandedGap = ANIMATION_CONFIG.EXPANDED_GAP,
	position: defaultPosition = 'bottom-center',
	visibleToasts = 3,
	expand = true,
	duration = 5000,
	closeButton = true,
	pauseOnHover = true,
	offset = undefined,
	dir = 'auto'
}: {
	toasts?: ToastData[];
	onRemove: (id: string) => void;
	expandedGap?: number;
	position?: ToastPosition;
	visibleToasts?: number;
	expand?: boolean;
	duration?: number;
	closeButton?: boolean;
	pauseOnHover?: boolean;
	offset?: number | string;
	dir?: 'ltr' | 'rtl' | 'auto';
} = $props();

const createPositionMap = <T>(value: () => T): Record<ToastPosition, T> => ({
	"top-left": value(),
	"top-center": value(),
	"top-right": value(),
	"bottom-left": value(),
	"bottom-center": value(),
	"bottom-right": value(),
});

let heights = $state<Record<string, number>>({});
let hovered = $state<Record<ToastPosition, boolean>>(
	createPositionMap(() => false),
);
let heldToasts = $state<Record<ToastPosition, Set<string>>>(
	createPositionMap(() => new Set<string>()),
);

// Non-reactive internal state for "previous" values (mimicking legacy behavior)
let previousStackIndex: Record<string, number> = {};
let previousCollapsedOffsets: Record<string, number> = {};
let previousExpandedOffsets: Record<string, number> = {};

let toastsByPosition = $state<Record<ToastPosition, PositionedToast[]>>(
	createPositionMap<PositionedToast[]>(() => []),
);

let collapsedOffsetData = $state<{
	byPosition: Record<ToastPosition, number[]>;
	byId: Record<string, number>;
}>({ byPosition: createPositionMap<number[]>(() => []), byId: {} });

let expandedOffsetData = $state<{
	byPosition: Record<ToastPosition, number[]>;
	byId: Record<string, number>;
}>({ byPosition: createPositionMap<number[]>(() => []), byId: {} });

let positionEntries = $derived(
	Object.entries(toastsByPosition) as [ToastPosition, PositionedToast[]][],
);
let latestPositionEntries = $derived(positionEntries);
let latestHovered = $derived(hovered);

const updateHoldState = (
	position: ToastPosition,
	toastId: string,
	isHolding: boolean,
) => {
	const current = heldToasts[position] ?? new Set<string>();
	const next = new Set(current);
	if (isHolding) {
		next.add(toastId);
	} else {
		next.delete(toastId);
	}
	if (next.size !== current.size) {
		heldToasts = { ...heldToasts, [position]: next };
	}
};

// Calculate toastsByPosition based on toasts
$effect(() => {
	const grouped = createPositionMap<ToastData[]>(() => []);
	for (const toast of toasts) {
		const pos = toast.position || defaultPosition;
		grouped[pos].push(toast);
	}

	const nextStackIndices: Record<string, number> = {};
	const positioned = createPositionMap<PositionedToast[]>(() => []);

	for (const position of Object.keys(grouped) as ToastPosition[]) {
		const list = grouped[position];
		const activeToasts = list.filter(
			(toast) => !toast.isLeaving && !toast.shouldClose,
		);
		const activeIndexMap = new Map<string, number>();
		activeToasts.forEach((toast, activeIndex) => {
			activeIndexMap.set(toast.id, activeIndex);
		});

		positioned[position] = list.map((toast, orderIndex) => {
			let stackIndex =
				activeIndexMap.get(toast.id) ?? previousStackIndex[toast.id];
			if (stackIndex == null || Number.isNaN(stackIndex)) {
				stackIndex = orderIndex;
			}

			nextStackIndices[toast.id] = stackIndex;

			return {
				...toast,
				position: position,
				index: stackIndex,
				renderIndex: orderIndex,
				total: list.length,
			};
		}) as PositionedToast[];
	}

	previousStackIndex = nextStackIndices;
	toastsByPosition = positioned;
});

// Update hovered state based on empty groups
$effect(() => {
	const next = { ...hovered };
	let changed = false;
	for (const pos of Object.keys(hovered) as ToastPosition[]) {
		const hasToast = (toastsByPosition[pos]?.length ?? 0) > 0;
		if (!hasToast && next[pos]) {
			next[pos] = false;
			changed = true;
		}
	}
	if (changed) {
		hovered = next;
	}
});

// Calculate collapsedOffsetData
$effect(() => {
	const byPosition = createPositionMap<number[]>(() => []);
	const byId: Record<string, number> = {};

	for (const [pos, group] of positionEntries) {
		const isTopPosition = pos.startsWith("top-");
		const activeToasts = group.filter((toast) => !toast.shouldClose);
		const offsetsForActive: number[] = [];

		for (let i = 0; i < activeToasts.length; i++) {
			if (i === 0) {
				offsetsForActive.push(0);
				continue;
			}

			const prevToast = activeToasts[i - 1];
			const currentToast = activeToasts[i];
			const prevOffset = offsetsForActive[i - 1] ?? 0;
			if (!prevToast || !currentToast) {
				offsetsForActive.push(prevOffset);
				continue;
			}
			const prevHeight = heights[prevToast.id];
			const currentHeight = heights[currentToast.id];
			const fallbackOffset =
				prevOffset + (isTopPosition ? 1 : -1) * ANIMATION_CONFIG.STACK_OFFSET;

			if (
				prevHeight == null ||
				currentHeight == null ||
				Number.isNaN(prevHeight) ||
				Number.isNaN(currentHeight)
			) {
				offsetsForActive.push(fallbackOffset);
				continue;
			}

			if (isTopPosition) {
				offsetsForActive.push(
					prevOffset +
						(prevHeight - currentHeight + ANIMATION_CONFIG.STACK_OFFSET),
				);
			} else {
				offsetsForActive.push(
					prevOffset +
						(currentHeight - prevHeight - ANIMATION_CONFIG.STACK_OFFSET),
				);
			}
		}

		for (let i = 0; i < activeToasts.length; i++) {
			const toast = activeToasts[i];
			if (!toast) continue;
			byId[toast.id] = offsetsForActive[i] ?? 0;
		}

		for (const toast of group) {
			if (byId[toast.id] != null) continue;
			const previousOffset = previousCollapsedOffsets[toast.id];
			if (typeof previousOffset === "number") {
				byId[toast.id] = previousOffset;
				continue;
			}

			const defaultOffset = isTopPosition
				? toast.index * ANIMATION_CONFIG.STACK_OFFSET
				: -(toast.index * ANIMATION_CONFIG.STACK_OFFSET);
			byId[toast.id] = defaultOffset;
		}

		byPosition[pos] = group.map((toast) => byId[toast.id] ?? 0);
	}

	previousCollapsedOffsets = byId;
	collapsedOffsetData = { byPosition, byId };
});

// Calculate expandedOffsetData
$effect(() => {
	const byPosition = createPositionMap<number[]>(() => []);
	const byId: Record<string, number> = {};

	for (const [pos, group] of positionEntries) {
		const offsets: number[] = [];
		const activeToasts = group.filter((toast) => !toast.shouldClose);
		let acc = 0;

		for (let i = 0; i < activeToasts.length; i++) {
			if (i === 0) {
				offsets.push(0);
				continue;
			}
			const prevToast = activeToasts[i - 1];
			const prevHeight = prevToast ? (heights[prevToast.id] ?? 0) : 0;
			acc += prevHeight + expandedGap;
			offsets.push(acc);
		}

		for (let i = 0; i < activeToasts.length; i++) {
			const toast = activeToasts[i];
			if (!toast) continue;
			byId[toast.id] = offsets[i] ?? 0;
		}

		for (const toast of group) {
			if (byId[toast.id] != null) continue;

			const previousOffset = previousExpandedOffsets[toast.id];
			if (typeof previousOffset === "number") {
				byId[toast.id] = previousOffset;
				continue;
			}

			let fallback = 0;
			for (const candidate of group) {
				if (candidate.id === toast.id) break;
				const height = heights[candidate.id] ?? 0;
				fallback += height + expandedGap;
			}
			byId[toast.id] = fallback;
		}

		byPosition[pos] = group.map((toast) => byId[toast.id] ?? 0);
	}

	previousExpandedOffsets = byId;
	expandedOffsetData = { byPosition, byId };
});

$effect(() => {
	let hoverFrameId: number | null = null;
	let pointerX = 0;
	let pointerY = 0;

	const updateHoverState = (x: number, y: number) => {
		if (latestPositionEntries.length === 0) return;
		const next: Record<ToastPosition, boolean> = {
			...latestHovered,
		};
		for (const [pos, group] of latestPositionEntries) {
			let top = Number.POSITIVE_INFINITY;
			let left = Number.POSITIVE_INFINITY;
			let right = Number.NEGATIVE_INFINITY;
			let bottom = Number.NEGATIVE_INFINITY;
			let any = false;
			for (const t of group) {
				if (t.index >= visibleToasts) continue;
				const el = document.querySelector(
					`[data-toast-id="${t.id}"]`,
				) as HTMLElement | null;
				if (!el) continue;
				const rect = el.getBoundingClientRect();
				top = Math.min(top, rect.top);
				left = Math.min(left, rect.left);
				right = Math.max(right, rect.right);
				bottom = Math.max(bottom, rect.bottom);
				any = true;
			}

			if (!any) {
				next[pos] = false;
				continue;
			}

			const inside = x >= left && x <= right && y >= top && y <= bottom;
			next[pos] = inside;
		}

		const changed = (Object.keys(next) as ToastPosition[]).some(
			(key) => next[key] !== hovered[key],
		);
		if (changed) {
			hovered = next;
		}
	};

	const flushHoverUpdate = () => {
		hoverFrameId = null;
		updateHoverState(pointerX, pointerY);
	};

	const handleMouseMove = (event: MouseEvent) => {
		pointerX = event.clientX;
		pointerY = event.clientY;
		if (hoverFrameId == null) {
			hoverFrameId = requestAnimationFrame(flushHoverUpdate);
		}
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key !== "Escape") return;
		for (const [, group] of latestPositionEntries) {
			const latestToast = group?.[0];
			if (!latestToast) continue;
			const container = document.querySelector(
				`[data-toast-id="${latestToast.id}"]`,
			) as HTMLElement | null;
			if (!container) continue;
			const active = document.activeElement as HTMLElement | null;
			if (active && container.contains(active)) {
				const closeBtn = container.querySelector(
					'[aria-label="Close toast"]',
				) as HTMLButtonElement | null;
				if (closeBtn) {
					event.preventDefault();
					closeBtn.click();
				}
			}
		}
	};

	document.addEventListener("mousemove", handleMouseMove);
	document.addEventListener("keydown", handleKeyDown);
	return () => {
		if (hoverFrameId != null) {
			cancelAnimationFrame(hoverFrameId);
			hoverFrameId = null;
		}
		document.removeEventListener("mousemove", handleMouseMove);
		document.removeEventListener("keydown", handleKeyDown);
	};
});

const handleHeightChange = (id: string, height: number) => {
	if (heights[id] === height) return;
	heights = { ...heights, [id]: height };
};
</script>

{#if toasts.length > 0}
	<div 
		class="pointer-events-none fixed inset-0 z-50"
		{dir}
	>
		{#each positionEntries as [position, positionToasts]}
			{@const pos = position}
			{@const expandedOffsets = expandedOffsetData.byPosition[pos]}
			{@const collapsedOffsets = collapsedOffsetData.byPosition[pos]}
			{@const isHovered = hovered[pos]}
			{@const isHeld = (heldToasts[pos]?.size ?? 0) > 0}
			{@const isGroupActive = isHovered || isHeld}
			{@const activeToasts = positionToasts.filter((toast) => !toast.shouldClose)}
			{@const visibleStackLimit = Math.max(visibleToasts - 1, 0)}
			{@const maxVisibleStackIndex = Math.min(
				Math.max(activeToasts.length - 1, 0),
				visibleStackLimit,
			)}
			{@const lastVisibleToastId = activeToasts[maxVisibleStackIndex]?.id}
			{@const lastVisibleRenderIndex = lastVisibleToastId != null
				? positionToasts.findIndex(
						(candidate) => candidate.id === lastVisibleToastId,
					)
				: -1}
			{@const sharedHiddenCollapsedOffset =
				lastVisibleRenderIndex >= 0
					? collapsedOffsets?.[lastVisibleRenderIndex]
					: undefined}
			{#each positionToasts as toast, idx (toast.id)}
				{@const toastIsHidden =
					toast.index >= visibleToasts}
				{@const hiddenCollapsedOffset = toastIsHidden
					? sharedHiddenCollapsedOffset ?? collapsedOffsets?.[idx]
					: collapsedOffsets?.[idx]}
				{@const collapsedOffsetValue = collapsedOffsets?.[idx]}
				<VarselItem
					{toast}
					{onRemove}
					isGroupHovered={isGroupActive}
					expandedOffset={expandedOffsets?.[idx] ?? 0}
					{expandedGap}
					onHeightChange={handleHeightChange}
					onGroupHoverEnter={() => {
						hovered = { ...hovered, [pos]: true };
					}}
					onGroupHoldChange={(holding) =>
						updateHoldState(pos, toast.id, holding)}
					collapsedOffset={collapsedOffsetValue}
					hiddenCollapsedOffset={hiddenCollapsedOffset}
					defaultDuration={duration}
					defaultShowClose={closeButton}
					{pauseOnHover}
					{offset}
					{expand}
					{visibleToasts}
				/>
			{/each}
		{/each}
	</div>
{/if}
