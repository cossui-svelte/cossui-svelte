<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	let {
		className = '',
		children,
		...restProps
	}: {
		className?: string;
		children?: Snippet;
	} = $props();
</script>

<p
	data-slot="stepper-description"
	class={cn('text-muted-foreground text-xs', className)}
	{...restProps}
>
	{@render children?.()}
</p>