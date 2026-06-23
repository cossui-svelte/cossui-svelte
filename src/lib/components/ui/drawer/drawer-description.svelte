<script lang="ts">
	import { cn } from "$lib/utils";
	import { Drawer as DrawerPrimitive } from "$lib/vaul";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: DrawerPrimitive.DescriptionProps = $props();
</script>

<DrawerPrimitive.Description
	bind:ref
	class={cn("text-muted-foreground text-sm", className)}
	data-slot="drawer-description"
	{...restProps}
/>
