import type { RegistryCategory } from './registry-categories.js';

export type Particle = {
	name: string;
	description?: string;
	categories?: RegistryCategory[];
	registryDependencies?: string[];
	meta?: {
		className?: string;
		colSpan?: number;
	};
};

// Populate with actual particle registry items as they are ported to Svelte
export const particles: Particle[] = [];
