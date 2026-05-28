<script lang="ts">
	import { Drawer as DrawerPrimitive } from "$lib/vaul";

	let { ...restProps }: DrawerPrimitive.PortalProps = $props();
</script>

<DrawerPrimitive.Portal {...restProps} />
