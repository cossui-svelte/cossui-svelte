<script lang="ts">
	import { Dialog } from "bits-ui";
	import { getCtx } from "./ctx.js";

	let {
		ref = $bindable(null),
		children,
		class: className,
		onclick: _onclick,
		onkeydown: _onkeydown,
		...restProps
	}: Dialog.CloseProps = $props();

	const {
		methods: { closeDrawer },
	} = getCtx();
</script>

<Dialog.Close
	bind:ref
	data-slot="drawer-close"
	onclick={(e) => {
		e.preventDefault();
		closeDrawer();
	}}
	onkeydown={(e) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			closeDrawer(true);
		}
	}}
	class={className}
	{...restProps}
>
	{@render children?.()}
</Dialog.Close>
