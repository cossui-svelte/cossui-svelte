import { type DateValue, endOfMonth, isSameDay, isSameMonth, startOfMonth } from '@internationalized/date';
import { watch } from 'runed';
import { afterTick, getDocument, isHTMLElement, styleToString } from 'svelte-toolbelt';
import type { ReadableBox, WritableBox } from 'svelte-toolbelt';
import type { Month } from './types';
import { boolToEmptyStrOrUndef, createBitsAttrs } from './attrs';
import { chunk, isValidIndex } from './arrays';
import { isBrowser } from './is';
import { kbd } from './kbd';
import type { Formatter } from './formatter';
import {
  type DateValueType,
  getDaysInMonth,
  getLastFirstDayOfWeek,
  getNextLastDayOfWeek,
  hasTime,
  isAfter,
  isBefore,
  parseAnyDateValue,
  parseStringToDateValue,
  toDate
} from './date-utils';

/**
 * Checks if a given node is a calendar cell element.
 */
export function isCalendarDayNode(node: unknown): node is HTMLElement {
  if (!isHTMLElement(node)) return false;
  if (!node.hasAttribute('data-bits-day')) return false;
  return true;
}

/**
 * Retrieves an array of date values representing the days between
 * the provided start and end dates.
 */
export function getDaysBetween(start: DateValue, end: DateValue): DateValue[] {
  const days: DateValue[] = [];
  let dCurrent = start.add({ days: 1 });
  const dEnd = end;
  while (dCurrent.compare(dEnd) < 0) {
    days.push(dCurrent);
    dCurrent = dCurrent.add({ days: 1 });
  }
  return days;
}

type CreateMonthProps = {
  dateObj: DateValue;
  weekStartsOn: number | undefined;
  fixedWeeks: boolean;
  locale: string;
};

/**
 * Creates a calendar month object: the month's date (the first day of that
 * month), an array of all dates in that month, and an array of weeks, each
 * an array of dates, for rendering an accessible calendar grid.
 */
function createMonth(props: CreateMonthProps): Month<DateValue> {
  const { dateObj, weekStartsOn, fixedWeeks, locale } = props;
  const daysInMonth = getDaysInMonth(dateObj);
  const datesArray = Array.from({ length: daysInMonth }, (_, i) => dateObj.set({ day: i + 1 }));
  const firstDayOfMonth = startOfMonth(dateObj);
  const lastDayOfMonth = endOfMonth(dateObj);
  const lastSunday =
    weekStartsOn !== undefined
      ? getLastFirstDayOfWeek(firstDayOfMonth, weekStartsOn, 'en-US')
      : getLastFirstDayOfWeek(firstDayOfMonth, 0, locale);
  const nextSaturday =
    weekStartsOn !== undefined
      ? getNextLastDayOfWeek(lastDayOfMonth, weekStartsOn, 'en-US')
      : getNextLastDayOfWeek(lastDayOfMonth, 0, locale);
  const lastMonthDays = getDaysBetween(lastSunday.subtract({ days: 1 }), firstDayOfMonth);
  const nextMonthDays = getDaysBetween(lastDayOfMonth, nextSaturday.add({ days: 1 }));
  const totalDays = lastMonthDays.length + datesArray.length + nextMonthDays.length;

  if (fixedWeeks && totalDays < 42) {
    const extraDays = 42 - totalDays;
    let startFrom = nextMonthDays[nextMonthDays.length - 1];
    if (!startFrom) {
      startFrom = dateObj.add({ months: 1 }).set({ day: 1 });
    }
    let length = extraDays;
    if (nextMonthDays.length === 0) {
      length = extraDays - 1;
      nextMonthDays.push(startFrom);
    }
    const extraDaysArray = Array.from({ length }, (_, i) => {
      const incr = i + 1;
      return startFrom.add({ days: incr });
    });
    nextMonthDays.push(...extraDaysArray);
  }

  const allDays = lastMonthDays.concat(datesArray, nextMonthDays);
  const weeks = chunk(allDays, 7);

  return {
    value: dateObj,
    dates: allDays,
    weeks
  };
}

export function createMonths(
  props: CreateMonthProps & {
    numberOfMonths: number | undefined;
  }
): Month<DateValue>[] {
  const { numberOfMonths, dateObj, ...monthProps } = props;
  const months: Month<DateValue>[] = [];
  if (!numberOfMonths || numberOfMonths === 1) {
    months.push(createMonth({ ...monthProps, dateObj }));
    return months;
  }
  months.push(createMonth({ ...monthProps, dateObj }));
  for (let i = 1; i < numberOfMonths; i++) {
    const nextMonth = dateObj.add({ months: i });
    months.push(createMonth({ ...monthProps, dateObj: nextMonth }));
  }
  return months;
}

export function getSelectableCells(calendarNode: HTMLElement | null): HTMLElement[] {
  if (!calendarNode) return [];
  const selectableSelector = `[data-bits-day]:not([data-disabled]):not([data-outside-visible-months])`;
  return Array.from(calendarNode.querySelectorAll(selectableSelector)).filter((el) => isHTMLElement(el));
}

/**
 * Extracts the date from the `data-value` attribute of a date cell and
 * sets it as the placeholder value.
 */
export function setPlaceholderToNodeValue(node: HTMLElement, placeholder: WritableBox<DateValue>) {
  const cellValue = node.getAttribute('data-value');
  if (!cellValue) return;
  placeholder.current = parseStringToDateValue(cellValue, placeholder.current);
}

/**
 * Shared logic for shifting focus between cells in the calendar and range calendar.
 */
export function shiftCalendarFocus({
  node,
  add,
  placeholder,
  calendarNode,
  isPrevButtonDisabled,
  isNextButtonDisabled,
  months,
  numberOfMonths
}: {
  node: HTMLElement;
  add: number;
  placeholder: WritableBox<DateValue>;
  calendarNode: HTMLElement | null;
  isPrevButtonDisabled: boolean;
  isNextButtonDisabled: boolean;
  months: Month<DateValue>[];
  numberOfMonths: number;
}) {
  const candidateCells = getSelectableCells(calendarNode);
  if (!candidateCells.length) return;
  const index = candidateCells.indexOf(node);
  const nextIndex = index + add;

  if (isValidIndex(nextIndex, candidateCells)) {
    const nextCell = candidateCells[nextIndex];
    setPlaceholderToNodeValue(nextCell, placeholder);
    return nextCell.focus();
  }

  if (nextIndex < 0) {
    if (isPrevButtonDisabled) return;
    const firstMonth = months[0]?.value;
    if (!firstMonth) return;
    placeholder.current = firstMonth.subtract({ months: numberOfMonths });
    afterTick(() => {
      const newCandidateCells = getSelectableCells(calendarNode);
      if (!newCandidateCells.length) return;
      const newIndex = newCandidateCells.length - Math.abs(nextIndex);
      if (isValidIndex(newIndex, newCandidateCells)) {
        const newCell = newCandidateCells[newIndex];
        setPlaceholderToNodeValue(newCell, placeholder);
        return newCell.focus();
      }
    });
  }

  if (nextIndex >= candidateCells.length) {
    if (isNextButtonDisabled) return;
    const firstMonth = months[0]?.value;
    if (!firstMonth) return;
    placeholder.current = firstMonth.add({ months: numberOfMonths });
    afterTick(() => {
      const newCandidateCells = getSelectableCells(calendarNode);
      if (!newCandidateCells.length) return;
      const newIndex = nextIndex - candidateCells.length;
      if (isValidIndex(newIndex, newCandidateCells)) {
        const nextCell = newCandidateCells[newIndex];
        return nextCell.focus();
      }
    });
  }
}

const ARROW_KEYS: string[] = [kbd.ARROW_DOWN, kbd.ARROW_UP, kbd.ARROW_LEFT, kbd.ARROW_RIGHT];
const SELECT_KEYS: string[] = [kbd.ENTER, kbd.SPACE];

/**
 * Shared keyboard event handler for the calendar and range calendar.
 */
export function handleCalendarKeydown({
  event,
  handleCellClick,
  shiftFocus,
  placeholderValue
}: {
  event: KeyboardEvent;
  handleCellClick: (e: Event, date: DateValue) => void;
  shiftFocus: (node: HTMLElement, add: number) => void;
  placeholderValue: DateValue;
}) {
  const currentCell = event.target;
  if (!isCalendarDayNode(currentCell)) return;
  if (!ARROW_KEYS.includes(event.key) && !SELECT_KEYS.includes(event.key)) return;
  event.preventDefault();

  const kbdFocusMap: Record<string, number> = {
    [kbd.ARROW_DOWN]: 7,
    [kbd.ARROW_UP]: -7,
    [kbd.ARROW_LEFT]: -1,
    [kbd.ARROW_RIGHT]: 1
  };

  if (ARROW_KEYS.includes(event.key)) {
    const add = kbdFocusMap[event.key];
    if (add !== undefined) {
      shiftFocus(currentCell, add);
    }
  }

  if (SELECT_KEYS.includes(event.key)) {
    const cellValue = currentCell.getAttribute('data-value');
    if (!cellValue) return;
    handleCellClick(event, parseStringToDateValue(cellValue, placeholderValue));
  }
}

type PageNavProps = {
  months: Month<DateValue>[];
  setMonths: (months: Month<DateValue>[]) => void;
  numberOfMonths: number;
  pagedNavigation: boolean;
  weekStartsOn: number | undefined;
  locale: string;
  fixedWeeks: boolean;
  setPlaceholder: (date: DateValue) => void;
};

export function handleCalendarNextPage({
  months,
  setMonths,
  numberOfMonths,
  pagedNavigation,
  weekStartsOn,
  locale,
  fixedWeeks,
  setPlaceholder
}: PageNavProps) {
  const firstMonth = months[0]?.value;
  if (!firstMonth) return;
  if (pagedNavigation) {
    setPlaceholder(firstMonth.add({ months: numberOfMonths }));
  } else {
    const targetDate = firstMonth.add({ months: 1 });
    const newMonths = createMonths({
      dateObj: targetDate,
      weekStartsOn,
      locale,
      fixedWeeks,
      numberOfMonths
    });
    setPlaceholder(targetDate);
    setMonths(newMonths);
  }
}

export function handleCalendarPrevPage({
  months,
  setMonths,
  numberOfMonths,
  pagedNavigation,
  weekStartsOn,
  locale,
  fixedWeeks,
  setPlaceholder
}: PageNavProps) {
  const firstMonth = months[0]?.value;
  if (!firstMonth) return;
  if (pagedNavigation) {
    setPlaceholder(firstMonth.subtract({ months: numberOfMonths }));
  } else {
    const targetDate = firstMonth.subtract({ months: 1 });
    const newMonths = createMonths({
      dateObj: targetDate,
      weekStartsOn,
      locale,
      fixedWeeks,
      numberOfMonths
    });
    setPlaceholder(targetDate);
    setMonths(newMonths);
  }
}

export function getWeekdays({
  months,
  formatter,
  weekdayFormat
}: {
  months: Month<DateValue>[];
  formatter: Formatter;
  weekdayFormat: Intl.DateTimeFormatOptions['weekday'];
}): string[] {
  if (!months.length) return [];
  const firstMonth = months[0];
  const firstWeek = firstMonth.weeks[0];
  if (!firstWeek) return [];
  return firstWeek.map((date) => formatter.dayOfWeek(toDate(date), weekdayFormat));
}

/**
 * Updates the displayed months based on changes in the options values,
 * which determines the month to show in the calendar.
 */
export function useMonthViewOptionsSync(props: {
  weekStartsOn: ReadableBox<number | undefined>;
  locale: ReadableBox<string>;
  fixedWeeks: ReadableBox<boolean>;
  numberOfMonths: ReadableBox<number>;
  placeholder: ReadableBox<DateValue>;
  setMonths: (months: Month<DateValue>[]) => void;
}) {
  $effect(() => {
    const weekStartsOn = props.weekStartsOn.current;
    const locale = props.locale.current;
    const fixedWeeks = props.fixedWeeks.current;
    const numberOfMonths = props.numberOfMonths.current;
    const placeholder = props.placeholder.current;
    if (!placeholder) return;
    const defaultMonthProps = { weekStartsOn, locale, fixedWeeks, numberOfMonths };
    props.setMonths(createMonths({ ...defaultMonthProps, dateObj: placeholder }));
  });
}

/**
 * Creates an accessible heading element for the calendar. Returns a
 * function that removes the heading element.
 */
export function createAccessibleHeading({
  calendarNode,
  label,
  accessibleHeadingId
}: {
  calendarNode: HTMLElement;
  label: string;
  accessibleHeadingId: string;
}) {
  const doc = getDocument(calendarNode);
  const div = doc.createElement('div');
  div.style.cssText = styleToString({
    border: '0px',
    clip: 'rect(0px, 0px, 0px, 0px)',
    clipPath: 'inset(50%)',
    height: '1px',
    margin: '-1px',
    overflow: 'hidden',
    padding: '0px',
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: '1px'
  });
  const h2 = doc.createElement('div');
  h2.textContent = label;
  h2.id = accessibleHeadingId;
  h2.role = 'heading';
  h2.ariaLevel = '2';
  calendarNode.insertBefore(div, calendarNode.firstChild);
  div.appendChild(h2);
  return () => {
    const heading = doc.getElementById(accessibleHeadingId);
    if (!heading) return;
    div.parentElement?.removeChild(div);
    heading.remove();
  };
}

export function useMonthViewPlaceholderSync({
  placeholder,
  getVisibleMonths,
  weekStartsOn,
  locale,
  fixedWeeks,
  numberOfMonths,
  setMonths
}: {
  placeholder: ReadableBox<DateValue>;
  getVisibleMonths: () => DateValue[];
  weekStartsOn: ReadableBox<number | undefined>;
  locale: ReadableBox<string>;
  fixedWeeks: ReadableBox<boolean>;
  numberOfMonths: ReadableBox<number>;
  setMonths: (months: Month<DateValue>[]) => void;
}) {
  $effect(() => {
    if (getVisibleMonths().some((month) => isSameMonth(month, placeholder.current))) {
      return;
    }
    const defaultMonthProps = {
      weekStartsOn: weekStartsOn.current,
      locale: locale.current,
      fixedWeeks: fixedWeeks.current,
      numberOfMonths: numberOfMonths.current
    };
    setMonths(createMonths({ ...defaultMonthProps, dateObj: placeholder.current }));
  });
}

export function getIsNextButtonDisabled({
  maxValue,
  months,
  disabled
}: {
  maxValue: DateValue | undefined;
  months: Month<DateValue>[];
  disabled: boolean;
}) {
  if (!maxValue || !months.length) return false;
  if (disabled) return true;
  const lastMonthInView = months[months.length - 1]?.value;
  if (!lastMonthInView) return false;
  const firstMonthOfNextPage = lastMonthInView.add({ months: 1 }).set({ day: 1 });
  return isAfter(firstMonthOfNextPage, maxValue);
}

export function getIsPrevButtonDisabled({
  minValue,
  months,
  disabled
}: {
  minValue: DateValue | undefined;
  months: Month<DateValue>[];
  disabled: boolean;
}) {
  if (!minValue || !months.length) return false;
  if (disabled) return true;
  const firstMonthInView = months[0]?.value;
  if (!firstMonthInView) return false;
  const lastMonthOfPrevPage = firstMonthInView.subtract({ months: 1 }).set({ day: 35 });
  return isBefore(lastMonthOfPrevPage, minValue);
}

export function getCalendarHeadingValue({
  months,
  locale,
  formatter
}: {
  months: Month<DateValue>[];
  locale: string;
  formatter: Formatter;
}) {
  if (!months.length) return '';
  if (locale !== formatter.getLocale()) {
    formatter.setLocale(locale);
  }
  if (months.length === 1) {
    const month = toDate(months[0].value);
    return `${formatter.fullMonthAndYear(month)}`;
  }
  const startMonth = toDate(months[0].value);
  const endMonth = toDate(months[months.length - 1].value);
  const startMonthName = formatter.fullMonth(startMonth);
  const endMonthName = formatter.fullMonth(endMonth);
  const startMonthYear = formatter.fullYear(startMonth);
  const endMonthYear = formatter.fullYear(endMonth);
  return startMonthYear === endMonthYear
    ? `${startMonthName} - ${endMonthName} ${endMonthYear}`
    : `${startMonthName} ${startMonthYear} - ${endMonthName} ${endMonthYear}`;
}

export function getCalendarElementProps({
  fullCalendarLabel,
  id,
  isInvalid,
  disabled,
  readonly
}: {
  fullCalendarLabel: string;
  id: string;
  isInvalid: boolean;
  disabled: boolean;
  readonly: boolean;
}) {
  return {
    id,
    role: 'application',
    'aria-label': fullCalendarLabel,
    'data-invalid': boolToEmptyStrOrUndef(isInvalid),
    'data-disabled': boolToEmptyStrOrUndef(disabled),
    'data-readonly': boolToEmptyStrOrUndef(readonly)
  };
}

export function getFirstNonDisabledDateInView(calendarRef: HTMLElement): DateValue | undefined {
  if (!isBrowser) return;
  const daysInView = Array.from(calendarRef.querySelectorAll('[data-bits-day]:not([aria-disabled=true])'));
  if (daysInView.length === 0) return;
  const element = daysInView[0];
  const value = element?.getAttribute('data-value');
  const type = element?.getAttribute('data-type');
  if (!value || !type) return;
  return parseAnyDateValue(value, type as DateValueType);
}

/**
 * Ensures the placeholder is not set to a disabled date, which would
 * prevent the user from entering the Calendar via the keyboard.
 */
export function useEnsureNonDisabledPlaceholder({
  ref,
  placeholder,
  defaultPlaceholder,
  minValue,
  maxValue,
  isDateDisabled
}: {
  ref: ReadableBox<HTMLElement | null>;
  placeholder: WritableBox<DateValue>;
  defaultPlaceholder: DateValue;
  minValue: ReadableBox<DateValue | undefined>;
  maxValue: ReadableBox<DateValue | undefined>;
  isDateDisabled: ReadableBox<(date: DateValue) => boolean>;
}) {
  function isDisabled(date: DateValue) {
    if (isDateDisabled.current(date)) return true;
    if (minValue.current && isBefore(date, minValue.current)) return true;
    if (maxValue.current && isBefore(maxValue.current, date)) return true;
    return false;
  }

  watch(
    () => ref.current,
    () => {
      if (!ref.current) return;
      if (
        placeholder.current &&
        isSameDay(placeholder.current, defaultPlaceholder) &&
        isDisabled(defaultPlaceholder)
      ) {
        placeholder.current = getFirstNonDisabledDateInView(ref.current) ?? defaultPlaceholder;
      }
    }
  );
}

export function getDateWithPreviousTime(date: DateValue | undefined, prev: DateValue | undefined) {
  if (!date || !prev) return date;
  if (hasTime(date) && hasTime(prev)) {
    return date.set({
      hour: prev.hour,
      minute: prev.minute,
      millisecond: prev.millisecond,
      second: prev.second
    });
  }
  return date;
}

export const calendarAttrs = createBitsAttrs({
  component: 'calendar',
  parts: [
    'root',
    'grid',
    'cell',
    'next-button',
    'prev-button',
    'day',
    'grid-body',
    'grid-head',
    'grid-row',
    'head-cell',
    'header',
    'heading',
    'month-select',
    'year-select'
  ] as const
});

export function getDefaultYears(opts: {
  minValue: DateValue | undefined;
  maxValue: DateValue | undefined;
  placeholderYear: number;
}) {
  const currentYear = new Date().getFullYear();
  const latestYear = Math.max(opts.placeholderYear, currentYear);
  let minYear: number;
  let maxYear: number;
  if (opts.minValue) {
    minYear = opts.minValue.year;
  } else {
    const initialMinYear = latestYear - 100;
    minYear = opts.placeholderYear < initialMinYear ? opts.placeholderYear - 10 : initialMinYear;
  }
  if (opts.maxValue) {
    maxYear = opts.maxValue.year;
  } else {
    maxYear = latestYear + 10;
  }
  if (minYear > maxYear) {
    minYear = maxYear;
  }
  const totalYears = maxYear - minYear + 1;
  return Array.from({ length: totalYears }, (_, i) => minYear + i);
}
