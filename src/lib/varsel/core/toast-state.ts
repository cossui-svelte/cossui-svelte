import type { ToastData, ToastSubscriber } from "./types";

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
	 * Adds a new toast to the state.
	 * @param data - The toast configuration (without ID).
	 * @returns The generated ID of the new toast.
	 */
	add(data: Omit<ToastData, "id">): string {
		const id = this.generateId();
		const newToast: ToastData = { ...data, id };
		// Add new toasts to the beginning of the array (stack LIFO visually for some positions, logic handled in manager)
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
		this.toasts = this.toasts.map((toast) =>
			toast.id === id ? { ...toast, ...data } : toast,
		);
		this.notify();
	}

	/**
	 * Marks all active toasts for dismissal.
	 * Triggers the closing animation by setting `shouldClose` to true.
	 */
	dismissAll(): void {
		this.toasts = this.toasts.map((toast) => ({
			...toast,
			shouldClose: true,
			duration: 0,
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