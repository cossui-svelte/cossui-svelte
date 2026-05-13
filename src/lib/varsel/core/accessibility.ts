/**
 * CSS selectors used to identify focusable elements within a toast.
 * Used for managing keyboard focus when interacting with toasts containing actions.
 */
export const FOCUSABLE_SELECTORS = [
  'button:not([disabled])',
  'input:not([disabled])',
  'textarea:not([disabled])',
  'select:not([disabled])',
  'a[href]',
  '[tabindex]:not([tabindex="-1"])'
].join(', ');

/**
 * Returns true when the element currently matches `:focus-visible`, i.e. focus
 * was acquired via keyboard or another mechanism the user agent considers
 * keyboard-equivalent. Used to gate behaviors (such as pausing toast timers)
 * that should only respond to keyboard focus, not mouse-induced focus.
 */
export const isFocusVisible = (el: Element | null | undefined): boolean => {
  if (!el || typeof (el as HTMLElement).matches !== 'function') return false;
  try {
    return (el as HTMLElement).matches(':focus-visible');
  } catch {
    return false;
  }
};

/**
 * Module-level focus bookkeeping shared by the toaster. Tracks the element
 * that held focus before the user jumped into the toast region (via `F6`),
 * so that leaving the region (via `Tab` past a focus guard or by dismissing
 * the focused toast) can restore focus to where the user was before.
 *
 * Only one toaster instance is active at a time (see `toasterInstanceManager`),
 * which is why a module-level singleton is acceptable here.
 */
let prevFocusElement: HTMLElement | null = null;
let toastRegionClaimed = false;

export const focusManager = {
  getPrevFocus(): HTMLElement | null {
    return prevFocusElement;
  },
  isClaimed(): boolean {
    return toastRegionClaimed;
  },
  releaseClaim(): void {
    toastRegionClaimed = false;
    prevFocusElement = null;
  },
  restoreFocusToPrevElement(): void {
    toastRegionClaimed = false;
    const target = prevFocusElement;
    prevFocusElement = null;
    if (target && typeof document !== 'undefined' && document.contains(target)) {
      try {
        target.focus({ preventScroll: true });
      } catch {
        target.focus();
      }
    }
  },
  savePrevFocus(): void {
    if (typeof document === 'undefined') return;
    const active = document.activeElement;
    if (active instanceof HTMLElement && active !== document.body) {
      prevFocusElement = active;
    } else {
      prevFocusElement = null;
    }
    toastRegionClaimed = true;
  }
};
