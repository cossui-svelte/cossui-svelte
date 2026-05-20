<script lang="ts">
import type { Drawer as DrawerPrimitive } from '$lib/vaul';

let {
  shouldScaleBackground = true,
  open = $bindable(false),
  activeSnapPoint = $bindable(null),
  ...restProps
}: DrawerPrimitive.RootProps = $props();
</script>

<DrawerPrimitive.NestedRoot
	{shouldScaleBackground}
	bind:open
	bind:activeSnapPoint
	{...restProps}
/>
