<script lang="ts">
import type { AlertDialog as AlertDialogPrimitive } from 'bits-ui';

let { ...restProps }: AlertDialogPrimitive.PortalProps = $props();
</script>

<AlertDialogPrimitive.Portal {...restProps} />
