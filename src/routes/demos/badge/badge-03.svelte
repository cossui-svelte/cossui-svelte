<script lang="ts">
	import Zap from "@lucide/svelte/icons/zap";
	import { Badge } from "$lib/components/ui/badge";
</script>

<Badge class="gap-1">
	<Zap
		class="-ms-0.5 opacity-60"
		size={12}
		stroke-width={2}
		aria-hidden="true"
	/>
	Badge
</Badge>
