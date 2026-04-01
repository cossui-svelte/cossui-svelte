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

// const Root = DialogPrimitive.Root;
// const Trigger = DialogPrimitive.Trigger;
// const Portal = DialogPrimitive.Portal;
// const Close = DialogPrimitive.Close;

// export {
//   Close,
//   Close as DialogClose,
//   Content,
//   Content as DialogContent,
//   Description,
//   Description as DialogDescription,
//   Footer,
//   Footer as DialogFooter,
//   Header,
//   Header as DialogHeader,
//   Overlay,
//   Overlay as DialogOverlay,
//   Portal,
//   Portal as DialogPortal,
//   Root,
//   Root as DialogRoot,
//   Title,
//   Title as DialogTitle,
//   Trigger,
//   Trigger as DialogTrigger
// };

const Dialog = DialogPrimitive.Root;
// const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
// const DialogClose = DialogPrimitive.Close;

export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogClose,
  DialogBackdrop,
  DialogBackdrop as DialogOverlay,
  DialogPopup,
  DialogPopup as DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogPanel,
  DialogViewport,
  DialogPrimitive
};
