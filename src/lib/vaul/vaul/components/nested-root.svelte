<script lang="ts">
	import type { Snippet } from "svelte";
	import { getCtx } from "../ctx.js";
	import Root from "./root.svelte";
	import type { Props } from "./types.js";

	let {
		onDrag,
		onOpenChange,
		open = $bindable(false),
		activeSnapPoint = $bindable(null),
		children,
		...restProps
	}: Props & { children?: Snippet } = $props();

	const {
		methods: { onNestedDrag, onNestedRelease, onNestedOpenChange },
	} = getCtx();

	if (!onNestedDrag) {
		throw new Error("NestedRoot must be a child of a Root");
	}
</script>

<Root
	nested={true}
	bind:open
	bind:activeSnapPoint
	onClose={() => {
		onNestedOpenChange(false);
	}}
	onDrag={(e, p) => {
		onNestedDrag(e, p);
		onDrag?.(e, p);
	}}
	onOpenChange={(o) => {
		if (o) {
			onNestedOpenChange(o);
		}
		onOpenChange?.(o);
	}}
	onRelease={onNestedRelease}
	{...restProps}
>
	{@render children?.()}
</Root>
