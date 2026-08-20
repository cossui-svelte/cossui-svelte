<script lang="ts">
  import { Combobox as ComboboxPrimitive } from '@shardsui/svelte/combobox';
  import type { ComponentProps } from 'svelte';
  import { cn } from '$lib/utils';

  let { class: className, ...restProps }: ComponentProps<typeof ComboboxPrimitive.Row> = $props();
</script>

<ComboboxPrimitive.Row
  class={cn('flex flex-row', className)}
  data-slot="combobox-row"
  {...restProps}
/>
