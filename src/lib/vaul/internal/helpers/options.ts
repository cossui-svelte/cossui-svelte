import type { Writable } from "svelte/store";

type Options = Record<string, Writable<unknown>>;

export function getOptionUpdater(options: Options) {
	return function <K extends keyof typeof options>(key: K, value: unknown | undefined) {
		if (value === undefined) return;
		const store = options[key];
		if (store) {
			store.set(value as never);
		}
	};
}
