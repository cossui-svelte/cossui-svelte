<script lang="ts">
import type { Dialog as DialogPrimitive } from 'bits-ui';

let { ...restProps }: DialogPrimitive.PortalProps = $props();
</script>

<DialogPrimitive.Portal {...restProps} />
