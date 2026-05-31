<script lang="ts">
	import { Dialog } from "bits-ui";
	import { getCtx } from "../ctx.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: { ref?: HTMLElement | null; class?: string; [key: string]: unknown } = $props();

	const {
		refs: { overlayRef },
		states: { isOpen, visible, snapPoints, shouldFade },
		methods: { onRelease, closeDrawer },
		options: { dismissible },
	} = getCtx();

	$effect(() => {
		if (ref) overlayRef.set(ref as HTMLDivElement);
	});

	let hasSnapPoints = $derived($snapPoints && $snapPoints.length > 0);

	function handleClick() {
		if ($dismissible) {
			closeDrawer();
		}
	}
</script>

<Dialog.Overlay
	bind:ref
	onmouseup={onRelease}
	onclick={handleClick}
	class={className}
	data-vaul-drawer-visible={$visible ? "true" : "false"}
	data-vaul-overlay=""
	data-vaul-snap-points={$isOpen && hasSnapPoints ? "true" : "false"}
	data-vaul-snap-points-overlay={$isOpen && $shouldFade ? "true" : "false"}
	{...restProps}
/>
