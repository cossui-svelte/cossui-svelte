<script lang="ts">
import ChevronLeft from '@lucide/svelte/icons/chevron-left';
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
	aria-label="Go to previous page"
	size="default"
	class={cn("max-sm:aspect-square max-sm:p-0", className)}
	{...restProps}
>
	<ChevronLeft class="sm:-ms-1" />
	<span class="max-sm:hidden">Previous</span>
</PaginationLink>
