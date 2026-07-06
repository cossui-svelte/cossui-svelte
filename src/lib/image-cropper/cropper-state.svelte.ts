import { untrack } from 'svelte';
import type { Action } from 'svelte/action';

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function getPinchDistance(touches: TouchList): number {
  return Math.hypot(
    touches[1].clientX - touches[0].clientX,
    touches[1].clientY - touches[0].clientY
  );
}

function getPinchCenter(touches: TouchList): { x: number; y: number } {
  return {
    x: (touches[0].clientX + touches[1].clientX) / 2,
    y: (touches[0].clientY + touches[1].clientY) / 2
  };
}

export type Area = { x: number; y: number; width: number; height: number };

export interface CropperStateOptions {
  aspectRatio: () => number;
  cropPadding: () => number;
  descriptionId: () => string;
  image: () => string;
  keyboardStep: () => number;
  maxZoom: () => number;
  minZoom: () => number;
  onCropChange?: (area: Area | null) => void;
  onZoomChange: (zoom: number) => void;
  zoom: () => number;
  zoomSensitivity: () => number;
}

/**
 * Headless cropper logic: drag/pinch/zoom math and DOM event wiring, exposed as
 * reactive state + a Svelte action so Root/Image/CropArea markup can drive it.
 */
export class CropperState {
  imgWidth = $state<number | null>(null);
  imgHeight = $state<number | null>(null);
  cropAreaWidth = $state(0);
  cropAreaHeight = $state(0);
  offsetX = $state(0);
  offsetY = $state(0);
  isDragging = $state(false);

  // depends only on reactive state, so it recomputes automatically whenever the
  // image loads/changes or the crop area is resized - no manual effect needed
  imageWrapperSize = $derived.by<{ width: number; height: number }>(() => {
    if (this.cropAreaWidth <= 0 || this.cropAreaHeight <= 0 || !this.imgWidth || !this.imgHeight) {
      return { height: 0, width: 0 };
    }
    const naturalAspect = this.imgWidth / this.imgHeight;
    const cropAspect = this.cropAreaWidth / this.cropAreaHeight;
    if (naturalAspect >= cropAspect) {
      const height = this.cropAreaHeight;
      return { height, width: height * naturalAspect };
    }
    const width = this.cropAreaWidth;
    return { height: width / naturalAspect, width };
  });

  #options: CropperStateOptions;
  #containerEl: HTMLDivElement | null = null;
  #resizeObserver: ResizeObserver | null = null;
  #isInitialSetupDone = false;
  #dragStartPoint: { x: number; y: number } = { x: 0, y: 0 };
  #dragStartOffset: { x: number; y: number } = { x: 0, y: 0 };
  #isPinching = false;
  #initialPinchDistance = 0;
  #initialPinchZoom = 1;

  constructor(options: CropperStateOptions) {
    this.#options = options;

    // (re)initializes offsets/zoom whenever the source image changes, and loads
    // its natural dimensions so the crop area/wrapper sizing effect can run
    $effect(() => {
      const src = this.#options.image();
      this.offsetX = 0;
      this.offsetY = 0;
      this.zoom = this.#options.minZoom();
      this.#isInitialSetupDone = false;

      if (!src) {
        this.imgWidth = null;
        this.imgHeight = null;
        return;
      }

      let isMounted = true;
      const img = new Image();
      img.onload = () => {
        if (isMounted) {
          this.imgWidth = img.naturalWidth;
          this.imgHeight = img.naturalHeight;
        }
      };
      img.onerror = () => {
        if (isMounted) {
          this.imgWidth = null;
          this.imgHeight = null;
        }
      };
      img.src = src;

      return () => {
        isMounted = false;
      };
    });

    // keeps the offset restricted to the wrapper/crop-area bounds whenever sizing
    // or zoom changes, and (re)emits crop data - reads offsetX/Y untracked to avoid
    // re-running merely because a drag/pinch/keyboard handler moved the image
    $effect(() => {
      const wrapperWidth = this.imageWrapperWidth;
      const wrapperHeight = this.imageWrapperHeight;
      const cropAreaWidth = this.cropAreaWidth;
      const cropAreaHeight = this.cropAreaHeight;
      const currentZoom = this.zoom;

      if (wrapperWidth > 0 && wrapperHeight > 0 && cropAreaWidth > 0 && cropAreaHeight > 0) {
        if (!this.#isInitialSetupDone) {
          const restricted = this.#restrictOffset(0, 0, currentZoom);
          this.offsetX = restricted.x;
          this.offsetY = restricted.y;
          this.#emitCropChange(restricted.x, restricted.y, currentZoom);
          this.#isInitialSetupDone = true;
        } else {
          const { x: currentX, y: currentY } = untrack(() => ({
            x: this.offsetX,
            y: this.offsetY
          }));
          const restricted = this.#restrictOffset(currentX, currentY, currentZoom);
          if (restricted.x !== currentX || restricted.y !== currentY) {
            this.offsetX = restricted.x;
            this.offsetY = restricted.y;
          }
          this.#emitCropChange(restricted.x, restricted.y, currentZoom);
        }
      } else {
        this.#isInitialSetupDone = false;
        this.offsetX = 0;
        this.offsetY = 0;
        this.zoom = this.#options.minZoom();
        this.#options.onCropChange?.(null);
      }
    });
  }

  get image() {
    return this.#options.image();
  }

  get minZoom() {
    return this.#options.minZoom();
  }

  get maxZoom() {
    return this.#options.maxZoom();
  }

  get descriptionId() {
    return this.#options.descriptionId();
  }

  get imageWrapperWidth() {
    return this.imageWrapperSize.width;
  }

  get imageWrapperHeight() {
    return this.imageWrapperSize.height;
  }

  get zoom() {
    return this.#options.zoom();
  }
  set zoom(value: number) {
    this.#options.onZoomChange(clamp(value, this.#options.minZoom(), this.#options.maxZoom()));
  }

  #restrictOffset(x: number, y: number, zoom: number): { x: number; y: number } {
    const wrapperWidth = this.imageWrapperWidth;
    const wrapperHeight = this.imageWrapperHeight;
    if (
      wrapperWidth <= 0 ||
      wrapperHeight <= 0 ||
      this.cropAreaWidth <= 0 ||
      this.cropAreaHeight <= 0
    ) {
      return { x: 0, y: 0 };
    }
    const effectiveWrapperWidth = wrapperWidth * zoom;
    const effectiveWrapperHeight = wrapperHeight * zoom;
    const maxDragX = Math.max(0, (effectiveWrapperWidth - this.cropAreaWidth) / 2);
    const maxDragY = Math.max(0, (effectiveWrapperHeight - this.cropAreaHeight) / 2);
    return { x: clamp(x, -maxDragX, maxDragX), y: clamp(y, -maxDragY, maxDragY) };
  }

  #calculateCropData(offsetX: number, offsetY: number, zoom: number): Area | null {
    const {
      imgWidth,
      imgHeight,
      imageWrapperWidth: wrapperWidth,
      imageWrapperHeight: wrapperHeight
    } = this;
    const { cropAreaWidth, cropAreaHeight } = this;
    if (
      !imgWidth ||
      !imgHeight ||
      wrapperWidth <= 0 ||
      wrapperHeight <= 0 ||
      cropAreaWidth <= 0 ||
      cropAreaHeight <= 0
    ) {
      return null;
    }

    const scaledWrapperWidth = wrapperWidth * zoom;
    const scaledWrapperHeight = wrapperHeight * zoom;
    const topLeftOffsetX = offsetX + (cropAreaWidth - scaledWrapperWidth) / 2;
    const topLeftOffsetY = offsetY + (cropAreaHeight - scaledWrapperHeight) / 2;
    const baseScale = imgWidth / wrapperWidth;
    if (Number.isNaN(baseScale) || baseScale === 0) return null;

    const sx = (-topLeftOffsetX * baseScale) / zoom;
    const sy = (-topLeftOffsetY * baseScale) / zoom;
    const sWidth = (cropAreaWidth * baseScale) / zoom;
    const sHeight = (cropAreaHeight * baseScale) / zoom;

    const finalX = clamp(Math.round(sx), 0, imgWidth);
    const finalY = clamp(Math.round(sy), 0, imgHeight);
    const finalWidth = clamp(Math.round(sWidth), 0, imgWidth - finalX);
    const finalHeight = clamp(Math.round(sHeight), 0, imgHeight - finalY);

    if (finalWidth <= 0 || finalHeight <= 0) return null;
    return { height: finalHeight, width: finalWidth, x: finalX, y: finalY };
  }

  #emitCropChange(offsetX: number, offsetY: number, zoom: number) {
    this.#options.onCropChange?.(this.#calculateCropData(offsetX, offsetY, zoom));
  }

  #handleInteractionEnd = () => {
    this.#emitCropChange(this.offsetX, this.offsetY, this.zoom);
  };

  #updateCropAreaDimensions(containerWidth: number, containerHeight: number) {
    if (containerWidth <= 0 || containerHeight <= 0) {
      this.cropAreaWidth = 0;
      this.cropAreaHeight = 0;
      return;
    }
    const cropPadding = this.#options.cropPadding();
    const aspectRatio = this.#options.aspectRatio();
    const maxPossibleWidth = Math.max(0, containerWidth - cropPadding * 2);
    const maxPossibleHeight = Math.max(0, containerHeight - cropPadding * 2);
    if (maxPossibleWidth / aspectRatio >= maxPossibleHeight) {
      this.cropAreaHeight = maxPossibleHeight;
      this.cropAreaWidth = maxPossibleHeight * aspectRatio;
    } else {
      this.cropAreaWidth = maxPossibleWidth;
      this.cropAreaHeight = maxPossibleWidth / aspectRatio;
    }
  }

  #onMouseDown = (e: MouseEvent) => {
    if (e.button !== 0 || !this.#containerEl) return;
    e.preventDefault();
    this.isDragging = true;
    this.#isPinching = false;
    this.#dragStartPoint = { x: e.clientX, y: e.clientY };
    this.#dragStartOffset = { x: this.offsetX, y: this.offsetY };
    window.addEventListener('mousemove', this.#onMouseMove);
    window.addEventListener('mouseup', this.#onMouseUp);
  };

  #onMouseMove = (e: MouseEvent) => {
    const targetX = this.#dragStartOffset.x + (e.clientX - this.#dragStartPoint.x);
    const targetY = this.#dragStartOffset.y + (e.clientY - this.#dragStartPoint.y);
    const restricted = this.#restrictOffset(targetX, targetY, this.zoom);
    this.offsetX = restricted.x;
    this.offsetY = restricted.y;
  };

  #onMouseUp = () => {
    this.isDragging = false;
    window.removeEventListener('mousemove', this.#onMouseMove);
    window.removeEventListener('mouseup', this.#onMouseUp);
    this.#handleInteractionEnd();
  };

  #onWheel = (e: WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!this.#containerEl || this.imageWrapperWidth <= 0 || this.imageWrapperHeight <= 0) return;

    const currentZoom = this.zoom;
    const currentOffsetX = this.offsetX;
    const currentOffsetY = this.offsetY;
    const targetZoom = currentZoom + -e.deltaY * this.#options.zoomSensitivity();

    if (clamp(targetZoom, this.#options.minZoom(), this.#options.maxZoom()) === currentZoom) return;

    const rect = this.#containerEl.getBoundingClientRect();
    const pointerX = e.clientX - rect.left - rect.width / 2;
    const pointerY = e.clientY - rect.top - rect.height / 2;
    const imagePointX = (pointerX - currentOffsetX) / currentZoom;
    const imagePointY = (pointerY - currentOffsetY) / currentZoom;

    this.zoom = targetZoom;
    const finalZoom = this.zoom;

    const restricted = this.#restrictOffset(
      pointerX - imagePointX * finalZoom,
      pointerY - imagePointY * finalZoom,
      finalZoom
    );
    this.offsetX = restricted.x;
    this.offsetY = restricted.y;
    this.#emitCropChange(restricted.x, restricted.y, finalZoom);
  };

  #onTouchStart = (e: TouchEvent) => {
    if (!this.#containerEl || this.imageWrapperWidth <= 0 || this.imageWrapperHeight <= 0) return;
    e.preventDefault();
    const touches = e.touches;

    if (touches.length === 1) {
      this.isDragging = true;
      this.#isPinching = false;
      this.#dragStartPoint = { x: touches[0].clientX, y: touches[0].clientY };
      this.#dragStartOffset = { x: this.offsetX, y: this.offsetY };
    } else if (touches.length === 2) {
      this.isDragging = false;
      this.#isPinching = true;
      this.#initialPinchDistance = getPinchDistance(touches);
      this.#initialPinchZoom = this.zoom;
      this.#dragStartOffset = { x: this.offsetX, y: this.offsetY };
    }
  };

  #onTouchMove = (e: TouchEvent) => {
    if (!this.#containerEl || this.imageWrapperWidth <= 0 || this.imageWrapperHeight <= 0) return;
    e.preventDefault();
    const touches = e.touches;

    if (touches.length === 1 && this.isDragging && !this.#isPinching) {
      const targetX = this.#dragStartOffset.x + (touches[0].clientX - this.#dragStartPoint.x);
      const targetY = this.#dragStartOffset.y + (touches[0].clientY - this.#dragStartPoint.y);
      const restricted = this.#restrictOffset(targetX, targetY, this.zoom);
      this.offsetX = restricted.x;
      this.offsetY = restricted.y;
    } else if (touches.length === 2 && this.#isPinching) {
      const currentDistance = getPinchDistance(touches);
      const targetZoom = this.#initialPinchZoom * (currentDistance / this.#initialPinchDistance);

      if (clamp(targetZoom, this.#options.minZoom(), this.#options.maxZoom()) === this.zoom) return;

      const center = getPinchCenter(touches);
      const rect = this.#containerEl.getBoundingClientRect();
      const centerX = center.x - rect.left - rect.width / 2;
      const centerY = center.y - rect.top - rect.height / 2;
      const imagePointX = (centerX - this.#dragStartOffset.x) / this.#initialPinchZoom;
      const imagePointY = (centerY - this.#dragStartOffset.y) / this.#initialPinchZoom;

      this.zoom = targetZoom;
      const finalZoom = this.zoom;

      const restricted = this.#restrictOffset(
        centerX - imagePointX * finalZoom,
        centerY - imagePointY * finalZoom,
        finalZoom
      );
      this.offsetX = restricted.x;
      this.offsetY = restricted.y;
      this.#emitCropChange(restricted.x, restricted.y, finalZoom);
    }
  };

  #onTouchEnd = (e: TouchEvent) => {
    e.preventDefault();
    const touches = e.touches;

    if (this.#isPinching && touches.length < 2) {
      this.#isPinching = false;
      if (touches.length === 1) {
        this.isDragging = true;
        this.#dragStartPoint = { x: touches[0].clientX, y: touches[0].clientY };
        this.#dragStartOffset = { x: this.offsetX, y: this.offsetY };
      } else {
        this.isDragging = false;
        this.#handleInteractionEnd();
      }
    } else if (this.isDragging && touches.length === 0) {
      this.isDragging = false;
      this.#handleInteractionEnd();
    }
  };

  handleKeyDown(e: KeyboardEvent) {
    if (this.imageWrapperWidth <= 0) return;
    let targetX = this.offsetX;
    let targetY = this.offsetY;
    const step = this.#options.keyboardStep();

    switch (e.key) {
      case 'ArrowUp':
        targetY += step;
        break;
      case 'ArrowDown':
        targetY -= step;
        break;
      case 'ArrowLeft':
        targetX += step;
        break;
      case 'ArrowRight':
        targetX -= step;
        break;
      default:
        return;
    }

    e.preventDefault();
    const restricted = this.#restrictOffset(targetX, targetY, this.zoom);
    this.offsetX = restricted.x;
    this.offsetY = restricted.y;
  }

  handleKeyUp(e: KeyboardEvent) {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      this.#handleInteractionEnd();
    }
  }

  /** Svelte action: attach to the element that hosts pointer/wheel/gesture handling. */
  container: Action<HTMLDivElement> = (node) => {
    this.#containerEl = node;
    this.#resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) this.#updateCropAreaDimensions(width, height);
      }
    });
    this.#resizeObserver.observe(node);
    if (node.clientWidth > 0 && node.clientHeight > 0) {
      this.#updateCropAreaDimensions(node.clientWidth, node.clientHeight);
    }

    node.addEventListener('mousedown', this.#onMouseDown);
    node.addEventListener('wheel', this.#onWheel, { passive: false });
    node.addEventListener('touchstart', this.#onTouchStart, { passive: false });
    node.addEventListener('touchmove', this.#onTouchMove, { passive: false });
    node.addEventListener('touchend', this.#onTouchEnd, { passive: false });
    node.addEventListener('touchcancel', this.#onTouchEnd, { passive: false });

    return {
      destroy: () => {
        this.#resizeObserver?.disconnect();
        node.removeEventListener('mousedown', this.#onMouseDown);
        node.removeEventListener('wheel', this.#onWheel);
        node.removeEventListener('touchstart', this.#onTouchStart);
        node.removeEventListener('touchmove', this.#onTouchMove);
        node.removeEventListener('touchend', this.#onTouchEnd);
        node.removeEventListener('touchcancel', this.#onTouchEnd);
        window.removeEventListener('mousemove', this.#onMouseMove);
        window.removeEventListener('mouseup', this.#onMouseUp);
      }
    };
  };
}
