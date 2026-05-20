<script lang="ts">
import type { Avatar as AvatarPrimitive } from 'bits-ui';
import { cn } from '$lib/utils.js';

let {
  ref = $bindable(null),
  class: className,
  ...restProps
}: AvatarPrimitive.FallbackProps = $props();
</script>

<AvatarPrimitive.Fallback
  bind:ref
  class={cn(
    "flex size-full items-center justify-center rounded-[inherit] bg-secondary text-xs",
    className,
  )}
  data-slot="avatar-fallback"
  {...restProps}
></AvatarPrimitive.Fallback>
