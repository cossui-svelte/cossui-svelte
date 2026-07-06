<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { getCropperContext } from './cropper-context.js';

  let { class: className, style, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();

  const state = getCropperContext();
</script>

{#if state.cropAreaWidth > 0 && state.cropAreaHeight > 0}
  <div
    aria-hidden="true"
    style={`width: ${state.cropAreaWidth}px; height: ${state.cropAreaHeight}px;${style ? ` ${style}` : ''}`}
    class={className}
    {...restProps}
  ></div>
{/if}
