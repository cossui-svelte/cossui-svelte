export type RegistryCategory = string;

// Ordered list of categories for display sorting — add new categories here in preferred order
const CATEGORY_ORDER: string[] = [];

export function getCategorySortOrder(category: string): number {
	const idx = CATEGORY_ORDER.indexOf(category);
	return idx === -1 ? 999 : idx;
}

export function isValidRegistryCategory(category: string): boolean {
	return typeof category === 'string' && category.trim().length > 0;
}
