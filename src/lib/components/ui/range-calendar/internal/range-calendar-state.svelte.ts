import { type DateValue, getLocalTimeZone, isSameDay, isSameMonth, isToday } from '@internationalized/date';
import { onMount, untrack } from 'svelte';
import { Context, watch } from 'runed';
import { DOMContext, type ReadableBox, type WritableBox, attachRef } from 'svelte-toolbelt';
import { CalendarRootContext, type CalendarRootState } from '$lib/components/ui/calendar/internal/calendar-state.svelte';
import { boolToEmptyStrOrUndef, boolToStr } from '$lib/components/ui/calendar/internal/attrs';
import { getAnnouncer } from '$lib/components/ui/calendar/internal/announcer';
import { createFormatter, type Formatter } from '$lib/components/ui/calendar/internal/formatter';
import { useId } from '$lib/components/ui/calendar/internal/ids';
import {
  calendarAttrs,
  createMonths,
  getCalendarElementProps,
  getCalendarHeadingValue,
  getDefaultYears,
  getIsNextButtonDisabled,
  getIsPrevButtonDisabled,
  getWeekdays,
  handleCalendarKeydown,
  handleCalendarNextPage,
  handleCalendarPrevPage,
  shiftCalendarFocus,
  useEnsureNonDisabledPlaceholder,
  useMonthViewOptionsSync,
  useMonthViewPlaceholderSync
} from '$lib/components/ui/calendar/internal/calendar-helpers.svelte';
import {
  areAllDaysBetweenValid,
  getDateValueType,
  isAfter,
  isBefore,
  isBetweenInclusive,
  toDate
} from '$lib/components/ui/calendar/internal/date-utils';
import type { DateMatcher, Month, WeekStartsOn } from '$lib/components/ui/calendar/internal/types';
import type { DateRange } from './types';

export type RangeCalendarRootStateOpts = {
  id: ReadableBox<string>;
  ref: WritableBox<HTMLElement | null>;
  value: WritableBox<DateRange>;
  placeholder: WritableBox<DateValue>;
  disabled: ReadableBox<boolean>;
  readonly: ReadableBox<boolean>;
  preventDeselect: ReadableBox<boolean>;
  minValue: ReadableBox<DateValue | undefined>;
  maxValue: ReadableBox<DateValue | undefined>;
  isDateUnavailable: ReadableBox<DateMatcher>;
  isDateDisabled: ReadableBox<DateMatcher>;
  pagedNavigation: ReadableBox<boolean>;
  weekStartsOn: ReadableBox<WeekStartsOn | undefined>;
  weekdayFormat: ReadableBox<Intl.DateTimeFormatOptions['weekday']>;
  numberOfMonths: ReadableBox<number>;
  locale: ReadableBox<string>;
  calendarLabel: ReadableBox<string>;
  fixedWeeks: ReadableBox<boolean>;
  disableDaysOutsideMonth: ReadableBox<boolean>;
  minDays: ReadableBox<number | undefined>;
  maxDays: ReadableBox<number | undefined>;
  excludeDisabled: ReadableBox<boolean>;
  startValue: WritableBox<DateValue | undefined>;
  endValue: WritableBox<DateValue | undefined>;
  monthFormat: ReadableBox<Intl.DateTimeFormatOptions['month'] | ((month: number) => string)>;
  yearFormat: ReadableBox<Intl.DateTimeFormatOptions['year'] | ((year: number) => string)>;
  defaultPlaceholder: DateValue;
  onRangeSelect?: () => void;
};

const RangeCalendarCellContext = new Context<RangeCalendarCellState>('RangeCalendar.Cell');

export class RangeCalendarRootState {
  static create(opts: RangeCalendarRootStateOpts) {
    return CalendarRootContext.set(new RangeCalendarRootState(opts) as unknown as CalendarRootState);
  }

  opts: RangeCalendarRootStateOpts;
  attachment: ReturnType<typeof attachRef<HTMLElement>>;
  visibleMonths = $derived.by(() => this.months.map((month) => month.value));
  months = $state<Month<DateValue>[]>([]);
  announcer: ReturnType<typeof getAnnouncer>;
  formatter: Formatter;
  accessibleHeadingId = useId();
  focusedValue = $state<DateValue | undefined>(undefined);
  lastPressedDateValue: DateValue | undefined = undefined;
  domContext: DOMContext;

  weekdays = $derived.by(() => {
    return getWeekdays({ months: this.months, formatter: this.formatter, weekdayFormat: this.opts.weekdayFormat.current });
  });

  isStartInvalid = $derived.by(() => {
    if (!this.opts.startValue.current) return false;
    return this.isDateUnavailable(this.opts.startValue.current) || this.isDateDisabled(this.opts.startValue.current);
  });

  isEndInvalid = $derived.by(() => {
    if (!this.opts.endValue.current) return false;
    return this.isDateUnavailable(this.opts.endValue.current) || this.isDateDisabled(this.opts.endValue.current);
  });

  isInvalid = $derived.by(() => {
    if (this.isStartInvalid || this.isEndInvalid) return true;
    if (this.opts.endValue.current && this.opts.startValue.current && isBefore(this.opts.endValue.current, this.opts.startValue.current))
      return true;
    return false;
  });

  isNextButtonDisabled = $derived.by(() =>
    getIsNextButtonDisabled({ maxValue: this.opts.maxValue.current, months: this.months, disabled: this.opts.disabled.current })
  );

  isPrevButtonDisabled = $derived.by(() =>
    getIsPrevButtonDisabled({ minValue: this.opts.minValue.current, months: this.months, disabled: this.opts.disabled.current })
  );

  headingValue = $derived.by(() => {
    void this.opts.monthFormat.current;
    void this.opts.yearFormat.current;
    return getCalendarHeadingValue({ months: this.months, formatter: this.formatter, locale: this.opts.locale.current });
  });

  fullCalendarLabel = $derived.by(() => `${this.opts.calendarLabel.current} ${this.headingValue}`);

  highlightedRange = $derived.by(() => {
    if (this.opts.startValue.current && this.opts.endValue.current) return null;
    if (!this.opts.startValue.current || !this.focusedValue) return null;
    const isStartBeforeFocused = isBefore(this.opts.startValue.current, this.focusedValue);
    const start = isStartBeforeFocused ? this.opts.startValue.current : this.focusedValue;
    const end = isStartBeforeFocused ? this.focusedValue : this.opts.startValue.current;
    const range = { start, end };
    if (isSameDay(start.add({ days: 1 }), end) || isSameDay(start, end)) {
      return range;
    }
    const isValid = areAllDaysBetweenValid(start, end, this.isDateUnavailable, this.isDateDisabled);
    if (isValid) return range;
    return null;
  });

  initialPlaceholderYear = $derived.by(() => untrack(() => this.opts.placeholder.current.year));
  defaultYears = $derived.by(() =>
    getDefaultYears({ minValue: this.opts.minValue.current, maxValue: this.opts.maxValue.current, placeholderYear: this.initialPlaceholderYear })
  );

  constructor(opts: RangeCalendarRootStateOpts) {
    this.opts = opts;
    this.attachment = attachRef(opts.ref);
    this.domContext = new DOMContext(opts.ref);
    this.announcer = getAnnouncer(null);
    this.formatter = createFormatter({
      initialLocale: this.opts.locale.current,
      monthFormat: this.opts.monthFormat,
      yearFormat: this.opts.yearFormat
    });
    this.months = createMonths({
      dateObj: this.opts.placeholder.current,
      weekStartsOn: this.opts.weekStartsOn.current,
      locale: this.opts.locale.current,
      fixedWeeks: this.opts.fixedWeeks.current,
      numberOfMonths: this.opts.numberOfMonths.current
    });

    $effect.pre(() => {
      if (this.formatter.getLocale() === this.opts.locale.current) return;
      this.formatter.setLocale(this.opts.locale.current);
    });

    onMount(() => {
      this.announcer = getAnnouncer(this.domContext.getDocument());
    });

    useMonthViewPlaceholderSync({
      placeholder: this.opts.placeholder,
      getVisibleMonths: () => this.visibleMonths,
      weekStartsOn: this.opts.weekStartsOn,
      locale: this.opts.locale,
      fixedWeeks: this.opts.fixedWeeks,
      numberOfMonths: this.opts.numberOfMonths,
      setMonths: this.setMonths
    });

    useMonthViewOptionsSync({
      fixedWeeks: this.opts.fixedWeeks,
      locale: this.opts.locale,
      numberOfMonths: this.opts.numberOfMonths,
      placeholder: this.opts.placeholder,
      setMonths: this.setMonths,
      weekStartsOn: this.opts.weekStartsOn
    });

    $effect(() => {
      const node = this.domContext.getElementById(this.accessibleHeadingId);
      if (!node) return;
      node.textContent = this.fullCalendarLabel;
    });

    watch(
      () => this.opts.value.current,
      (value) => {
        if (value.start && value.end) {
          this.opts.startValue.current = value.start;
          this.opts.endValue.current = value.end;
        } else if (value.start) {
          this.opts.startValue.current = value.start;
          this.opts.endValue.current = undefined;
        } else if (value.start === undefined && value.end === undefined) {
          this.opts.startValue.current = undefined;
          this.opts.endValue.current = undefined;
        }
      }
    );

    watch(
      () => this.opts.value.current,
      (value) => {
        const startValue = value.start;
        if (startValue && this.opts.placeholder.current !== startValue) {
          this.opts.placeholder.current = startValue;
        }
      }
    );

    watch(
      [() => this.opts.startValue.current, () => this.opts.endValue.current, () => this.opts.excludeDisabled.current],
      ([startValue, endValue, excludeDisabled]) => {
        if (!excludeDisabled || !startValue || !endValue) return;
        if (this.#hasDisabledDatesInRange(startValue, endValue)) {
          this.#setStartValue(undefined);
          this.#setEndValue(undefined);
          this.#announceEmpty();
        }
      }
    );

    watch([() => this.opts.startValue.current, () => this.opts.endValue.current], ([startValue, endValue]) => {
      if (this.opts.value.current && this.opts.value.current.start === startValue && this.opts.value.current.end === endValue) {
        return;
      }
      if (startValue && endValue) {
        this.#updateValue((prev) => {
          if (prev.start === startValue && prev.end === endValue) return prev;
          if (isBefore(endValue, startValue)) {
            const start = startValue;
            const end = endValue;
            this.#setStartValue(end);
            this.#setEndValue(start);
            if (!this.#isRangeValid(endValue, startValue)) {
              this.#setStartValue(startValue);
              this.#setEndValue(undefined);
              return { start: startValue, end: undefined };
            }
            return { start: endValue, end: startValue };
          }
          if (!this.#isRangeValid(startValue, endValue)) {
            this.#setStartValue(endValue);
            this.#setEndValue(undefined);
            return { start: endValue, end: undefined };
          }
          return { start: startValue, end: endValue };
        });
      } else if (this.opts.value.current && this.opts.value.current.start && this.opts.value.current.end) {
        this.opts.value.current.start = undefined;
        this.opts.value.current.end = undefined;
      }
    });

    useEnsureNonDisabledPlaceholder({
      placeholder: opts.placeholder,
      defaultPlaceholder: opts.defaultPlaceholder,
      isDateDisabled: opts.isDateDisabled,
      maxValue: opts.maxValue,
      minValue: opts.minValue,
      ref: opts.ref
    });
  }

  #updateValue(cb: (prev: DateRange) => DateRange) {
    const value = this.opts.value.current;
    const newValue = cb(value);
    this.opts.value.current = newValue;
    if (newValue.start && newValue.end) {
      this.opts.onRangeSelect?.();
    }
  }

  #setStartValue(value: DateValue | undefined) {
    this.opts.startValue.current = value;
    this.#updateValue((prev) => ({ ...prev, start: value }));
  }

  #setEndValue(value: DateValue | undefined) {
    this.opts.endValue.current = value;
    this.#updateValue((prev) => ({ ...prev, end: value }));
  }

  setMonths = (months: Month<DateValue>[]) => {
    this.months = months;
  };

  isOutsideVisibleMonths = (date: DateValue) => !this.visibleMonths.some((month) => isSameMonth(date, month));

  isDateDisabled = (date: DateValue) => {
    if (this.opts.isDateDisabled.current(date) || this.opts.disabled.current) return true;
    const minValue = this.opts.minValue.current;
    const maxValue = this.opts.maxValue.current;
    if (minValue && isBefore(date, minValue)) return true;
    if (maxValue && isAfter(date, maxValue)) return true;
    return false;
  };

  isDateUnavailable = (date: DateValue) => {
    if (this.opts.isDateUnavailable.current(date)) return true;
    return false;
  };

  isSelectionStart = (date: DateValue) => {
    if (!this.opts.startValue.current) return false;
    return isSameDay(date, this.opts.startValue.current);
  };

  isSelectionEnd = (date: DateValue) => {
    if (!this.opts.endValue.current) return false;
    return isSameDay(date, this.opts.endValue.current);
  };

  isSelected = (date: DateValue) => {
    if (this.opts.startValue.current && isSameDay(this.opts.startValue.current, date)) return true;
    if (this.opts.endValue.current && isSameDay(this.opts.endValue.current, date)) return true;
    if (this.opts.startValue.current && this.opts.endValue.current) {
      return isBetweenInclusive(date, this.opts.startValue.current, this.opts.endValue.current);
    }
    return false;
  };

  #isRangeValid(start: DateValue, end: DateValue) {
    const orderedStart = isBefore(end, start) ? end : start;
    const orderedEnd = isBefore(end, start) ? start : end;
    const startDate = orderedStart.toDate(getLocalTimeZone());
    const endDate = orderedEnd.toDate(getLocalTimeZone());
    const timeDifference = endDate.getTime() - startDate.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const daysInRange = daysDifference + 1;
    if (this.opts.minDays.current && daysInRange < this.opts.minDays.current) return false;
    if (this.opts.maxDays.current && daysInRange > this.opts.maxDays.current) return false;
    if (this.opts.excludeDisabled.current && this.#hasDisabledDatesInRange(orderedStart, orderedEnd)) return false;
    return true;
  }

  shiftFocus = (node: HTMLElement, add: number) => {
    return shiftCalendarFocus({
      node,
      add,
      placeholder: this.opts.placeholder,
      calendarNode: this.opts.ref.current,
      isPrevButtonDisabled: this.isPrevButtonDisabled,
      isNextButtonDisabled: this.isNextButtonDisabled,
      months: this.months,
      numberOfMonths: this.opts.numberOfMonths.current
    });
  };

  #announceEmpty() {
    this.announcer.announce('Selected date is now empty.', 'polite');
  }

  #announceSelectedDate(date: DateValue) {
    this.announcer.announce(`Selected Date: ${this.formatter.selectedDate(date, false)}`, 'polite');
  }

  #announceSelectedRange(start: DateValue, end: DateValue) {
    this.announcer.announce(
      `Selected Dates: ${this.formatter.selectedDate(start, false)} to ${this.formatter.selectedDate(end, false)}`,
      'polite'
    );
  }

  handleCellClick = (e: Event, date: DateValue) => {
    if (this.isDateDisabled(date) || this.isDateUnavailable(date)) return;
    const prevLastPressedDate = this.lastPressedDateValue;
    this.lastPressedDateValue = date;

    if (this.opts.startValue.current && this.highlightedRange === null) {
      if (isSameDay(this.opts.startValue.current, date) && !this.opts.preventDeselect.current && !this.opts.endValue.current) {
        this.#setStartValue(undefined);
        this.opts.placeholder.current = date;
        this.#announceEmpty();
        return;
      }
      if (!this.opts.endValue.current) {
        e.preventDefault();
        if (prevLastPressedDate && isSameDay(prevLastPressedDate, date)) {
          this.#setStartValue(date);
          this.#announceSelectedDate(date);
        }
      }
    }

    if (
      this.opts.startValue.current &&
      this.opts.endValue.current &&
      isSameDay(this.opts.endValue.current, date) &&
      !this.opts.preventDeselect.current
    ) {
      this.#setStartValue(undefined);
      this.#setEndValue(undefined);
      this.opts.placeholder.current = date;
      this.#announceEmpty();
      return;
    }

    if (!this.opts.startValue.current) {
      this.#announceSelectedDate(date);
      this.#setStartValue(date);
    } else if (!this.opts.endValue.current) {
      const startDate = this.opts.startValue.current;
      const endDate = date;
      const orderedStart = isBefore(endDate, startDate) ? endDate : startDate;
      const orderedEnd = isBefore(endDate, startDate) ? startDate : endDate;
      if (!this.#isRangeValid(orderedStart, orderedEnd)) {
        this.#setStartValue(date);
        this.#setEndValue(undefined);
        this.#announceSelectedDate(date);
      } else if (isBefore(endDate, startDate)) {
        this.#setStartValue(endDate);
        this.#setEndValue(startDate);
        this.#announceSelectedRange(endDate, startDate);
      } else {
        this.#setEndValue(date);
        this.#announceSelectedRange(this.opts.startValue.current, date);
      }
    } else if (this.opts.endValue.current && this.opts.startValue.current) {
      this.#setEndValue(undefined);
      this.#announceSelectedDate(date);
      this.#setStartValue(date);
    }
  };

  onkeydown = (event: KeyboardEvent) => {
    return handleCalendarKeydown({
      event,
      handleCellClick: this.handleCellClick,
      placeholderValue: this.opts.placeholder.current,
      shiftFocus: this.shiftFocus
    });
  };

  nextPage = () => {
    handleCalendarNextPage({
      fixedWeeks: this.opts.fixedWeeks.current,
      locale: this.opts.locale.current,
      numberOfMonths: this.opts.numberOfMonths.current,
      pagedNavigation: this.opts.pagedNavigation.current,
      setMonths: this.setMonths,
      setPlaceholder: (date) => (this.opts.placeholder.current = date),
      weekStartsOn: this.opts.weekStartsOn.current,
      months: this.months
    });
  };

  prevPage = () => {
    handleCalendarPrevPage({
      fixedWeeks: this.opts.fixedWeeks.current,
      locale: this.opts.locale.current,
      numberOfMonths: this.opts.numberOfMonths.current,
      pagedNavigation: this.opts.pagedNavigation.current,
      setMonths: this.setMonths,
      setPlaceholder: (date) => (this.opts.placeholder.current = date),
      weekStartsOn: this.opts.weekStartsOn.current,
      months: this.months
    });
  };

  nextYear = () => {
    this.opts.placeholder.current = this.opts.placeholder.current.add({ years: 1 });
  };

  prevYear = () => {
    this.opts.placeholder.current = this.opts.placeholder.current.subtract({ years: 1 });
  };

  setYear = (year: number) => {
    this.opts.placeholder.current = this.opts.placeholder.current.set({ year });
  };

  setMonth = (month: number) => {
    this.opts.placeholder.current = this.opts.placeholder.current.set({ month });
  };

  getBitsAttr = (part: string) => {
    return calendarAttrs.getAttr(part, 'range-calendar');
  };

  snippetProps = $derived.by(() => ({ months: this.months, weekdays: this.weekdays }));

  props = $derived.by(
    () =>
      ({
        ...getCalendarElementProps({
          fullCalendarLabel: this.fullCalendarLabel,
          id: this.opts.id.current,
          isInvalid: this.isInvalid,
          disabled: this.opts.disabled.current,
          readonly: this.opts.readonly.current
        }),
        [this.getBitsAttr('root')]: '',
        onkeydown: this.onkeydown,
        ...this.attachment
      }) as Record<string, unknown>
  );

  #hasDisabledDatesInRange(start: DateValue, end: DateValue): boolean {
    for (let date = start; isBefore(date, end) || isSameDay(date, end); date = date.add({ days: 1 })) {
      if (this.isDateDisabled(date)) return true;
    }
    return false;
  }
}

export type RangeCalendarCellStateOpts = {
  id: ReadableBox<string>;
  ref: WritableBox<HTMLElement | null>;
  date: ReadableBox<DateValue>;
  month: ReadableBox<DateValue>;
};

export class RangeCalendarCellState {
  static create(opts: RangeCalendarCellStateOpts) {
    return RangeCalendarCellContext.set(new RangeCalendarCellState(opts, CalendarRootContext.get() as unknown as RangeCalendarRootState));
  }

  opts: RangeCalendarCellStateOpts;
  root: RangeCalendarRootState;
  attachment: ReturnType<typeof attachRef<HTMLElement>>;

  cellDate = $derived.by(() => toDate(this.opts.date.current));
  isOutsideMonth = $derived.by(() => !isSameMonth(this.opts.date.current, this.opts.month.current));
  isDisabled = $derived.by(
    () => this.root.isDateDisabled(this.opts.date.current) || (this.isOutsideMonth && this.root.opts.disableDaysOutsideMonth.current)
  );
  isUnavailable = $derived.by(() => this.root.opts.isDateUnavailable.current(this.opts.date.current));
  isDateToday = $derived.by(() => isToday(this.opts.date.current, getLocalTimeZone()));
  isOutsideVisibleMonths = $derived.by(() => this.root.isOutsideVisibleMonths(this.opts.date.current));
  isFocusedDate = $derived.by(() => isSameDay(this.opts.date.current, this.root.opts.placeholder.current));
  isSelectedDate = $derived.by(() => this.root.isSelected(this.opts.date.current));
  isSelectionStart = $derived.by(() => this.root.isSelectionStart(this.opts.date.current));
  isRangeStart = $derived.by(() => this.root.isSelectionStart(this.opts.date.current));
  isRangeEnd = $derived.by(() => {
    if (!this.root.opts.endValue.current) return this.root.isSelectionStart(this.opts.date.current);
    return this.root.isSelectionEnd(this.opts.date.current);
  });
  isSelectionEnd = $derived.by(() => this.root.isSelectionEnd(this.opts.date.current));
  isSelectionMiddle = $derived.by(() => this.isSelectedDate && !this.isSelectionStart && !this.isSelectionEnd);
  isRangeMiddle = $derived.by(() => this.isSelectionMiddle);
  isHighlighted = $derived.by(() =>
    this.root.highlightedRange
      ? isBetweenInclusive(this.opts.date.current, this.root.highlightedRange.start, this.root.highlightedRange.end)
      : false
  );
  labelText = $derived.by(() =>
    this.root.formatter.custom(this.cellDate, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
  );

  constructor(opts: RangeCalendarCellStateOpts, root: RangeCalendarRootState) {
    this.opts = opts;
    this.root = root;
    this.attachment = attachRef(opts.ref);
  }

  snippetProps = $derived.by(() => ({ disabled: this.isDisabled, unavailable: this.isUnavailable, selected: this.isSelectedDate }));

  ariaDisabled = $derived.by(
    () => this.isDisabled || (this.isOutsideMonth && this.root.opts.disableDaysOutsideMonth.current) || this.isUnavailable
  );

  sharedDataAttrs = $derived.by(() => ({
    'data-unavailable': boolToEmptyStrOrUndef(this.isUnavailable),
    'data-today': this.isDateToday ? '' : undefined,
    'data-outside-month': this.isOutsideMonth ? '' : undefined,
    'data-outside-visible-months': this.isOutsideVisibleMonths ? '' : undefined,
    'data-focused': this.isFocusedDate ? '' : undefined,
    'data-selection-start': this.isSelectionStart ? '' : undefined,
    'data-selection-end': this.isSelectionEnd ? '' : undefined,
    'data-range-start': this.isRangeStart ? '' : undefined,
    'data-range-end': this.isRangeEnd ? '' : undefined,
    'data-range-middle': this.isRangeMiddle ? '' : undefined,
    'data-highlighted': this.isHighlighted ? '' : undefined,
    'data-selected': boolToEmptyStrOrUndef(this.isSelectedDate),
    'data-value': this.opts.date.current.toString(),
    'data-type': getDateValueType(this.opts.date.current),
    'data-disabled': boolToEmptyStrOrUndef(this.isDisabled || (this.isOutsideMonth && this.root.opts.disableDaysOutsideMonth.current))
  }));

  props = $derived.by(() => ({
    id: this.opts.id.current,
    role: 'gridcell',
    'aria-selected': boolToStr(this.isSelectedDate),
    'aria-disabled': boolToStr(this.ariaDisabled),
    ...this.sharedDataAttrs,
    [this.root.getBitsAttr('cell')]: '',
    ...this.attachment
  }));
}

export type RangeCalendarDayStateOpts = {
  id: ReadableBox<string>;
  ref: WritableBox<HTMLElement | null>;
};

export class RangeCalendarDayState {
  static create(opts: RangeCalendarDayStateOpts) {
    return new RangeCalendarDayState(opts, RangeCalendarCellContext.get());
  }

  opts: RangeCalendarDayStateOpts;
  cell: RangeCalendarCellState;
  attachment: ReturnType<typeof attachRef<HTMLElement>>;

  constructor(opts: RangeCalendarDayStateOpts, cell: RangeCalendarCellState) {
    this.opts = opts;
    this.cell = cell;
    this.attachment = attachRef(opts.ref);
  }

  #tabindex = $derived.by(() =>
    (this.cell.isOutsideMonth && this.cell.root.opts.disableDaysOutsideMonth.current) || this.cell.isDisabled
      ? undefined
      : this.cell.isFocusedDate
        ? 0
        : -1
  );

  onclick = (e: MouseEvent) => {
    if (this.cell.isDisabled) return;
    this.cell.root.handleCellClick(e, this.cell.opts.date.current);
  };

  onmouseenter = () => {
    if (this.cell.isDisabled) return;
    this.cell.root.focusedValue = this.cell.opts.date.current;
  };

  onfocusin = () => {
    if (this.cell.isDisabled) return;
    this.cell.root.focusedValue = this.cell.opts.date.current;
  };

  snippetProps = $derived.by(() => ({
    disabled: this.cell.isDisabled,
    unavailable: this.cell.isUnavailable,
    selected: this.cell.isSelectedDate,
    day: `${this.cell.opts.date.current.day}`
  }));

  props = $derived.by(() => ({
    id: this.opts.id.current,
    role: 'button',
    'aria-label': this.cell.labelText,
    'aria-disabled': boolToStr(this.cell.ariaDisabled),
    ...this.cell.sharedDataAttrs,
    tabindex: this.#tabindex,
    [this.cell.root.getBitsAttr('day')]: '',
    'data-bits-day': '',
    onclick: this.onclick,
    onmouseenter: this.onmouseenter,
    onfocusin: this.onfocusin,
    ...this.attachment
  }));
}
