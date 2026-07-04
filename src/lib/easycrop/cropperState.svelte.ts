import type { Action } from 'svelte/action';
import * as helpers from './helpers.js';
import type { ImageSize, OnCropComplete, Point, Size } from './types.js';

export interface CropperStateOptions {
  aspect: () => number;
  crop: () => Point;
  cropSize: () => Size | null;
  maxZoom: () => number;
  minZoom: () => number;
  onCropChange: (point: Point) => void;
  oncropcomplete?: OnCropComplete;
  onZoomChange: (zoom: number) => void;
  restrictPosition: () => boolean;
  zoom: () => number;
  zoomSpeed: () => number;
}

// this is to prevent Safari on iOS >= 10 to zoom the page
const preventZoomSafari = (e: Event) => e.preventDefault();

/**
 * Headless, framework-markup-free cropper logic: all the drag/pinch/zoom math and
 * DOM event wiring, exposed as reactive state + Svelte actions so any markup can drive it.
 */
export class CropperState {
  imageSize = $state<ImageSize>({ height: 0, naturalHeight: 0, naturalWidth: 0, width: 0 });

  // derived from imageSize + the cropSize/aspect options, so it recomputes on either
  // the image loading/resizing or the consumer changing those props - no manual effect needed
  cropperSize = $derived.by<Size | null>(() => {
    if (this.imageSize.width === 0) return null;
    const cropSize = this.#options.cropSize();
    return (
      cropSize ??
      helpers.getCropSize(this.imageSize.width, this.imageSize.height, this.#options.aspect())
    );
  });

  #options: CropperStateOptions;
  #containerEl: HTMLDivElement | null = null;
  #containerRect: DOMRect | null = null;
  #imgEl: HTMLImageElement | null = null;
  #dragStartPosition: Point = { x: 0, y: 0 };
  #dragStartCrop: Point = { x: 0, y: 0 };
  #lastPinchDistance = 0;
  #rafDragTimeout: number | null = null;
  #rafZoomTimeout: number | null = null;

  constructor(options: CropperStateOptions) {
    this.#options = options;

    // when zoom changes, we recompute the cropped area
    $effect(() => {
      if (this.zoom) {
        this.emitCropData();
      }
    });
  }

  get crop() {
    return this.#options.crop();
  }
  set crop(point: Point) {
    this.#options.onCropChange(point);
  }

  get zoom() {
    return this.#options.zoom();
  }
  set zoom(zoom: number) {
    this.#options.onZoomChange(zoom);
  }

  #getAspect = () => {
    const cropSize = this.#options.cropSize();
    if (cropSize) {
      return cropSize.width / cropSize.height;
    }
    return this.#options.aspect();
  };

  #cleanEvents = () => {
    if (typeof document !== 'undefined') {
      document.removeEventListener('mousemove', this.#onMouseMove);
      document.removeEventListener('mouseup', this.#onDragStopped);
      document.removeEventListener('touchmove', this.#onTouchMove);
      document.removeEventListener('touchend', this.#onDragStopped);
    }
  };

  computeSizes = () => {
    if (this.#imgEl) {
      this.imageSize = {
        height: this.#imgEl.height,
        naturalHeight: this.#imgEl.naturalHeight,
        naturalWidth: this.#imgEl.naturalWidth,
        width: this.#imgEl.width
      };
    }
    if (this.#containerEl) {
      this.#containerRect = this.#containerEl.getBoundingClientRect();
    }
  };

  #getMousePoint = (e: MouseEvent) => ({
    x: Number(e.clientX),
    y: Number(e.clientY)
  });

  #getTouchPoint = (touch: TouchEvent['touches'][0]) => ({
    x: Number(touch.clientX),
    y: Number(touch.clientY)
  });

  #onMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    document.addEventListener('mousemove', this.#onMouseMove);
    document.addEventListener('mouseup', this.#onDragStopped);
    this.#onDragStart(this.#getMousePoint(e));
  };

  #onMouseMove = (e: MouseEvent) => this.#onDrag(this.#getMousePoint(e));

  #onTouchStart = (e: TouchEvent) => {
    e.preventDefault();
    document.addEventListener('touchmove', this.#onTouchMove, { passive: false }); // iOS 11 now defaults to passive: true
    document.addEventListener('touchend', this.#onDragStopped);

    if (e.touches.length === 2) {
      this.#onPinchStart(e);
    } else if (e.touches.length === 1) {
      this.#onDragStart(this.#getTouchPoint(e.touches[0]));
    }
  };

  #onTouchMove = (e: TouchEvent) => {
    // Prevent whole page from scrolling on iOS.
    e.preventDefault();
    if (e.touches.length === 2) {
      this.#onPinchMove(e);
    } else if (e.touches.length === 1) {
      this.#onDrag(this.#getTouchPoint(e.touches[0]));
    }
  };

  #onDragStart = ({ x, y }: Point) => {
    this.#dragStartPosition = { x, y };
    this.#dragStartCrop = { x: this.crop.x, y: this.crop.y };
  };

  #onDrag = ({ x, y }: Point) => {
    if (this.#rafDragTimeout) window.cancelAnimationFrame(this.#rafDragTimeout);

    this.#rafDragTimeout = window.requestAnimationFrame(() => {
      if (x === undefined || y === undefined || !this.cropperSize) return;
      const offsetX = x - this.#dragStartPosition.x;
      const offsetY = y - this.#dragStartPosition.y;
      const requestedPosition = {
        x: this.#dragStartCrop.x + offsetX,
        y: this.#dragStartCrop.y + offsetY
      };

      this.crop = this.#options.restrictPosition()
        ? helpers.restrictPosition(requestedPosition, this.imageSize, this.cropperSize, this.zoom)
        : requestedPosition;
    });
  };

  #onDragStopped = () => {
    this.#cleanEvents();
    this.emitCropData();
  };

  #onPinchStart = (e: TouchEvent) => {
    const pointA = this.#getTouchPoint(e.touches[0]);
    const pointB = this.#getTouchPoint(e.touches[1]);
    this.#lastPinchDistance = helpers.getDistanceBetweenPoints(pointA, pointB);
    this.#onDragStart(helpers.getCenter(pointA, pointB));
  };

  #onPinchMove = (e: TouchEvent) => {
    const pointA = this.#getTouchPoint(e.touches[0]);
    const pointB = this.#getTouchPoint(e.touches[1]);
    const center = helpers.getCenter(pointA, pointB);
    this.#onDrag(center);

    if (this.#rafZoomTimeout) window.cancelAnimationFrame(this.#rafZoomTimeout);
    this.#rafZoomTimeout = window.requestAnimationFrame(() => {
      const distance = helpers.getDistanceBetweenPoints(pointA, pointB);
      const newZoom = this.zoom * (distance / this.#lastPinchDistance);
      this.#setNewZoom(newZoom, center);
      this.#lastPinchDistance = distance;
    });
  };

  #onWheel = (e: WheelEvent) => {
    e.preventDefault();
    const point = this.#getMousePoint(e);
    const newZoom = this.zoom - (e.deltaY * this.#options.zoomSpeed()) / 200;
    this.#setNewZoom(newZoom, point);
  };

  #getPointOnContainer = ({ x, y }: Point) => {
    if (!this.#containerRect) {
      throw new Error('The Cropper is not mounted');
    }
    return {
      x: this.#containerRect.width / 2 - (x - this.#containerRect.left),
      y: this.#containerRect.height / 2 - (y - this.#containerRect.top)
    };
  };

  #getPointOnImage = ({ x, y }: Point) => ({
    x: (x + this.crop.x) / this.zoom,
    y: (y + this.crop.y) / this.zoom
  });

  #setNewZoom = (newZoom: number, point: Point) => {
    if (!this.cropperSize) return;
    const zoomPoint = this.#getPointOnContainer(point);
    const zoomTarget = this.#getPointOnImage(zoomPoint);
    const zoom = Math.min(this.#options.maxZoom(), Math.max(newZoom, this.#options.minZoom()));
    this.zoom = zoom;

    const requestedPosition = {
      x: zoomTarget.x * zoom - zoomPoint.x,
      y: zoomTarget.y * zoom - zoomPoint.y
    };
    this.crop = this.#options.restrictPosition()
      ? helpers.restrictPosition(requestedPosition, this.imageSize, this.cropperSize, zoom)
      : requestedPosition;
  };

  emitCropData = () => {
    if (!this.cropperSize || this.cropperSize.width === 0) return;
    // this is to ensure the crop is correctly restricted after a zoom back (https://github.com/ricardo-ch/svelte-easy-crop/issues/6)
    const position = this.#options.restrictPosition()
      ? helpers.restrictPosition(this.crop, this.imageSize, this.cropperSize, this.zoom)
      : this.crop;
    const { croppedAreaPercentages, croppedAreaPixels } = helpers.computeCroppedArea(
      position,
      this.imageSize,
      this.cropperSize,
      this.#getAspect(),
      this.zoom,
      this.#options.restrictPosition()
    );

    this.#options.oncropcomplete?.({
      percent: croppedAreaPercentages,
      pixels: croppedAreaPixels
    });
  };

  /** Svelte action: attach to the element that hosts pointer/wheel/gesture handling. */
  container: Action<HTMLDivElement> = (node) => {
    this.#containerEl = node;
    node.addEventListener('touchstart', this.#onTouchStart);
    node.addEventListener('mousedown', this.#onMouseDown);
    node.addEventListener('wheel', this.#onWheel, { passive: false });
    node.addEventListener('gesturestart', preventZoomSafari);
    node.addEventListener('gesturechange', preventZoomSafari);
    this.computeSizes();

    return {
      destroy: () => {
        node.removeEventListener('touchstart', this.#onTouchStart);
        node.removeEventListener('mousedown', this.#onMouseDown);
        node.removeEventListener('wheel', this.#onWheel);
        node.removeEventListener('gesturestart', preventZoomSafari);
        node.removeEventListener('gesturechange', preventZoomSafari);
        this.#cleanEvents();
      }
    };
  };

  /** Svelte action: attach to the <img> element being cropped. */
  image: Action<HTMLImageElement> = (node) => {
    this.#imgEl = node;
    const handleLoad = () => {
      this.computeSizes();
      this.emitCropData();
    };
    // when rendered via SSR, the image can already be loaded and its load event will never fire
    if (node.complete) handleLoad();
    node.addEventListener('load', handleLoad);

    return {
      destroy: () => node.removeEventListener('load', handleLoad)
    };
  };
}
