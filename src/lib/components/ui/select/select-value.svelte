<script lang="ts">
  import { Select as SelectPrimitive } from '@shardsui/svelte/select';
  import type { ComponentProps } from 'svelte';
  import { cn } from '$lib/utils';

  let {
    class: className,
    ...restProps
  }: Omit<ComponentProps<typeof SelectPrimitive.Value>, 'children'> = $props();
</script>

<SelectPrimitive.Value
  class={cn('flex-1 truncate data-placeholder:text-muted-foreground/72', className)}
  data-slot="select-value"
  {...restProps}
/>
