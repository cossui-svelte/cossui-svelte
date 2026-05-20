<script lang="ts">
import type { Dialog as DialogPrimitive } from 'bits-ui';

let {
  ref = $bindable(null),
  type = 'button',
  ...restProps
}: DialogPrimitive.TriggerProps = $props();
</script>

<DialogPrimitive.Trigger bind:ref data-slot="command-dialog-trigger" {type} {...restProps} />
