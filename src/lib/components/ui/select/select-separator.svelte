<script lang="ts">
import type { Separator as SeparatorPrimitive } from 'bits-ui';
import { cn } from '$lib/utils.js';

let {
  class: className,
  ref = $bindable(null),
  ...restProps
}: SeparatorPrimitive.RootProps = $props();
</script>

<SeparatorPrimitive.Root
	bind:ref
	class={cn("mx-2 my-1 h-px bg-border", className)}
	data-slot="select-separator"
	role="separator"
	{...restProps}
/>
