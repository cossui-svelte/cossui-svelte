<script lang="ts">
  import '@aejkatappaja/phantom-ui/ssr.css';
  import type { PhantomUiAttributes } from '@aejkatappaja/phantom-ui';
  import { onMount, type Snippet } from 'svelte';

  let {
    children,
    ...restProps
  }: PhantomUiAttributes & {
    children: Snippet;
  } = $props();

  // phantom-ui is a Lit custom element that extends HTMLElement at import time, which
  // doesn't exist in the workerd SSR runtime — register it in the browser only.
  onMount(() => {
    void import('@aejkatappaja/phantom-ui');
  });
</script>

<phantom-ui data-slot="skeleton" {...restProps}> {@render children?.()} </phantom-ui>
