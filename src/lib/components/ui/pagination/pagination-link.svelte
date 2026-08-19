<script module lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAnchorAttributes } from 'svelte/elements';
  import { type ButtonSize, buttonVariants } from '$lib/components/ui/button';
  import type { WithElementRef } from '$lib/utils';

  export type Props = WithElementRef<HTMLAnchorAttributes> & {
    children: Snippet;
    isActive?: boolean;
    isDisabled?: boolean;
    size?: ButtonSize;
  };
</script>

<script lang="ts">
  import { cn } from '$lib/utils';

  let {
    children,
    class: className,
    isActive = false,
    ref = $bindable(null),
    size = 'icon',
    ...restProps
  }: Props = $props();
</script>

<a
  aria-current={isActive ? 'page' : undefined}
  class={cn(
    buttonVariants({
      size,
      variant: isActive ? 'outline' : 'ghost'
    }),
    className
  )}
  data-active={isActive}
  data-slot="pagination-link"
  {...restProps}
>
  {@render children()}
</a>
