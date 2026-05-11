<script lang="ts">
	import { Dialog } from "bits-ui";
	import { getCtx } from "../ctx.js";

	let { class: className, ...restProps }: { class?: string; [key: string]: unknown } = $props();

	const {
		refs: { overlayRef },
		states: { isOpen, visible, snapPoints, shouldFade },
		methods: { onRelease, closeDrawer },
		options: { dismissible },
	} = getCtx();

	let overlayEl: HTMLDivElement | null = $state(null);

	$effect(() => {
		if (overlayEl) overlayRef.set(overlayEl);
	});

	let hasSnapPoints = $derived($snapPoints && $snapPoints.length > 0);

	function handleClick() {
		if ($dismissible) {
			closeDrawer();
		}
	}
</script>

<Dialog.Overlay
	bind:ref={overlayEl}
	onmouseup={onRelease}
	onclick={handleClick}
	class={className}
	data-vaul-drawer-visible={$visible ? "true" : "false"}
	data-vaul-overlay=""
	data-vaul-snap-points={$isOpen && hasSnapPoints ? "true" : "false"}
	data-vaul-snap-points-overlay={$isOpen && $shouldFade ? "true" : "false"}
	{...restProps}
/>
