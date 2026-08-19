<script lang="ts">
  import { Autocomplete as AutocompletePrimitive } from '@shardsui/svelte/autocomplete';
  import type { ComponentProps } from 'svelte';
  import { cn } from '$lib/utils';

  let { class: className, ...restProps }: ComponentProps<typeof AutocompletePrimitive.Separator> =
    $props();
</script>

<AutocompletePrimitive.Separator
  class={cn('mx-2 my-1 h-px bg-border last:hidden', className)}
  data-slot="autocomplete-separator"
  {...restProps}
/>
