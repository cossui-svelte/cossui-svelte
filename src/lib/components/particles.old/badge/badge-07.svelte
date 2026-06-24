<script lang="ts">
	import Check from "@lucide/svelte/icons/check";
	import { Badge } from "$lib/components/ui/badge";
</script>

<Badge variant="outline" class="gap-1.5">
	<Check
		class="text-emerald-500"
		size={12}
		stroke-width={2}
		aria-hidden="true"
	/>
	Badge
</Badge>
