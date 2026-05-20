<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import XIcon from "@lucide/svelte/icons/x";
</script>

<Button variant="secondary">
	<XIcon
		class="-ms-1 opacity-60"
		size={16}
		stroke-width={2}
		aria-hidden="true"
	/>
	Button
</Button>
