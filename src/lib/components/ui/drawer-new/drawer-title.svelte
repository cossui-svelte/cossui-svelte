<script lang="ts">
import { cn } from '$lib/utils.js';
import type { Drawer as DrawerPrimitive } from '$lib/vaul';

let {
  ref = $bindable(null),
  class: className,
  ...restProps
}: DrawerPrimitive.TitleProps = $props();
</script>

<DrawerPrimitive.Title
	bind:ref
	data-slot="drawer-title"
	class={cn("font-heading text-foreground font-medium", className)}
	{...restProps}
/>
