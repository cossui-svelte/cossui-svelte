<script lang="ts">
	import ArrowLeftIcon from "@lucide/svelte/icons/arrow-left";
	import { Button } from "$lib/components/ui/button";
</script>

<Button variant="outline">
	<ArrowLeftIcon
		class="-ms-1 opacity-60 transition-transform group-hover:-translate-x-0.5"
		size={16}
		stroke-width={2}
		aria-hidden="true"
	/>
	Button
</Button>
