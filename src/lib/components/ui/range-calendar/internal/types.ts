import type { DateValue } from '@internationalized/date';
import type { HTMLAttributes } from 'svelte/elements';
import type {
  DateMatcher,
  OnChangeFn,
  WeekStartsOn,
  WithChild
} from '$lib/components/ui/calendar/internal/types';

export type {
  CalendarCellProps as RangeCalendarCellProps,
  CalendarDayProps as RangeCalendarDayProps,
  CalendarGridBodyProps as RangeCalendarGridBodyProps,
  CalendarGridHeadProps as RangeCalendarGridHeadProps,
  CalendarGridProps as RangeCalendarGridProps,
  CalendarGridRowProps as RangeCalendarGridRowProps,
  CalendarHeadCellProps as RangeCalendarHeadCellProps,
  CalendarHeaderProps as RangeCalendarHeaderProps,
  CalendarHeadingProps as RangeCalendarHeadingProps,
  CalendarMonthSelectProps as RangeCalendarMonthSelectProps,
  CalendarNextButtonProps as RangeCalendarNextButtonProps,
  CalendarPrevButtonProps as RangeCalendarPrevButtonProps,
  CalendarYearSelectProps as RangeCalendarYearSelectProps
} from '$lib/components/ui/calendar/internal/types';

export type DateRange = {
  start: DateValue | undefined;
  end: DateValue | undefined;
};

export type RangeCalendarRootSnippetProps = {
  months: { value: DateValue; weeks: DateValue[][]; dates: DateValue[] }[];
  weekdays: string[];
};

type RangeCalendarBaseRootProps = {
  value?: DateRange;
  onValueChange?: OnChangeFn<DateRange>;
  placeholder?: DateValue;
  onPlaceholderChange?: OnChangeFn<DateValue>;
  minDays?: number;
  maxDays?: number;
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
  disableDaysOutsideMonth?: boolean;
  excludeDisabled?: boolean;
  onStartValueChange?: OnChangeFn<DateValue | undefined>;
  onEndValueChange?: OnChangeFn<DateValue | undefined>;
  monthFormat?: Intl.DateTimeFormatOptions['month'] | ((month: number) => string);
  yearFormat?: Intl.DateTimeFormatOptions['year'] | ((year: number) => string);
};

export type RangeCalendarRootPropsWithoutHTML = WithChild<
  RangeCalendarBaseRootProps,
  RangeCalendarRootSnippetProps
>;
export type RangeCalendarRootProps = RangeCalendarRootPropsWithoutHTML &
  Omit<HTMLAttributes<HTMLDivElement>, keyof RangeCalendarRootPropsWithoutHTML>;
