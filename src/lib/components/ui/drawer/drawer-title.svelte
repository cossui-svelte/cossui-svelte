<script lang="ts">
	import { Drawer as DrawerPrimitive } from "$lib/vaul";
	import { cn } from "$lib/utils";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: DrawerPrimitive.TitleProps = $props();
</script>

<DrawerPrimitive.Title
	bind:ref
	data-slot="drawer-title"
	class={cn("font-heading font-semibold text-xl leading-none", className)}
	{...restProps}
/>
