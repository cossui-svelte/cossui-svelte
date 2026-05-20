<script lang="ts">
import ChevronRight from '@lucide/svelte/icons/chevron-right';
import { cn } from '$lib/utils.js';
import PaginationLink, { type Props as PaginationLinkProps } from './pagination-link.svelte';

let {
  class: className,
  ref = $bindable(null),
  ...restProps
}: Omit<PaginationLinkProps, 'children'> = $props();
</script>

<PaginationLink
	bind:ref
	aria-label="Go to next page"
	size="default"
	class={cn("max-sm:aspect-square max-sm:p-0", className)}
	{...restProps}
>
	<span class="max-sm:hidden">Next</span>
	<ChevronRight className="sm:-me-1" />
</PaginationLink>
