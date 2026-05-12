<script lang="ts">
	import Cta from "$lib/demo/cta.svelte";
	import * as ComponentDialog from "$lib/demo/component-preview";
	import {
		AnchoredToastProvider,
		ToastProvider,
	} from "$lib/components/ui/toast";
	let { children } = $props();
</script>

<ToastProvider>
	<AnchoredToastProvider>
		<main>{@render children()}</main>
	</AnchoredToastProvider>
</ToastProvider>

<ComponentDialog.DialogContextProvider>
	<main class="grow">
		{@render children()}
		<Cta />
	</main>

	<ComponentDialog.Dialog />
</ComponentDialog.DialogContextProvider>
