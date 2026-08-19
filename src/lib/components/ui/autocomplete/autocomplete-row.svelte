<script lang="ts">
  import { Autocomplete as AutocompletePrimitive } from '@shardsui/svelte/autocomplete';
  import type { ComponentProps } from 'svelte';
  import { cn } from '$lib/utils';

  let { class: className, ...restProps }: ComponentProps<typeof AutocompletePrimitive.Row> =
    $props();
</script>

<AutocompletePrimitive.Row
  class={cn('flex flex-row', className)}
  data-slot="autocomplete-row"
  {...restProps}
/>
