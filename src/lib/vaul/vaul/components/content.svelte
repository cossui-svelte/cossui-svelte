<script lang="ts">
	import { Dialog } from "bits-ui";
	import type { Snippet } from "svelte";
	import { getCtx } from "../ctx.js";
	import Visible from "./visible.svelte";

	let {
		ref = $bindable(null),
		style = "",
		children,
		class: className,
		...restProps
	}: {
		ref?: HTMLElement | null;
		style?: string;
		children?: Snippet;
		class?: string;
		[key: string]: unknown;
	} = $props();

	const {
		refs: { drawerRef },
		states: { visible },
		helpers: { getContentStyle },
		methods: { onPress, onDrag, onRelease },
		options: { direction },
	} = getCtx();

	$effect(() => {
		if (ref) drawerRef.set(ref as HTMLDivElement);
	});

	let contentStyle = $derived($getContentStyle(style));
</script>

<Dialog.Content
	bind:ref
	style={contentStyle}
	class={className}
	onpointerdown={(e) => {
		onPress(e);
	}}
	onpointerup={(e) => {
		onRelease(e);
	}}
	onpointermove={(e) => {
		onDrag(e);
	}}
	ontouchend={(e) => {
		onRelease(e);
	}}
	ontouchmove={(e) => {
		onDrag(e);
	}}
	interactOutsideBehavior="ignore"
	escapeKeydownBehavior="ignore"
	preventScroll={false}
	trapFocus={false}
	data-vaul-drawer=""
	data-vaul-drawer-direction={$direction}
	data-vaul-drawer-visible={$visible ? "true" : "false"}
	{...restProps}
>
	<Visible />
	{@render children?.()}
</Dialog.Content>
