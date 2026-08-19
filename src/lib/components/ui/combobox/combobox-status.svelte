<script lang="ts">
  import { Combobox as ComboboxPrimitive } from '@shardsui/svelte/combobox';
  import type { ComponentProps } from 'svelte';
  import { cn } from '$lib/utils';

  let { class: className, ...restProps }: ComponentProps<typeof ComboboxPrimitive.Status> =
    $props();
</script>

<ComboboxPrimitive.Status
  class={cn('px-3 py-2 font-medium text-muted-foreground text-xs empty:m-0 empty:p-0', className)}
  data-slot="combobox-status"
  {...restProps}
/>
