<script lang="ts">
	import Cta from "$lib/demo/cta.svelte";
	import * as ComponentDialog from "$lib/demo/component-preview";

	let { children } = $props();
</script>

<ComponentDialog.DialogContextProvider>
	<main class="grow">
		{@render children()}
		<Cta />
	</main>

	<ComponentDialog.Dialog />
</ComponentDialog.DialogContextProvider>
