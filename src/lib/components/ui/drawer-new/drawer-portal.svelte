<script lang="ts">
import type { Drawer as DrawerPrimitive } from '$lib/vaul';

let { ...restProps }: DrawerPrimitive.PortalProps = $props();
</script>

<DrawerPrimitive.Portal {...restProps} />
