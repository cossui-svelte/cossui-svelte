/**
 * SVG definitions for status icons (success, warning, error).
 * These are lightweight SVG path data objects rendered by the toast component.
 */
import type { ToastData } from "./internals";

const ICON_VARIANTS = ["success", "warning", "destructive", "info"] as const;

export type IconVariant = (typeof ICON_VARIANTS)[number];

type IconElement =
	| { tag: "path"; d: string }
	| { tag: "line"; x1: number; y1: number; x2: number; y2: number }
	| { tag: "circle"; cx: number; cy: number; r: number };

export interface VariantIconDefinition {
	viewBox: string;
	elements: IconElement[];
}

export const variantIconMap = {
	success: {
		viewBox: "0 0 24 24",
		elements: [
			{ tag: "circle", cx: 12, cy: 12, r: 10 },
			{ tag: "path", d: "m9 12 2 2 4-4" },
		],
	},
	warning: {
		viewBox: "0 0 24 24",
		elements: [
			{
				tag: "path",
				d: "M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z",
			},
			{ tag: "line", x1: 12, y1: 9, x2: 12, y2: 13 },
			{ tag: "line", x1: 12, y1: 17, x2: 12.01, y2: 17 },
		],
	},
	destructive: {
		viewBox: "0 0 24 24",
		elements: [
			{ tag: "circle", cx: 12, cy: 12, r: 10 },
			{ tag: "path", d: "m15 9-6 6" },
			{ tag: "path", d: "m9 9 6 6" },
		],
	},
	info: {
		viewBox: "0 0 24 24",
		elements: [
			{ tag: "circle", cx: 12, cy: 12, r: 10 },
			{ tag: "line", x1: 12, y1: 16, x2: 12, y2: 12 },
			{ tag: "line", x1: 12, y1: 8, x2: 12.01, y2: 8 },
		],
	},
} satisfies Record<IconVariant, VariantIconDefinition>;

/**
 * Checks if a given toast variant has an associated icon.
 * @param variant - The variant string to check.
 * @returns True if the variant is one of 'success', 'warning', or 'destructive'.
 */
export const hasVariantIcon = (
	variant?: ToastData["variant"],
): variant is IconVariant => {
	return Boolean(variant && ICON_VARIANTS.includes(variant as IconVariant));
};