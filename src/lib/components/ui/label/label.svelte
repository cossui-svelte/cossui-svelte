<script lang="ts">
  import type { HTMLLabelAttributes } from 'svelte/elements';
  import { cn, type WithElementRef } from '$lib/utils';

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLLabelAttributes, HTMLLabelElement> = $props();
</script>

<label
  bind:this={ref}
  class={cn(
    'inline-flex items-center gap-2 font-medium text-base/4.5 text-foreground sm:text-sm/4',
    className
  )}
  data-slot="label"
  {...restProps}
>
  {@render children?.()}
</label>
