import type { ToastData, ToastSubscriber } from './types';

/**
 * Manages the global state of toast notifications.
 * Implements a singleton pattern with a subscription mechanism.
 */
class ToastState {
  private toasts: ToastData[] = [];
  private subscribers: Set<ToastSubscriber> = new Set();
  private idCounter = 0;

  /**
   * Subscribes to changes in the toast list.
   * @param callback - Function to be called when the toast list updates.
   * @returns A cleanup function to unsubscribe.
   */
  subscribe(callback: ToastSubscriber): () => void {
    this.subscribers.add(callback);
    return () => {
      this.subscribers.delete(callback);
    };
  }

  private notify(): void {
    this.subscribers.forEach((callback) => {
      callback([...this.toasts]);
    });
  }

  private generateId(): string {
    return `toast-${Date.now()}-${++this.idCounter}`;
  }

  /**
   * Adds a new toast to the state, or updates an existing one in place
   * when `data.id` matches a toast that is still active.
   * @param data - The toast configuration. If `id` is provided and refers
   *   to an active toast, the call performs an upsert and returns that id.
   * @returns The id of the created or updated toast.
   */
  add(data: Omit<ToastData, 'id'> & { id?: string }): string {
    const requestedId = data.id;
    let generation = 0;
    if (requestedId) {
      const existing = this.toasts.find((t) => t.id === requestedId);
      if (existing && !existing.shouldClose && !existing.isLeaving) {
        // Toast is already active — pulse it in place instead of replacing.
        this.update(requestedId, { bubbleKey: (existing.bubbleKey ?? 0) + 1 });
        return requestedId;
      }
      // Toast is leaving or gone — remove stale entry and recreate fresh.
      generation = (existing?.generation ?? 0) + 1;
      this.toasts = this.toasts.filter((t) => t.id !== requestedId);
    }

    const id = requestedId ?? this.generateId();
    const { id: _ignored, ...rest } = data;
    void _ignored;
    const newToast: ToastData = { ...rest, generation, id };
    this.toasts = [newToast, ...this.toasts];
    this.notify();
    return id;
  }

  /**
   * Removes a toast from the state by its ID.
   * @param id - The ID of the toast to remove.
   */
  remove(id: string): void {
    this.toasts = this.toasts.filter((toast) => toast.id !== id);
    this.notify();
  }

  /**
   * Updates an existing toast's data.
   * @param id - The ID of the toast to update.
   * @param data - Partial data to merge into the existing toast.
   */
  update(id: string, data: Partial<ToastData>): void {
    this.toasts = this.toasts.map((toast) => (toast.id === id ? { ...toast, ...data } : toast));
    this.notify();
  }

  /**
   * Marks all active toasts for dismissal.
   * Triggers the closing animation by setting `shouldClose` to true.
   */
  dismissAll(): void {
    this.toasts = this.toasts.map((toast) => ({
      ...toast,
      duration: 0,
      shouldClose: true
    }));
    this.notify();
  }

  /**
   * Returns the current list of active toasts.
   * @returns A copy of the toast array.
   */
  getToasts(): ToastData[] {
    return [...this.toasts];
  }
}

/** Global singleton instance of the toast state. */
export const toastState = new ToastState();
export { ToastState };
