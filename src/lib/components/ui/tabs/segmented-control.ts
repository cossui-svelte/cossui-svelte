export type SegmentedControlSize = 'default' | 'lg' | 'sm';

export const segmentedControlItemSizeClassNames: Record<SegmentedControlSize, string> = {
  default: 'h-8.5 px-[calc(--spacing(2.5)-1px)] sm:h-7.5',
  lg: 'h-9.5 px-[calc(--spacing(3)-1px)] sm:h-8.5',
  sm: 'h-7.5 px-[calc(--spacing(2)-1px)] sm:h-6.5'
};
