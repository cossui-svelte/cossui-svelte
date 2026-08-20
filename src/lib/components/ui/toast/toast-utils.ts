import CircleAlertIcon from '@lucide/svelte/icons/circle-alert';
import CircleCheckIcon from '@lucide/svelte/icons/circle-check';
import InfoIcon from '@lucide/svelte/icons/info';
import LoaderCircleIcon from '@lucide/svelte/icons/loader-circle';
import TriangleAlertIcon from '@lucide/svelte/icons/triangle-alert';

export const TOAST_ICONS = {
  error: CircleAlertIcon,
  info: InfoIcon,
  loading: LoaderCircleIcon,
  success: CircleCheckIcon,
  warning: TriangleAlertIcon
} as const;

export function upsertReplayClassName(toast: {
  type?: string;
  updateKey?: number;
}): string | undefined {
  const k = toast.updateKey ?? 0;
  if (k <= 0) return undefined;
  const isEven = k % 2 === 0;
  if (toast.type === 'error') {
    return isEven ? 'animate-toast-error-even' : 'animate-toast-error-odd';
  }
  return isEven ? 'animate-toast-success-even' : 'animate-toast-success-odd';
}
