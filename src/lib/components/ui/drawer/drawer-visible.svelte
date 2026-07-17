<script lang="ts">
	// Internal only component used to detect when the content
	// is actually mounted (via bits-ui's own conditional rendering) and set
	// the visible state, which triggers the open animation. Must be rendered
	// as a child of Dialog.Content so it remounts on every open, not just once.
	import { onMount } from "svelte";
	import { getCtx } from "./ctx.js";

	const {
		states: { visible },
		methods: { scaleBackground, restorePositionSetting },
	} = getCtx();

	onMount(() => {
		requestAnimationFrame(() => {
			visible.set(true);
		});

		return () => {
			scaleBackground(false);
			restorePositionSetting();
		};
	});
</script>
