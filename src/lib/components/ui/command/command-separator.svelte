<script lang="ts">
  import { Autocomplete as AutocompletePrimitive } from '@shardsui/svelte/autocomplete';
  import type { ComponentProps } from 'svelte';
  import { cn } from '$lib/utils';

  let { class: className, ...restProps }: ComponentProps<typeof AutocompletePrimitive.Separator> =
    $props();
</script>

<AutocompletePrimitive.Separator
  class={cn('mx-2 h-px bg-border last:hidden my-2', className)}
  data-slot="command-separator"
  {...restProps}
/>
