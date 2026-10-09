<script lang="ts">
  import type { HTMLAnchorAttributes } from 'svelte/elements';
  import { href } from '../lib/router.svelte.js';

  let { ...restProps }: Omit<HTMLAnchorAttributes, 'href' | 'children'> = $props();
</script>

<a href={href('/')} {...restProps}>
  <h1
    class="font-bold font-heading text-foreground text-xl leading-none [font-variation-settings:'GEOM'_50,'opsz'_32] md:text-base lg:text-lg"
  >
    Cal<span class="md:max-lg:sr-only">.com</span>
  </h1>
</a>
