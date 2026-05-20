<script lang="ts">
	import { Dialog } from "bits-ui";
	import { getCtx } from "../ctx.js";
	import type { Snippet } from "svelte";

	let {
		children,
		class: className,
		...restProps
	}: { children?: Snippet; class?: string; [key: string]: unknown } = $props();

	const {
		refs: { triggerRef },
	} = getCtx();

	let triggerEl: HTMLElement | null = $state(null);

	$effect(() => {
		if (triggerEl) triggerRef.set(triggerEl as HTMLButtonElement);
	});
</script>

<Dialog.Trigger bind:ref={triggerEl} class={className} {...restProps}>
	{@render children?.()}
</Dialog.Trigger>
