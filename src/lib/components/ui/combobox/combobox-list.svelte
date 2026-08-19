<script lang="ts">
  import { Combobox as ComboboxPrimitive } from '@shardsui/svelte/combobox';
  import type { ComponentProps, Snippet } from 'svelte';
  import { cn } from '$lib/utils';

  type Props = Omit<ComponentProps<typeof ComboboxPrimitive.List>, 'children'> & {
    children?: Snippet;
  };

  let { ref = $bindable(null), class: className, children, ...restProps }: Props = $props();
</script>

<div
  class="overflow-y-auto overscroll-contain"
  style="max-height: min(var(--available-height, 100vh), 23rem)"
>
  <ComboboxPrimitive.List
    bind:ref
    class={cn('scroll-py-1 px-1 py-1', className)}
    data-slot="combobox-list"
    {...restProps}
  >
    {@render children?.()}
  </ComboboxPrimitive.List>
</div>
