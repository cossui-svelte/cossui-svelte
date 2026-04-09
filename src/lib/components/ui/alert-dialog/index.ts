/* eslint-disable perfectionist/sort-named-exports */

import { AlertDialog as AlertDialogPrimitive } from 'bits-ui';
import AlertDialogBackdrop from './alert-dialog-backdrop.svelte';
import AlertDialogClose from './alert-dialog-close.svelte';
import AlertDialogDescription from './alert-dialog-description.svelte';
import AlertDialogFooter from './alert-dialog-footer.svelte';
import AlertDialogHeader from './alert-dialog-header.svelte';
import AlertDialogPopup from './alert-dialog-popup.svelte';
import AlertDialogTitle from './alert-dialog-title.svelte';
import AlertDialogTrigger from './alert-dialog-trigger.svelte';

const AlertDialog = AlertDialogPrimitive.Root;
const AlertDialogPortal = AlertDialogPrimitive.Portal;
const AlertDialogAction = AlertDialogPrimitive.Action;
const AlertDialogCancel = AlertDialogPrimitive.Cancel;

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogBackdrop,
  AlertDialogBackdrop as AlertDialogOverlay,
  AlertDialogCancel,
  AlertDialogClose,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogPopup,
  AlertDialogPopup as AlertDialogContent,
  AlertDialogPortal,
  AlertDialogPrimitive,
  AlertDialogTitle,
  AlertDialogTrigger
};
