<script lang="ts">
import type { Dialog as DrawerPrimitive } from 'bits-ui';

let { ...restProps }: DrawerPrimitive.CloseProps = $props();
</script>

<DrawerPrimitive.Close data-slot="drawer-close" {...restProps} />
