import {
  CalendarDate,
  CalendarDateTime,
  type DateValue,
  getDayOfWeek,
  getLocalTimeZone,
  parseDate,
  parseDateTime,
  parseZonedDateTime,
  toCalendar,
  ZonedDateTime
} from '@internationalized/date';

export type DateValueType = 'date' | 'datetime' | 'zoneddatetime';
export type DateGranularity = 'day' | 'hour' | 'minute' | 'second';

/**
 * A helper function used to generate a default `DateValue` using the
 * `defaultValue`, `minValue`, `maxValue`, and `granularity` props.
 */
export function getDefaultDate(opts: {
  defaultValue?: DateValue | DateValue[];
  granularity?: DateGranularity;
  minValue?: DateValue;
  maxValue?: DateValue;
}): DateValue {
  const { defaultValue, granularity = 'day', minValue, maxValue } = opts;
  if (Array.isArray(defaultValue) && defaultValue.length) {
    return defaultValue[defaultValue.length - 1];
  }
  if (defaultValue && !Array.isArray(defaultValue)) {
    return defaultValue;
  }

  let date = new Date();
  if (minValue && date < minValue.toDate(getLocalTimeZone())) {
    date = minValue.toDate(getLocalTimeZone());
  } else if (maxValue && date > maxValue.toDate(getLocalTimeZone())) {
    date = maxValue.toDate(getLocalTimeZone());
  }
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const calendarDateTimeGranularities: DateGranularity[] = ['hour', 'minute', 'second'];
  if (calendarDateTimeGranularities.includes(granularity)) {
    return new CalendarDateTime(year, month, day, 0, 0, 0);
  }
  return new CalendarDate(year, month, day);
}

/**
 * Given a date string and a reference `DateValue` object, parse the
 * string to the same type as the reference object.
 */
export function parseStringToDateValue(dateStr: string, referenceVal: DateValue): DateValue {
  let dateValue: DateValue;
  if (referenceVal instanceof ZonedDateTime) {
    dateValue = parseZonedDateTime(dateStr);
  } else if (referenceVal instanceof CalendarDateTime) {
    dateValue = parseDateTime(dateStr);
  } else {
    dateValue = parseDate(dateStr);
  }
  return dateValue.calendar !== referenceVal.calendar
    ? (toCalendar(dateValue, referenceVal.calendar) as DateValue)
    : dateValue;
}

/**
 * Given a `DateValue` object, convert it to a native `Date` object.
 */
export function toDate(dateValue: DateValue, tz = getLocalTimeZone()): Date {
  if (dateValue instanceof ZonedDateTime) {
    return dateValue.toDate();
  }
  return dateValue.toDate(tz);
}

export function getDateValueType(date: DateValue): DateValueType {
  if (date instanceof CalendarDate) return 'date';
  if (date instanceof CalendarDateTime) return 'datetime';
  if (date instanceof ZonedDateTime) return 'zoneddatetime';
  throw new Error('Unknown date type');
}

export function parseAnyDateValue(value: string, type: DateValueType): DateValue {
  switch (type) {
    case 'date':
      return parseDate(value);
    case 'datetime':
      return parseDateTime(value);
    case 'zoneddatetime':
      return parseZonedDateTime(value);
    default:
      throw new Error(`Unknown date type: ${type}`);
  }
}

export function isZonedDateTime(dateValue: DateValue): dateValue is ZonedDateTime {
  return dateValue instanceof ZonedDateTime;
}

export function hasTime(dateValue: DateValue): dateValue is CalendarDateTime | ZonedDateTime {
  return dateValue instanceof CalendarDateTime || isZonedDateTime(dateValue);
}

/**
 * Given a date, return the number of days in the month.
 */
export function getDaysInMonth(date: DateValue): number {
  return date.set({ day: 100 }).day;
}

/**
 * Determine if a date is before the reference date.
 */
export function isBefore(dateToCompare: DateValue, referenceDate: DateValue): boolean {
  return dateToCompare.compare(referenceDate) < 0;
}

/**
 * Determine if a date is after the reference date.
 */
export function isAfter(dateToCompare: DateValue, referenceDate: DateValue): boolean {
  return dateToCompare.compare(referenceDate) > 0;
}

function isBeforeOrSame(dateToCompare: DateValue, referenceDate: DateValue): boolean {
  return dateToCompare.compare(referenceDate) <= 0;
}

function isAfterOrSame(dateToCompare: DateValue, referenceDate: DateValue): boolean {
  return dateToCompare.compare(referenceDate) >= 0;
}

/**
 * Determine if a date is inclusively between a start and end reference date.
 */
export function isBetweenInclusive(date: DateValue, start: DateValue, end: DateValue): boolean {
  return isAfterOrSame(date, start) && isBeforeOrSame(date, end);
}

export function getLastFirstDayOfWeek(
  date: DateValue,
  firstDayOfWeek: number,
  locale: string
): DateValue {
  const day = getDayOfWeek(date, locale);
  if (firstDayOfWeek > day) {
    return date.subtract({ days: day + 7 - firstDayOfWeek });
  }
  if (firstDayOfWeek === day) {
    return date;
  }
  return date.subtract({ days: day - firstDayOfWeek });
}

export function getNextLastDayOfWeek(
  date: DateValue,
  firstDayOfWeek: number,
  locale: string
): DateValue {
  const day = getDayOfWeek(date, locale);
  const lastDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
  if (day === lastDayOfWeek) {
    return date;
  }
  if (day > lastDayOfWeek) {
    return date.add({ days: 7 - day + lastDayOfWeek });
  }
  return date.add({ days: lastDayOfWeek - day });
}

export function areAllDaysBetweenValid(
  start: DateValue,
  end: DateValue,
  isUnavailable: ((date: DateValue) => boolean) | undefined,
  isDisabled: ((date: DateValue) => boolean) | undefined
): boolean {
  if (isUnavailable === undefined && isDisabled === undefined) {
    return true;
  }
  let dCurrent = start.add({ days: 1 });
  if (isDisabled?.(dCurrent) || isUnavailable?.(dCurrent)) {
    return false;
  }
  const dEnd = end;
  while (dCurrent.compare(dEnd) < 0) {
    dCurrent = dCurrent.add({ days: 1 });
    if (isDisabled?.(dCurrent) || isUnavailable?.(dCurrent)) {
      return false;
    }
  }
  return true;
}
