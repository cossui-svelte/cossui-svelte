<script lang="ts">
import type { Separator } from 'bits-ui';
import { cn } from '$lib/utils.js';

let {
  ref = $bindable(null),
  class: className,
  orientation = 'horizontal',
  ...restProps
}: Separator.RootProps & {
  orientation?: 'horizontal' | 'vertical';
} = $props();
</script>

<Separator.Root
  class={cn(
    "shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px data-[orientation=vertical]:not-[[class^='h-']]:not-[[class*='_h-']]:self-stretch",
    className,
  )}
  data-slot="separator"
  {orientation}
  {...restProps}
/>
