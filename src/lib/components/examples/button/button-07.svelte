<script lang="ts">
	import { Button } from "$lib/components/ui/button";

	import SparklesIcon from "@lucide/svelte/icons/sparkles-icon";
</script>

<Button variant="outline">
	Button
	<SparklesIcon
		class="-me-1 opacity-60"
		size={16}
		stroke-width={2}
		aria-hidden="true"
	/>
</Button>
