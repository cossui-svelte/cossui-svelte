import type { HTMLImgAttributes } from 'svelte/elements';

export type CropShape = 'rect' | 'round';

export type OnCropCompleteEvent = { percent: CropArea; pixels: CropArea };
export type OnCropComplete = (event: OnCropCompleteEvent) => void;

export type CropperProps = {
  image: string;
  crop: Point;
  zoom: number;
  aspect: number;
  minZoom: number;
  maxZoom: number;
  cropSize: Size | null;
  cropShape: CropShape;
  showGrid: boolean;
  zoomSpeed: number;
  crossOrigin: HTMLImgAttributes['crossorigin'];
  restrictPosition: boolean;
  tabindex: number | undefined;
  oncropcomplete: OnCropComplete;
};

export interface Size {
  height: number;
  width: number;
}

export interface ImageSize {
  height: number;
  naturalHeight: number;
  naturalWidth: number;
  width: number;
}

export interface Point {
  x: number;
  y: number;
}

export interface CropArea {
  height: number;
  width: number;
  x: number;
  y: number;
}

export interface DispatchEvents {
  cropcomplete: {
    percent: CropArea;
    pixels: CropArea;
  };
}
