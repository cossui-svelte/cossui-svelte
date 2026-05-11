type Callback = ((...args: unknown[]) => void) | undefined | null;

export function chain(...callbacks: Callback[]): (...args: unknown[]) => void {
	return (...args: unknown[]) => {
		for (const callback of callbacks) {
			if (typeof callback === "function") {
				callback(...args);
			}
		}
	};
}
