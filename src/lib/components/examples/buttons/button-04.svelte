<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { ArchiveIcon } from "lucide-svelte";
</script>

<Button>
	<ArchiveIcon
		class="-ms-1 opacity-60"
		size={16}
		stroke-width={2}
		aria-hidden="true"
	/>
	Button
</Button>
