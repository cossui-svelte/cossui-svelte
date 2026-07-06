import CropperCropArea from './cropper-crop-area.svelte';
import CropperDescription from './cropper-description.svelte';
import CropperImage from './cropper-image.svelte';
import CropperRoot from './cropper-root.svelte';

export type { Area } from './cropper-state.svelte.js';
export { CropperCropArea, CropperDescription, CropperImage, CropperRoot };

export const Cropper = {
  CropArea: CropperCropArea,
  Description: CropperDescription,
  Image: CropperImage,
  Root: CropperRoot
};
