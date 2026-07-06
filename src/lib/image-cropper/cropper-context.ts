import { getContext, setContext } from 'svelte';
import type { CropperState } from './cropper-state.svelte.js';

const CROPPER_KEY = Symbol('cossui.cropper');

export function setCropperContext(state: CropperState) {
  setContext<CropperState>(CROPPER_KEY, state);
}

export function getCropperContext(): CropperState {
  const ctx = getContext<CropperState>(CROPPER_KEY);
  if (!ctx) {
    throw new Error(
      'Cossui-svelte cropper context was not found. Wrap your components in a <CropperRoot>.'
    );
  }
  return ctx;
}
