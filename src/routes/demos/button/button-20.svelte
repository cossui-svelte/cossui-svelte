<script lang="ts">
	import Plus from "@lucide/svelte/icons/plus";
	import { Button } from "$lib/components/ui/button";
</script>

<Button
	class="rounded-full"
	variant="outline"
	size="icon"
	aria-label="Add new item"
>
	<Plus size={16} stroke-width={2} aria-hidden="true" />
</Button>
