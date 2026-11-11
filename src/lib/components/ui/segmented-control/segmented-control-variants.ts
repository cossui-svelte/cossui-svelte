import { getContext, setContext } from 'svelte';

export type SegmentedControlSize = 'default' | 'lg' | 'sm';

export const segmentedControlItemSizeClassNames: Record<SegmentedControlSize, string> = {
  default: 'h-8.5 px-[calc(--spacing(2.5)-1px)] sm:h-7.5',
  lg: 'h-9.5 px-[calc(--spacing(3)-1px)] sm:h-8.5',
  sm: 'h-7.5 px-[calc(--spacing(2)-1px)] sm:h-6.5'
};

export const segmentedControlItemLayoutClassName =
  "gap-1.5 [&_svg:not([class*='opacity-'])]:opacity-80 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:-mx-0.5 [&_svg]:shrink-0";

export const segmentedControlIndicatorSurfaceClassName =
  'rounded-md bg-background shadow-sm/5 dark:bg-input';

const SEGMENTED_CONTROL_SIZE = Symbol('segmented-control-size');

export function setSegmentedControlSize(getSize: () => SegmentedControlSize): void {
  setContext(SEGMENTED_CONTROL_SIZE, getSize);
}

export function getSegmentedControlSize(): () => SegmentedControlSize {
  const getSize = getContext<(() => SegmentedControlSize) | undefined>(SEGMENTED_CONTROL_SIZE);
  return () => getSize?.() ?? 'default';
}
