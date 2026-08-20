import { DateFormatter, type DateValue } from '@internationalized/date';
import type { ReadableBox } from 'svelte-toolbelt';
import { hasTime, isZonedDateTime, toDate } from './date-utils';

type MonthFormatOpt = Intl.DateTimeFormatOptions['month'] | ((month: number) => string);
type YearFormatOpt = Intl.DateTimeFormatOptions['year'] | ((year: number) => string);

/**
 * Creates a wrapper around the `DateFormatter`, an improved version of the
 * {@link Intl.DateTimeFormat} API, used to format dates in a consistent way.
 */
export function createFormatter(opts: {
  initialLocale: string;
  monthFormat: ReadableBox<MonthFormatOpt | undefined>;
  yearFormat: ReadableBox<YearFormatOpt | undefined>;
}) {
  let locale = opts.initialLocale;

  function setLocale(newLocale: string) {
    locale = newLocale;
  }
  function getLocale() {
    return locale;
  }
  function custom(date: Date, options: Intl.DateTimeFormatOptions) {
    return new DateFormatter(locale, options).format(date);
  }
  function selectedDate(date: DateValue, includeTime = true) {
    if (hasTime(date) && includeTime) {
      return custom(toDate(date), { dateStyle: 'long', timeStyle: 'long' });
    }
    return custom(toDate(date), { dateStyle: 'long' });
  }
  function fullMonthAndYear(date: Date) {
    const monthFormat = opts.monthFormat.current;
    const yearFormat = opts.yearFormat.current;
    if (typeof monthFormat !== 'function' && typeof yearFormat !== 'function') {
      return new DateFormatter(locale, { month: monthFormat, year: yearFormat }).format(date);
    }
    const formattedMonth =
      typeof monthFormat === 'function'
        ? monthFormat(date.getMonth() + 1)
        : new DateFormatter(locale, { month: monthFormat }).format(date);
    const formattedYear =
      typeof yearFormat === 'function'
        ? yearFormat(date.getFullYear())
        : new DateFormatter(locale, { year: yearFormat }).format(date);
    return `${formattedMonth} ${formattedYear}`;
  }
  function fullMonth(date: Date) {
    return new DateFormatter(locale, { month: 'long' }).format(date);
  }
  function fullYear(date: Date) {
    return new DateFormatter(locale, { year: 'numeric' }).format(date);
  }
  function dayOfWeek(date: Date, length: Intl.DateTimeFormatOptions['weekday'] = 'narrow') {
    return new DateFormatter(locale, { weekday: length }).format(date);
  }

  return {
    setLocale,
    getLocale,
    fullMonth,
    fullYear,
    fullMonthAndYear,
    custom,
    selectedDate,
    dayOfWeek
  };
}

export type Formatter = ReturnType<typeof createFormatter>;
