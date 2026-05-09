/* eslint-disable perfectionist/sort-named-exports */

import { Dialog as DialogPrimitive } from 'bits-ui';
import DialogBackdrop from './dialog-backdrop.svelte';
import DialogClose from './dialog-close.svelte';
import DialogDescription from './dialog-description.svelte';
import DialogFooter from './dialog-footer.svelte';
import DialogHeader from './dialog-header.svelte';
import DialogPanel from './dialog-panel.svelte';
import DialogPopup from './dialog-popup.svelte';
import DialogTitle from './dialog-title.svelte';
import DialogTrigger from './dialog-trigger.svelte';
import DialogViewport from './dialog-viewport.svelte';

const Dialog = DialogPrimitive.Root;
// const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;

// const DialogClose = DialogPrimitive.Close;

export {
  Dialog,
  DialogBackdrop,
  DialogBackdrop as DialogOverlay,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPanel,
  DialogPopup,
  DialogPopup as DialogContent,
  DialogPortal,
  DialogPrimitive,
  DialogTitle,
  DialogTrigger,
  DialogViewport
};
