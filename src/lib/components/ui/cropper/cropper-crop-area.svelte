<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '$lib/utils.js';
  import { getCropperContext } from './cropper-context.js';

  let { class: className, style, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();

  const state = getCropperContext();
</script>

{#if state.cropAreaWidth > 0 && state.cropAreaHeight > 0}
  <div
    aria-hidden="true"
    data-slot="cropper-crop-area"
    style={`width: ${state.cropAreaWidth}px; height: ${state.cropAreaHeight}px;${style ? ` ${style}` : ''}`}
    class={cn(
      'pointer-events-none absolute border-3 border-white shadow-[0_0_0_9999px_rgba(0,0,0,0.3)] in-[[data-slot=cropper]:focus-visible]:ring-[3px] in-[[data-slot=cropper]:focus-visible]:ring-white/50',
      className
    )}
    {...restProps}
  ></div>
{/if}
