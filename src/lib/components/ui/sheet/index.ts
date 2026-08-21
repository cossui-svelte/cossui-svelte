import { Dialog as SheetPrimitive } from '@shardsui/svelte/dialog';

export { default as Sheet } from './sheet.svelte';
export { default as SheetBackdrop, default as SheetOverlay } from './sheet-backdrop.svelte';
export { default as SheetClose } from './sheet-close.svelte';
export { default as SheetDescription } from './sheet-description.svelte';
export { default as SheetFooter } from './sheet-footer.svelte';
export { default as SheetHeader } from './sheet-header.svelte';
export { default as SheetPanel } from './sheet-panel.svelte';
export { default as SheetPopup, default as SheetContent } from './sheet-popup.svelte';
export { default as SheetTitle } from './sheet-title.svelte';
export { default as SheetTrigger } from './sheet-trigger.svelte';
export { default as SheetViewport } from './sheet-viewport.svelte';

export const SheetPortal = SheetPrimitive.Portal;

export { SheetPrimitive };
