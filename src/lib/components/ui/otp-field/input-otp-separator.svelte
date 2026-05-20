<script lang="ts">
import type { Separator } from 'bits-ui';
import { cn } from '$lib/utils.js';

let { ref = $bindable(null), class: className, ...restProps }: Separator.RootProps = $props();
</script>

<Separator.Root
  bind:ref
  data-slot="input-otp-separator"
  class={cn(
    "rounded-full bg-input data-[orientation=horizontal]:h-0.5 data-[orientation=horizontal]:w-3",
    className,
  )}
  {...restProps}
/>
