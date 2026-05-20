<script lang="ts">
import * as ComponentDialog from '$lib/demo/component-preview';
import Cta from '$lib/demo/cta.svelte';

let { children } = $props();
</script>

<ComponentDialog.DialogContextProvider>
	<main class="grow">
		{@render children()}
		<Cta />
	</main>

	<ComponentDialog.Dialog />
</ComponentDialog.DialogContextProvider>
