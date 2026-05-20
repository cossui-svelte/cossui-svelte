<script lang="ts">
import X from '@lucide/svelte/icons/x';
import { Badge } from '$lib/components/ui/badge';

let isActive = $state(true);
</script>

{#if isActive}
	<Badge>
		Removable
		<button
			class="-my-px -me-1.5 -ms-px inline-flex size-5 shrink-0 items-center justify-center rounded-[inherit] p-0 opacity-60 transition-opacity hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70"
			onclick={() => (isActive = false)}
		>
			<X size={12} stroke-width={2} aria-hidden="true" />
		</button>
	</Badge>
{/if}
