<script lang="ts">
import ArrowRight from '@lucide/svelte/icons/arrow-right';
import MailIcon from '@lucide/svelte/icons/mail';
import { Button } from '$lib/components/ui/button';
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
