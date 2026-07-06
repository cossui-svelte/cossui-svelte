<script lang="ts" module>
  const CROPPER_DESC_WARN_MESSAGE = `Warning: \`CropperRoot\` requires a \`CropperDescription\` child for the component to be accessible for screen reader users.

If you want to hide the description visually, you can either pass your own class with sr-only styles.

Example:
<CropperRoot>
  ...
  <CropperDescription class="sr-only">
    Instructions for using the cropper.
  </CropperDescription>
  ...
</CropperRoot>
`;
</script>

<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { setCropperContext } from './cropper-context.js';
  import { type Area, CropperState } from './cropper-state.svelte.js';

  interface CropperRootProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
    aspectRatio?: number;
    children: Snippet;
    cropPadding?: number;
    image: string;
    keyboardStep?: number;
    maxZoom?: number;
    minZoom?: number;
    onCropChange?: (area: Area | null) => void;
    zoom?: number;
    zoomSensitivity?: number;
  }

  let {
    image,
    cropPadding = 25,
    aspectRatio = 1,
    minZoom = 1,
    maxZoom = 3,
    zoomSensitivity = 0.005,
    keyboardStep = 10,
    zoom = $bindable(minZoom),
    class: className,
    onCropChange,
    children,
    ...restProps
  }: CropperRootProps = $props();

  const descriptionId = $props.id();

  const cropper = new CropperState({
    aspectRatio: () => aspectRatio,
    cropPadding: () => cropPadding,
    descriptionId: () => descriptionId,
    image: () => image,
    keyboardStep: () => keyboardStep,
    maxZoom: () => maxZoom,
    minZoom: () => minZoom,
    onCropChange: (area) => onCropChange?.(area),
    onZoomChange: (newZoom) => (zoom = newZoom),
    zoom: () => zoom,
    zoomSensitivity: () => zoomSensitivity,
  });

  setCropperContext(cropper);

  let containerEl: HTMLDivElement | null = $state(null);
  let hasWarned = false;

  $effect(() => {
    const timeout = setTimeout(() => {
      if (containerEl && !hasWarned && !document.getElementById(descriptionId)) {
        console.warn(CROPPER_DESC_WARN_MESSAGE);
        hasWarned = true;
      }
    }, 100);
    return () => clearTimeout(timeout);
  });
</script>

<!-- biome-ignore lint/a11y/useAriaPropsSupportedByRole: role="application" is used so the widget can define its own custom interaction model, and aria-value* mirrors the same pattern as native sliders to expose zoom level -->
<div
  bind:this={containerEl}
  use:cropper.container
  class={className}
  tabindex={0}
  role="application"
  aria-label="Interactive image cropper"
  aria-describedby={descriptionId}
  aria-valuemin={cropper.minZoom}
  aria-valuemax={cropper.maxZoom}
  aria-valuenow={cropper.zoom}
  aria-valuetext={`Zoom: ${Math.round(cropper.zoom * 100)}%`}
  onkeydown={(e) => cropper.handleKeyDown(e)}
  onkeyup={(e) => cropper.handleKeyUp(e)}
  {...restProps}
>
  {@render children()}
</div>
