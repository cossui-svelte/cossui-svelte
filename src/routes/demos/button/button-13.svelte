<script lang="ts">
	import LoaderCircle from "@lucide/svelte/icons/loader-circle";
	import { Button } from "$lib/components/ui/button";
</script>

<Button disabled>
	<LoaderCircle
		class="-ms-1 animate-spin"
		size={16}
		strokeWidth={2}
		aria-hidden="true"
	/>
	Button
</Button>
