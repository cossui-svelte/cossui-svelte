<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils';

  interface Props {
    children?: Snippet;
    class?: string;
  }

  let { children, class: className }: Props = $props();
</script>

<div class={cn('steps mb-8 ms-4 border-s ps-8 [counter-reset:step]', className)}>
  {@render children?.()}
</div>
