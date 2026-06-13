export type PackageManager = 'pnpm' | 'npm' | 'yarn' | 'bun';

let packageManager = $state<PackageManager>('pnpm');

export const config = {
	get packageManager(): PackageManager {
		return packageManager;
	},
	set packageManager(value: PackageManager) {
		packageManager = value;
	}
};
