<script lang="ts">
  import { Combobox as ComboboxPrimitive } from '@shardsui/svelte/combobox';
  import type { ComponentProps } from 'svelte';
  import { cn } from '$lib/utils';

  let { class: className, ...restProps }: ComponentProps<typeof ComboboxPrimitive.Group> = $props();
</script>

<ComboboxPrimitive.Group
  class={cn('[[role=group]+&]:mt-1.5', className)}
  data-slot="combobox-group"
  {...restProps}
/>
