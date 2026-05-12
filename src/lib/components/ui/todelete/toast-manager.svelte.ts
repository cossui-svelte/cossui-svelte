import { toast as sonner } from 'svelte-sonner';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export type ToastType = 'error' | 'info' | 'loading' | 'success' | 'warning';

export type ToastSide = 'top' | 'right' | 'bottom' | 'left';

export type ToastAlign = 'start' | 'center' | 'end';

export interface ToastActionProps {
  label: string;
  onclick: () => void;
}

export interface AnchorPositionerProps {
  /** CSS selector string or element reference */
  anchor: string | HTMLElement | null;
  sideOffset?: number;
  side?: ToastSide;
  align?: ToastAlign;
}

export interface AnchoredToastData {
  id: string;
  title?: string;
  description?: string;
  type?: ToastType;
  duration?: number;
  action?: ToastActionProps;
  positionerProps?: AnchorPositionerProps;
  /** When true renders as a compact tooltip-style popup */
  tooltipStyle?: boolean;
  data?: Record<string, unknown>;
}

export type AddAnchoredToastOptions = Omit<AnchoredToastData, 'id'> & { id?: string };

// ─── Standard toast manager (wraps svelte-sonner) ────────────────────────────

type SonnerOptions = {
  id?: string | number;
  description?: string;
  duration?: number;
  action?: { label: string; onClick: () => void };
};

export type AddStandardToastOptions = {
  title?: string;
  type?: ToastType;
  description?: string;
  duration?: number;
  action?: ToastActionProps;
  id?: string | number;
};

function adaptAction(
  action?: ToastActionProps
): { label: string; onClick: () => void } | undefined {
  if (!action) return undefined;
  return { label: action.label, onClick: action.onclick };
}

function buildSonnerOptions(options: AddStandardToastOptions): SonnerOptions {
  return {
    action: adaptAction(options.action),
    description: options.description,
    duration: options.duration,
    id: options.id
  };
}

export const toastManager = {
  add(options: AddStandardToastOptions): string | number {
    const opts = buildSonnerOptions(options);
    const title = options.title ?? '';
    switch (options.type) {
      case 'success':
        return sonner.success(title, opts);
      case 'error':
        return sonner.error(title, opts);
      case 'info':
        return sonner.info(title, opts);
      case 'warning':
        return sonner.warning(title, opts);
      case 'loading':
        return sonner.loading(title, opts);
      default:
        return sonner(title, opts);
    }
  },

  dismiss: (id?: string | number) => sonner.dismiss(id),
  error: (title: string, options?: Omit<SonnerOptions, 'id'>) => sonner.error(title, options),
  info: (title: string, options?: Omit<SonnerOptions, 'id'>) => sonner.info(title, options),
  loading: (title: string, options?: Omit<SonnerOptions, 'id'>) => sonner.loading(title, options),

  success: (title: string, options?: Omit<SonnerOptions, 'id'>) => sonner.success(title, options),
  warning: (title: string, options?: Omit<SonnerOptions, 'id'>) => sonner.warning(title, options)
};

// ─── Anchored toast manager (reactive $state) ────────────────────────────────

function createAnchoredToastManager() {
  const toasts = $state<AnchoredToastData[]>([]);
  const timers = new Map<string, ReturnType<typeof setTimeout>>();

  function add(options: AddAnchoredToastOptions): string {
    const id = options.id ?? crypto.randomUUID();
    const toast: AnchoredToastData = { ...options, id };
    toasts.push(toast);

    const duration = options.duration ?? 4000;
    if (duration > 0) {
      const timer = setTimeout(() => dismiss(id), duration);
      timers.set(id, timer);
    }
    return id;
  }

  function dismiss(id: string) {
    const index = toasts.findIndex((t) => t.id === id);
    if (index !== -1) toasts.splice(index, 1);
    const timer = timers.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.delete(id);
    }
  }

  function update(id: string, updates: Partial<AddAnchoredToastOptions>) {
    const index = toasts.findIndex((t) => t.id === id);
    if (index !== -1) Object.assign(toasts[index], updates);
  }

  return {
    add,
    dismiss,
    get toasts() {
      return toasts;
    },
    update
  };
}

export const anchoredToastManager = createAnchoredToastManager();
