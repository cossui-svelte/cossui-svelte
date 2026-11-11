<script lang="ts">
  import type { Snippet } from 'svelte';

  let { children }: { children: Snippet } = $props();
</script>

<svg
  aria-hidden="true"
  class="h-auto w-full overflow-visible font-sans text-foreground [font-optical-sizing:auto] [font-synthesis:none] [font-variation-settings:'GEOM'_25]"
  fill="none"
  focusable="false"
  stroke="currentColor"
  stroke-width="1"
  stroke-opacity="0.8"
  viewBox="0 0 560 440"
>
  {@render children()}
</svg>
