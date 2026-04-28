<script lang="ts">
	import { Button } from "$lib/components/ui/button";

	import { ArrowRight, MailIcon } from "lucide-svelte";
</script>

<Button class="group" variant="secondary">
	<MailIcon
		class="-ms-1 opacity-60"
		size={16}
		stroke-width={2}
		aria-hidden="true"
	/>
	Button
	<ArrowRight
		class="-me-1 opacity-60 transition-transform group-hover:translate-x-0.5"
		size={16}
		stroke-width={2}
		aria-hidden="true"
	/>
</Button>
