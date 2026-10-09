<script lang="ts">
  import type { Snippet } from 'svelte';
  import { setContext } from 'svelte';
  import { ADAPTIVE_MENU_KEY, type AdaptiveMenuVariant } from './context.js';

  let { variant, children }: { variant: AdaptiveMenuVariant; children?: Snippet } = $props();

  // The variant never changes for the lifetime of this instance.
  // svelte-ignore state_referenced_locally
  setContext(ADAPTIVE_MENU_KEY, variant);
</script>

{@render children?.()}
