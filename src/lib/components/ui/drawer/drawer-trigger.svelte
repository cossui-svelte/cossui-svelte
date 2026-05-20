<script lang="ts">
import type { Dialog as DrawerPrimitive } from 'bits-ui';

let { ...restProps }: DrawerPrimitive.TriggerProps = $props();
</script>

<DrawerPrimitive.Trigger data-slot="drawer-trigger" {...restProps} />
