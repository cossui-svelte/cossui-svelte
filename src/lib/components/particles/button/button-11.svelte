<script lang="ts">
	import ChevronDown from "@lucide/svelte/icons/chevron-down";
	import { Button } from "$lib/components/ui/button";
</script>

<Button>
	Button
	<ChevronDown
		class="-me-1 opacity-60"
		size={16}
		stroke-width={2}
		aria-hidden="true"
	/>
</Button>
