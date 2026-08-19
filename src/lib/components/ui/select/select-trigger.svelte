<script lang="ts">
  import ChevronsUpDown from '@lucide/svelte/icons/chevrons-up-down';
  import { Select as SelectPrimitive } from '@shardsui/svelte/select';
  import type { ComponentProps, Snippet } from 'svelte';
  import { cn } from '$lib/utils';
  import { type SelectTriggerVariants, selectTriggerVariants } from './select-trigget-variants';

  type Props = Omit<ComponentProps<typeof SelectPrimitive.Trigger>, 'children'> & {
    size?: SelectTriggerVariants['size'];
    children?: Snippet;
  };

  let { ref = $bindable(null), class: className, size, children, ...restProps }: Props = $props();
</script>

<SelectPrimitive.Trigger
  bind:ref
  class={cn(selectTriggerVariants({ size }), className)}
  data-slot="select-trigger"
  {...restProps}
>
  <span class="pointer-events-none flex items-center gap-2">
    {@render children?.()}
  </span>
  <SelectPrimitive.Icon class="pointer-events-none" data-slot="select-icon">
    <ChevronsUpDown class="-me-1 size-4.5 opacity-80 sm:size-4" />
  </SelectPrimitive.Icon>
</SelectPrimitive.Trigger>
