<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '#lib/utils.js';
  import { useScrollHide } from '../lib/scroll-hide.svelte.js';

  let { class: className, children }: { class?: string; children?: Snippet } = $props();

  const hidden = useScrollHide();
</script>

<header
  class={cn(
    'fixed top-0 z-50 flex h-14 w-full items-center justify-between border-border border-b bg-sidebar px-4 transition-transform duration-500 ease-in-out md:hidden',
    hidden.current ? '-translate-y-full' : 'translate-y-0',
    className
  )}
>
  {@render children?.()}
</header>
