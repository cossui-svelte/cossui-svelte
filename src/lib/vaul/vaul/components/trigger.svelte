<script lang="ts">
	import { Dialog } from "bits-ui";
	import { getCtx } from "../ctx.js";

	let {
		ref = $bindable(null),
		children,
		class: className,
		...restProps
	}: Dialog.TriggerProps = $props();

	const {
		refs: { triggerRef },
	} = getCtx();

	$effect(() => {
		if (ref) triggerRef.set(ref as HTMLButtonElement);
	});
</script>

<Dialog.Trigger bind:ref class={className} {...restProps}>
	{@render children?.()}
</Dialog.Trigger>
