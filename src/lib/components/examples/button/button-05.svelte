<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import TrashIcon from "@lucide/svelte/icons/trash-icon";
</script>

<Button variant="destructive">
	<TrashIcon
		class="-ms-1 opacity-60"
		size={16}
		stroke-width={2}
		aria-hidden="true"
	/>
	Button
</Button>
