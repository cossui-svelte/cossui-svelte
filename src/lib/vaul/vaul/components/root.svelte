<script lang="ts">
import { Dialog } from 'bits-ui';
import { get } from 'svelte/store';
import type { CreateVaulProps } from '../../internal/vaul.js';
import { setCtx } from '../ctx.js';
import type { Props } from './types.js';

let {
  open = $bindable(false),
  onOpenChange,
  closeThreshold,
  scrollLockTimeout,
  snapPoints,
  fadeFromIndex,
  backgroundColor = 'black',
  nested = false,
  shouldScaleBackground = false,
  activeSnapPoint = $bindable(undefined),
  onActiveSnapPointChange,
  onRelease,
  onDrag,
  onClose,
  dismissible,
  direction = 'bottom',
  children
}: Props = $props();

const {
  states: { activeSnapPoint: localActiveSnapPoint, isOpen },
  methods: { closeDrawer, openDrawer, cleanup },
  updateOption
  // svelte-ignore state_referenced_locally
} = setCtx({
  backgroundColor,
  closeThreshold,
  defaultActiveSnapPoint: activeSnapPoint,
  defaultOpen: open,
  direction,
  dismissible,
  fadeFromIndex,
  nested,
  onActiveSnapPointChange: ({
    next
  }: {
    curr: number | string | null;
    next: number | string | null;
  }) => {
    if (next === undefined && snapPoints && activeSnapPoint !== next) {
      const newNext = snapPoints[0];
      onActiveSnapPointChange?.(newNext);
      activeSnapPoint = newNext;
      return newNext;
    }

    if (activeSnapPoint !== next) {
      onActiveSnapPointChange?.(next);
      activeSnapPoint = next;
    }
    return next;
  },
  onClose,
  onDrag,
  onOpenChange: ({ next }: { curr: boolean; next: boolean }) => {
    if (open !== next) {
      onOpenChange?.(next);
      open = next;
    }
    return next;
  },
  onRelease,
  scrollLockTimeout,
  shouldScaleBackground,
  snapPoints: snapPoints as (number | string)[] | undefined
} as CreateVaulProps);

$effect(() => {
  if (activeSnapPoint !== undefined) localActiveSnapPoint.set(activeSnapPoint);
});

$effect(() => {
  updateOption('closeThreshold', closeThreshold);
});

$effect(() => {
  updateOption('scrollLockTimeout', scrollLockTimeout);
});

$effect(() => {
  updateOption('snapPoints', snapPoints);
});

$effect(() => {
  updateOption('fadeFromIndex', fadeFromIndex);
});

$effect(() => {
  updateOption('shouldScaleBackground', shouldScaleBackground);
});

$effect(() => {
  updateOption('backgroundColor', backgroundColor);
});

$effect(() => {
  updateOption('dismissible', dismissible);
});

$effect(() => {
  updateOption('direction', direction);
});

$effect(() => {
  if (open && !get(isOpen)) openDrawer();
});

$effect(() => {
  if (!open && get(isOpen)) closeDrawer();
});

$effect(() => {
  return () => cleanup();
});
</script>

<Dialog.Root
	bind:open
	onOpenChange={(o) => {
		onOpenChange?.(o);
		if (!o) {
			closeDrawer();
		} else {
			openDrawer();
		}
	}}
>
	{@render children?.()}
</Dialog.Root>

<style>
	:global([data-vaul-drawer]) {
		touch-action: none;
		transition: transform 0.5s cubic-bezier(0.32, 0.72, 0, 1);
	}

	:global([data-vaul-drawer][data-vaul-drawer-direction="bottom"]) {
		transform: translate3d(0, 100%, 0);
	}

	:global([data-vaul-drawer][data-vaul-drawer-direction="top"]) {
		transform: translate3d(0, -100%, 0);
	}

	:global([data-vaul-drawer][data-vaul-drawer-direction="left"]) {
		transform: translate3d(-100%, 0, 0);
	}

	:global([data-vaul-drawer][data-vaul-drawer-direction="right"]) {
		transform: translate3d(100%, 0, 0);
	}

	:global(
			.vaul-dragging .vaul-scrollable [data-vaul-drawer-direction="top"]
		) {
		overflow-y: hidden !important;
	}

	:global(
			.vaul-dragging
				.vaul-scrollable
				[data-vaul-drawer-direction="bottom"]
		) {
		overflow-y: hidden !important;
	}

	:global(
			.vaul-dragging .vaul-scrollable [data-vaul-drawer-direction="left"]
		) {
		overflow-x: hidden !important;
	}
	:global(
			.vaul-dragging .vaul-scrollable [data-vaul-drawer-direction="right"]
		) {
		overflow-x: hidden !important;
	}

	:global(
			[data-vaul-drawer][data-vaul-drawer-visible="true"][data-vaul-drawer-direction="top"]
		) {
		transform: translate3d(0, var(--snap-point-height, 0), 0);
	}

	:global(
			[data-vaul-drawer][data-vaul-drawer-visible="true"][data-vaul-drawer-direction="bottom"]
		) {
		transform: translate3d(0, var(--snap-point-height, 0), 0);
	}

	:global(
			[data-vaul-drawer][data-vaul-drawer-visible="true"][data-vaul-drawer-direction="left"]
		) {
		transform: translate3d(var(--snap-point-height, 0), 0, 0);
	}

	:global(
			[data-vaul-drawer][data-vaul-drawer-visible="true"][data-vaul-drawer-direction="right"]
		) {
		transform: translate3d(var(--snap-point-height, 0), 0, 0);
	}

	:global([data-vaul-overlay]) {
		opacity: 0;
		transition: opacity 0.5s cubic-bezier(0.32, 0.72, 0, 1);
	}

	:global([data-vaul-overlay][data-vaul-drawer-visible="true"]) {
		opacity: 1;
	}

	:global([data-vaul-drawer]::after) {
		content: "";
		position: absolute;
		background: inherit;
		background-color: inherit;
	}

	:global([data-vaul-drawer][data-vaul-drawer-direction="top"]::after) {
		top: initial;
		bottom: 100%;
		left: 0;
		right: 0;
		height: 200%;
	}

	:global([data-vaul-drawer][data-vaul-drawer-direction="bottom"]::after) {
		top: 100%;
		bottom: initial;
		left: 0;
		right: 0;
		height: 200%;
	}

	:global([data-vaul-drawer][data-vaul-drawer-direction="left"]::after) {
		left: initial;
		right: 100%;
		top: 0;
		bottom: 0;
		width: 200%;
	}

	:global([data-vaul-drawer][data-vaul-drawer-direction="right"]::after) {
		left: 100%;
		right: initial;
		top: 0;
		bottom: 0;
		width: 200%;
	}

	:global(
			[data-vaul-overlay][data-vaul-snap-points="true"]:not(
					[data-vaul-snap-points-overlay="true"]
				):not([data-state="closed"])
		) {
		opacity: 0;
	}

	:global(
			[data-vaul-overlay][data-vaul-snap-points-overlay="true"]:not(
					[data-vaul-drawer-visible="false"]
				)
		) {
		opacity: 1;
	}

	/* This will allow us to not animate via animation, but still benefit from delaying
	unmount via Bits */
	@keyframes -global-fake-animation {
		from {
		}
		to {
		}
	}

	@media (hover: hover) and (pointer: fine) {
		:global([data-vaul-drawer]) {
			user-select: none;
		}
	}
</style>
