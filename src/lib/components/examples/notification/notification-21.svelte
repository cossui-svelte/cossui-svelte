<script lang="ts">
import { Button } from '$lib/components/ui/button';
import { toastManager } from '$lib/components/ui/toast';
</script>

<Button
	variant="outline"
	onclick={() => {
		toastManager.info("Your request was completed!", {
			action: {
				label: "Undo",
				onclick: () => console.info("Undo"),
			},
			description: "It was a long journey, but we made it!",
		});
	}}
>
	Show Toast
</Button>
