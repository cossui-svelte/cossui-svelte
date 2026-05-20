<script lang="ts">
import { getContext } from 'svelte';
import { cn } from '$lib/utils.js';

interface Props {
  placeholder?: string;
  class?: string;
}

let { placeholder = '', class: className }: Props = $props();

const ctx = getContext<{ getLabel: () => string } | undefined>('coss-select');

let label = $derived(ctx?.getLabel() ?? '');
</script>

<span
	class={cn(
		"flex-1 truncate",
		!label && "text-muted-foreground/72",
		className,
	)}
	data-slot="select-value"
>
	{label || placeholder}
</span>
