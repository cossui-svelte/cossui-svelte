<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { SvelteHTMLElements } from 'svelte/elements';
  import { cn, type WithElementRef } from '$lib/utils';

  type Props = WithElementRef<SvelteHTMLElements['nav']> & {
    children: Snippet;
  };

  let { children, class: className, ref = $bindable(null), ...restProps }: Props = $props();
</script>

<nav
  aria-label="pagination"
  class={cn('mx-auto flex w-full justify-center', className)}
  data-slot="pagination"
  {...restProps}
>
  {@render children()}
</nav>
