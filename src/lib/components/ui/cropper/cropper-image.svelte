<script lang="ts">
  import type { HTMLImgAttributes } from 'svelte/elements';
  import { cn } from '$lib/utils.js';
  import { getCropperContext } from './cropper-context.js';

  type Props = Omit<HTMLImgAttributes, 'src' | 'alt' | 'draggable' | 'style'>;

  let { class: className, ...restProps }: Props = $props();

  const state = getCropperContext();
</script>

{#if state.image}
  <div
    style={`width: ${state.imageWrapperWidth}px; height: ${state.imageWrapperHeight}px; transform: translate3d(${state.offsetX}px, ${state.offsetY}px, 0px) scale(${state.zoom}); position: absolute; left: calc(50% - ${state.imageWrapperWidth / 2}px); top: calc(50% - ${state.imageWrapperHeight / 2}px); will-change: transform;`}
  >
    <img
      src={state.image}
      alt="Image being cropped"
      draggable={false}
      aria-hidden="true"
      data-slot="cropper-image"
      class={cn('pointer-events-none h-full w-full object-cover', className)}
      {...restProps}
    />
  </div>
{/if}
