import { toast as vToast } from '$lib/varsel';

export type { ToastPosition } from '$lib/varsel';

export type ToastType = 'error' | 'info' | 'loading' | 'success' | 'warning';
export type ToastSide = 'top' | 'right' | 'bottom' | 'left';
export type ToastAlign = 'start' | 'center' | 'end';

export interface ToastActionProps {
  label: string;
  onclick: () => void;
}

export interface AnchorPositionerProps {
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
  tooltipStyle?: boolean;
}

export type AddAnchoredToastOptions = Omit<AnchoredToastData, 'id'> & { id?: string };

export interface AddToastOptions {
  title?: string;
  description?: string;
  type?: ToastType;
  action?: ToastActionProps;
  duration?: number;
}

export type AddToastVariantOptions = Omit<AddToastOptions, 'type'>;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function adaptAction(action?: ToastActionProps) {
  if (!action) return undefined;
  return { label: action.label, onClick: action.onclick };
}

function typeToVariant(type?: ToastType) {
  switch (type) {
    case 'error':
      return 'destructive' as const;
    case 'success':
      return 'success' as const;
    case 'warning':
      return 'warning' as const;
    case 'info':
      return 'info' as const;
    default:
      return undefined;
  }
}

// ─── Standard toast manager ───────────────────────────────────────────────────

export const toastManager = {
  add(opts: AddToastOptions): string {
    return vToast({
      action: adaptAction(opts.action),
      description: opts.description,
      duration: opts.duration,
      title: opts.title,
      variant: typeToVariant(opts.type)
    });
  },

  dismiss: vToast.dismiss,
  dismissAll: vToast.dismissAll,

  error(title: string, opts?: AddToastVariantOptions): string {
    return vToast.error({
      action: adaptAction(opts?.action),
      description: opts?.description,
      duration: opts?.duration,
      title
    });
  },

  info(title: string, opts?: AddToastVariantOptions): string {
    return vToast.info({
      action: adaptAction(opts?.action),
      description: opts?.description,
      duration: opts?.duration,
      title
    });
  },

  loading(title: string, opts?: AddToastVariantOptions): string {
    return vToast({
      description: opts?.description,
      duration: opts?.duration ?? 0,
      isLoading: true,
      title
    });
  },

  success(title: string, opts?: AddToastVariantOptions): string {
    return vToast.success({
      action: adaptAction(opts?.action),
      description: opts?.description,
      duration: opts?.duration,
      title
    });
  },

  warning(title: string, opts?: AddToastVariantOptions): string {
    return vToast.warning({
      action: adaptAction(opts?.action),
      description: opts?.description,
      duration: opts?.duration,
      title
    });
  }
};

// ─── Anchored toast manager ───────────────────────────────────────────────────

class AnchoredToastManager {
  toasts = $state<AnchoredToastData[]>([]);
  private idCounter = 0;
  private timers = new Map<string, ReturnType<typeof setTimeout>>();

  add(data: AddAnchoredToastOptions): string {
    const id = data.id ?? `anchored-toast-${Date.now()}-${++this.idCounter}`;
    const idx = this.toasts.findIndex((t) => t.id === id);
    if (idx >= 0) {
      this.toasts[idx] = { ...this.toasts[idx], ...data, id };
    } else {
      this.toasts = [{ ...data, id }, ...this.toasts];
    }

    const duration = data.duration ?? 5000;
    if (duration > 0 && duration !== Infinity) {
      const existing = this.timers.get(id);
      if (existing) clearTimeout(existing);
      this.timers.set(
        id,
        setTimeout(() => this.dismiss(id), duration)
      );
    }
    return id;
  }

  dismiss(id: string): void {
    clearTimeout(this.timers.get(id));
    this.timers.delete(id);
    this.toasts = this.toasts.filter((t) => t.id !== id);
  }

  dismissAll(): void {
    for (const timer of this.timers.values()) clearTimeout(timer);
    this.timers.clear();
    this.toasts = [];
  }
}

export const anchoredToastManager = new AnchoredToastManager();
