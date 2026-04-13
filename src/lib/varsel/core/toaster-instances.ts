/**
 * Manages unique instances of the Toaster component to prevent conflicts.
 * Ensures that if multiple Toasters are rendered, only one (the first or primary) is active.
 */
class ToasterInstanceManager {
	private activeInstanceId: string | null = null;
	private instanceCounter = 0;
	private instanceIds: string[] = [];

	/**
	 * Registers a new toaster instance.
	 * @returns A unique instance ID.
	 */
	registerInstance(): string {
		const instanceId = `toaster-${++this.instanceCounter}`;
		this.instanceIds.push(instanceId);
		if (
			!this.activeInstanceId ||
			!this.instanceIds.includes(this.activeInstanceId)
		) {
			this.activeInstanceId = instanceId;
		}
		return instanceId;
	}

	/**
	 * Unregisters an instance, potentially freeing up the active slot.
	 * @param instanceId - The ID of the instance to unregister.
	 */
	unregisterInstance(instanceId: string): void {
		this.instanceIds = this.instanceIds.filter((id) => id !== instanceId);
		if (this.activeInstanceId === instanceId) {
			this.activeInstanceId = this.instanceIds[0] ?? null;
		} else if (
			this.activeInstanceId &&
			!this.instanceIds.includes(this.activeInstanceId)
		) {
			this.activeInstanceId = this.instanceIds[0] ?? null;
		}
	}

	/**
	 * Checks if the given instance is the currently active one.
	 * @param instanceId - The ID to check.
	 * @returns True if active, false otherwise.
	 */
	isActiveInstance(instanceId: string): boolean {
		return this.activeInstanceId === instanceId;
	}
}

export const toasterInstanceManager = new ToasterInstanceManager();
export { ToasterInstanceManager };
