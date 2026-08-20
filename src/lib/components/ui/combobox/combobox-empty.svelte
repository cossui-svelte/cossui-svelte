<script lang="ts">
  import { Combobox as ComboboxPrimitive } from '@shardsui/svelte/combobox';
  import type { ComponentProps } from 'svelte';
  import { cn } from '$lib/utils';

  let { class: className, ...restProps }: ComponentProps<typeof ComboboxPrimitive.Empty> = $props();
</script>

<ComboboxPrimitive.Empty
  class={cn('p-2 text-center text-base text-muted-foreground sm:text-sm', className)}
  data-slot="combobox-empty"
  {...restProps}
/>
