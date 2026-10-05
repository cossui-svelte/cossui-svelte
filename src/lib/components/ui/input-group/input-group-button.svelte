<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import { Button } from '#lib/components/ui/button/index.js';
  import { cn } from '#lib/utils.js';

  let {
    ref = $bindable(null),
    class: className,
    children,
    type = 'button',
    ...restProps
  }: Omit<HTMLButtonAttributes, 'type'> & {
    ref?: HTMLElement | null;
    type?: HTMLButtonAttributes['type'];
    children?: Snippet;
    loading?: boolean;
  } = $props();
</script>

<Button bind:ref {type} class={cn(className)} {...restProps}>{@render children?.()}</Button>
