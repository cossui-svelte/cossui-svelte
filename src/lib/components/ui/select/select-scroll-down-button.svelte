<script lang="ts">
import ChevronDown from '@lucide/svelte/icons/chevron-down';
import type { Select as SelectPrimitive, WithoutChildrenOrChild } from 'bits-ui';
import { cn } from '$lib/utils.js';

let {
  class: className,
  ref = $bindable(null),
  ...restProps
}: WithoutChildrenOrChild<SelectPrimitive.ScrollDownButtonProps> = $props();
</script>

<SelectPrimitive.ScrollDownButton
	bind:ref
	class={cn(
		"bottom-0 z-50 flex h-6 w-full cursor-default items-center justify-center before:pointer-events-none before:absolute before:inset-x-px before:bottom-px before:h-[200%] before:rounded-b-[calc(var(--radius-lg)-1px)] before:bg-linear-to-t before:from-50% before:from-popover",
		className,
	)}
	data-slot="select-scroll-down-button"
	{...restProps}
>
	<ChevronDown class="relative size-4.5 sm:size-4" />
</SelectPrimitive.ScrollDownButton>
