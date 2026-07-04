<script lang="ts">
  import { CropperState } from './cropperState.svelte.js'
  import type { CropperProps, Point } from './types.js'

  let {
    image,
    crop = $bindable({ x: 0, y: 0 }),
    zoom = $bindable(1),
    minZoom = $bindable(1),
    maxZoom = $bindable(3),
    aspect = 4 / 3,
    cropSize = null,
    cropShape = 'rect',
    showGrid = true,
    zoomSpeed = 1,
    crossOrigin = null,
    restrictPosition = true,
    tabindex = undefined,
    oncropcomplete,
  }: Partial<CropperProps> = $props()

  const state = new CropperState({
    crop: () => crop,
    onCropChange: (point: Point) => (crop = point),
    zoom: () => zoom,
    onZoomChange: (newZoom: number) => (zoom = newZoom),
    minZoom: () => minZoom,
    maxZoom: () => maxZoom,
    aspect: () => aspect,
    cropSize: () => cropSize,
    restrictPosition: () => restrictPosition,
    zoomSpeed: () => zoomSpeed,
    oncropcomplete: event => oncropcomplete?.(event),
  })
</script>

<svelte:window onresize={state.computeSizes} />
<div
  class="svelte-easy-crop-container"
  use:state.container
  {tabindex}
  role="button"
  data-testid="container"
>
  <img
    use:state.image
    class="svelte-easy-crop-image"
    src={image}
    alt=""
    style="transform: translate({crop.x}px, {crop.y}px) scale({zoom});"
    crossorigin={crossOrigin}
  />
  {#if state.cropperSize}
    <div
      class="svelte-easy-crop-area"
      class:svelte-easy-crop-round={cropShape === 'round'}
      class:svelte-easy-crop-grid={showGrid}
      style="width: {state.cropperSize.width}px; height: {state.cropperSize.height}px;"
      data-testid="cropper"
    ></div>
  {/if}
</div>

<style>
  .svelte-easy-crop-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    user-select: none;
    touch-action: none;
    cursor: move;
  }

  .svelte-easy-crop-image {
    max-width: 100%;
    max-height: 100%;
    margin: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    will-change: transform;
  }

  .svelte-easy-crop-area {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 0 9999em;
    box-sizing: border-box;
    color: rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.5);
    overflow: hidden;
  }

  .svelte-easy-crop-grid:before {
    content: ' ';
    box-sizing: border-box;
    border: 1px solid rgba(255, 255, 255, 0.5);
    position: absolute;
    top: 0;
    bottom: 0;
    left: 33.33%;
    right: 33.33%;
    border-top: 0;
    border-bottom: 0;
  }

  .svelte-easy-crop-grid:after {
    content: ' ';
    box-sizing: border-box;
    border: 1px solid rgba(255, 255, 255, 0.5);
    position: absolute;
    top: 33.33%;
    bottom: 33.33%;
    left: 0;
    right: 0;
    border-left: 0;
    border-right: 0;
  }

  .svelte-easy-crop-round {
    border-radius: 50%;
  }
</style>
