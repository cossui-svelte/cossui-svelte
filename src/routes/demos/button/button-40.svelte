<script lang="ts">
	import ThumbsUpIcon from "@lucide/svelte/icons/thumbs-up";
	import { Button } from "$lib/components/ui/button";
</script>

<Button class="py-0 pe-0" variant="outline">
	<ThumbsUpIcon class="opacity-60" size={16} aria-hidden="true" />
	Like
	<span
		class="relative ms-1 inline-flex h-full items-center justify-center rounded-full px-3 text-xs font-medium text-muted-foreground before:absolute before:inset-0 before:left-0 before:w-px before:bg-input"
	>
		86
	</span>
</Button>
