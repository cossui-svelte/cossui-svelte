<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { getCropperContext } from './cropper-context.js';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    children?: Snippet;
  }

  let { class: className, children, ...restProps }: Props = $props();

  const state = getCropperContext();
</script>

<div id={state.descriptionId} class={className} {...restProps}>
  {#if children}
    {@render children()}
  {:else}
    Use mouse wheel or pinch gesture to zoom. Drag with mouse or touch, or use arrow keys to pan the
    image within the crop area.
  {/if}
</div>
