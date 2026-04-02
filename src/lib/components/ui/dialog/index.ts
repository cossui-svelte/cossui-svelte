/* eslint-disable perfectionist/sort-named-exports */

import { Dialog as DialogPrimitive } from 'bits-ui';
import DialogPopup from './dialog-content.svelte';
import DialogDescription from './dialog-description.svelte';
import DialogFooter from './dialog-footer.svelte';
import DialogHeader from './dialog-header.svelte';
import DialogBackdrop from './dialog-overlay.svelte';
import DialogPanel from './dialog-panel.svelte';
import DialogTitle from './dialog-title.svelte';

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogClose,
  DialogBackdrop,
  DialogBackdrop as DialogOverlay,
  DialogHeader,
  DialogPopup,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogPanel,
  DialogPrimitive
};
