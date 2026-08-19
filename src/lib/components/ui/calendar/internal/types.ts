import type { DateValue } from '@internationalized/date';
import type { Snippet } from 'svelte';
import type {
  HTMLAttributes,
  HTMLButtonAttributes,
  HTMLSelectAttributes,
  HTMLTdAttributes,
  HTMLThAttributes
} from 'svelte/elements';

export type OnChangeFn<T> = (value: T) => void;
export type DateMatcher = (date: DateValue) => boolean;
export type WeekStartsOn = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type Month<T> = {
  value: DateValue;
  weeks: T[][];
  dates: T[];
};

/**
 * Local, trimmed equivalent of bits-ui's `WithChild` helper: allows any
 * primitive to be rendered as its default element, or forwarded to a
 * `child` snippet for full control over the rendered element.
 */
export type WithChild<
  Props extends Record<PropertyKey, unknown> = Record<never, never>,
  SnippetProps = never
> = Omit<Props, 'child' | 'children'> & {
  child?: [SnippetProps] extends [never]
    ? Snippet<[{ props: Record<string, unknown> }]>
    : Snippet<[SnippetProps & { props: Record<string, unknown> }]>;
  children?: [SnippetProps] extends [never] ? Snippet : Snippet<[SnippetProps]>;
  ref?: HTMLElement | null;
};

export type CalendarRootSnippetProps = {
  months: Month<DateValue>[];
  weekdays: string[];
};

type CalendarBaseRootProps = {
  placeholder?: DateValue;
  onPlaceholderChange?: OnChangeFn<DateValue>;
  preventDeselect?: boolean;
  minValue?: DateValue;
  maxValue?: DateValue;
  disabled?: boolean;
  pagedNavigation?: boolean;
  weekStartsOn?: WeekStartsOn;
  weekdayFormat?: Intl.DateTimeFormatOptions['weekday'];
  isDateDisabled?: DateMatcher;
  isDateUnavailable?: DateMatcher;
  fixedWeeks?: boolean;
  numberOfMonths?: number;
  calendarLabel?: string;
  locale?: string;
  readonly?: boolean;
  initialFocus?: boolean;
  disableDaysOutsideMonth?: boolean;
  maxDays?: number;
  monthFormat?: Intl.DateTimeFormatOptions['month'] | ((month: number) => string);
  yearFormat?: Intl.DateTimeFormatOptions['year'] | ((year: number) => string);
};

type CalendarSingleRootProps = {
  type: 'single';
  value?: DateValue;
  onValueChange?: OnChangeFn<DateValue | undefined>;
};

type CalendarMultipleRootProps = {
  type: 'multiple';
  value?: DateValue[];
  onValueChange?: OnChangeFn<DateValue[]>;
};

export type CalendarRootPropsWithoutHTML = CalendarBaseRootProps &
  (
    | WithChild<CalendarSingleRootProps, CalendarRootSnippetProps>
    | WithChild<CalendarMultipleRootProps, CalendarRootSnippetProps>
  );
export type CalendarRootProps = CalendarRootPropsWithoutHTML &
  Omit<HTMLAttributes<HTMLDivElement>, keyof CalendarRootPropsWithoutHTML>;

export type CalendarCellSnippetProps = {
  disabled: boolean;
  unavailable: boolean;
  selected: boolean;
};
export type CalendarCellPropsWithoutHTML = WithChild<
  { date: DateValue; month: DateValue },
  CalendarCellSnippetProps
>;
export type CalendarCellProps = CalendarCellPropsWithoutHTML &
  Omit<HTMLTdAttributes, keyof CalendarCellPropsWithoutHTML>;

export type CalendarDaySnippetProps = {
  disabled: boolean;
  unavailable: boolean;
  selected: boolean;
  day: string;
};
export type CalendarDayPropsWithoutHTML = WithChild<Record<never, never>, CalendarDaySnippetProps>;
export type CalendarDayProps = CalendarDayPropsWithoutHTML &
  Omit<HTMLAttributes<HTMLDivElement>, keyof CalendarDayPropsWithoutHTML>;

export type CalendarGridPropsWithoutHTML = WithChild;
export type CalendarGridProps = CalendarGridPropsWithoutHTML &
  Omit<HTMLAttributes<HTMLTableElement>, keyof CalendarGridPropsWithoutHTML>;

export type CalendarGridBodyPropsWithoutHTML = WithChild;
export type CalendarGridBodyProps = CalendarGridBodyPropsWithoutHTML &
  Omit<HTMLAttributes<HTMLTableSectionElement>, keyof CalendarGridBodyPropsWithoutHTML>;

export type CalendarGridHeadPropsWithoutHTML = WithChild;
export type CalendarGridHeadProps = CalendarGridHeadPropsWithoutHTML &
  Omit<HTMLAttributes<HTMLTableSectionElement>, keyof CalendarGridHeadPropsWithoutHTML>;

export type CalendarGridRowPropsWithoutHTML = WithChild;
export type CalendarGridRowProps = CalendarGridRowPropsWithoutHTML &
  Omit<HTMLAttributes<HTMLTableRowElement>, keyof CalendarGridRowPropsWithoutHTML>;

export type CalendarHeadCellPropsWithoutHTML = WithChild;
export type CalendarHeadCellProps = CalendarHeadCellPropsWithoutHTML &
  Omit<HTMLThAttributes, keyof CalendarHeadCellPropsWithoutHTML>;

export type CalendarHeaderPropsWithoutHTML = WithChild;
export type CalendarHeaderProps = CalendarHeaderPropsWithoutHTML &
  Omit<HTMLAttributes<HTMLElement>, keyof CalendarHeaderPropsWithoutHTML>;

export type CalendarHeadingSnippetProps = { headingValue: string };
export type CalendarHeadingPropsWithoutHTML = WithChild<
  Record<never, never>,
  CalendarHeadingSnippetProps
>;
export type CalendarHeadingProps = CalendarHeadingPropsWithoutHTML &
  Omit<HTMLAttributes<HTMLDivElement>, keyof CalendarHeadingPropsWithoutHTML>;

export type CalendarNextButtonPropsWithoutHTML = WithChild;
export type CalendarNextButtonProps = CalendarNextButtonPropsWithoutHTML &
  Omit<HTMLButtonAttributes, keyof CalendarNextButtonPropsWithoutHTML>;

export type CalendarPrevButtonPropsWithoutHTML = WithChild;
export type CalendarPrevButtonProps = CalendarPrevButtonPropsWithoutHTML &
  Omit<HTMLButtonAttributes, keyof CalendarPrevButtonPropsWithoutHTML>;

export type CalendarMonthSelectSnippetProps = {
  monthItems: Array<{ value: number; label: string }>;
  selectedMonthItem: { value: number; label: string };
};
export type CalendarMonthSelectPropsWithoutHTML = WithChild<
  {
    months?: number[];
    monthFormat?: Intl.DateTimeFormatOptions['month'] | ((month: number) => string);
  },
  CalendarMonthSelectSnippetProps
>;
export type CalendarMonthSelectProps = CalendarMonthSelectPropsWithoutHTML &
  Omit<HTMLSelectAttributes, keyof CalendarMonthSelectPropsWithoutHTML>;

export type CalendarYearSelectSnippetProps = {
  yearItems: Array<{ value: number; label: string }>;
  selectedYearItem: { value: number; label: string };
};
export type CalendarYearSelectPropsWithoutHTML = WithChild<
  {
    years?: number[];
    yearFormat?: Intl.DateTimeFormatOptions['year'] | ((year: number) => string);
  },
  CalendarYearSelectSnippetProps
>;
export type CalendarYearSelectProps = CalendarYearSelectPropsWithoutHTML &
  Omit<HTMLSelectAttributes, keyof CalendarYearSelectPropsWithoutHTML>;
