<script lang="ts">
  import { Combobox as ComboboxPrimitive } from '@shardsui/svelte/combobox';
  import type { ComponentProps } from 'svelte';
  import { cn } from '$lib/utils';

  let { class: className, ...restProps }: ComponentProps<typeof ComboboxPrimitive.Separator> =
    $props();
</script>

<ComboboxPrimitive.Separator
  class={cn('mx-2 my-1 h-px bg-border last:hidden', className)}
  data-slot="combobox-separator"
  {...restProps}
/>
