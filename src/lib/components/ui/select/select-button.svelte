<script lang="ts">
  import ChevronsUpDown from '@lucide/svelte/icons/chevrons-up-down';
  import type { Snippet } from 'svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import { cn } from '$lib/utils';
  import { type SelectTriggerVariants, selectTriggerVariants } from './select-trigger-variants';

  type Props = HTMLButtonAttributes & {
    ref?: HTMLButtonElement | null;
    size?: SelectTriggerVariants['size'];
    children?: Snippet;
  };

  let {
    ref = $bindable(null),
    class: className,
    size,
    type = 'button',
    children,
    ...restProps
  }: Props = $props();
</script>

<button
  bind:this={ref}
  class={cn(selectTriggerVariants({ size }), 'min-w-0', className)}
  data-slot="select-button"
  {type}
  {...restProps}
>
  <span class="flex-1 truncate in-data-placeholder:text-muted-foreground/72">
    {@render children?.()}
  </span>
  <ChevronsUpDown class="-me-1 size-4.5 opacity-80 sm:size-4" />
</button>
