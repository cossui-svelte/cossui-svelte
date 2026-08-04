

<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import { Button, type ButtonVariant } from '$lib/components/ui/button';
  import { cn } from '$lib/utils';

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

<Button
  bind:ref
  {type}
  class={cn(className)}
  {...restProps}
>
  {@render children?.()}
</Button>
