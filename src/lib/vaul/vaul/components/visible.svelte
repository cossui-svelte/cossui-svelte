<script lang="ts">
	// 	Internal only component used to detect when the content
	// is actually mounted (via a conditional {#if ...}) and sets the visible
	// state, which triggers the open animation
	import { onMount } from "svelte";
	import { getCtx } from "../ctx.js";

	const {
		states: { visible },
		methods: { scaleBackground, restorePositionSetting },
	} = getCtx();

	onMount(() => {
		// Delay setting visible to allow the browser to paint the initial
		// off-screen state so the CSS transition animates smoothly.
		requestAnimationFrame(() => {
			visible.set(true);
		});

		return () => {
			scaleBackground(false);
			restorePositionSetting();
		};
	});
</script>
