<script lang="ts">
  import { Combobox as ComboboxPrimitive } from '@shardsui/svelte/combobox';
  import type { ComponentProps } from 'svelte';
  import { cn } from '$lib/utils';

  let { class: className, ...restProps }: ComponentProps<typeof ComboboxPrimitive.GroupLabel> =
    $props();
</script>

<ComboboxPrimitive.GroupLabel
  class={cn('px-2 py-1.5 font-medium text-muted-foreground text-xs', className)}
  data-slot="combobox-group-label"
  {...restProps}
/>
