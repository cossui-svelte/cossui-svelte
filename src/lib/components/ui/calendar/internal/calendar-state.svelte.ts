import { type DateValue, getLocalTimeZone, isSameDay, isSameMonth, isToday } from '@internationalized/date';
import { Context, watch } from 'runed';
import { DOMContext, type ReadableBox, type WritableBox, attachRef } from 'svelte-toolbelt';
import { onMount, untrack } from 'svelte';
import { boolToEmptyStrOrUndef, boolToStr, boolToStrTrueOrUndef } from './attrs';
import { getAnnouncer } from './announcer';
import { createFormatter, type Formatter } from './formatter';
import {
  calendarAttrs,
  createAccessibleHeading,
  createMonths,
  getCalendarElementProps,
  getCalendarHeadingValue,
  getDateWithPreviousTime,
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
} from './calendar-helpers.svelte';
import { getDateValueType, isBefore, toDate } from './date-utils';
import { useId } from './ids';
import type { DateMatcher, Month, WeekStartsOn } from './types';

type CalendarType = 'single' | 'multiple';

export type CalendarRootStateOpts = {
  id: ReadableBox<string>;
  ref: WritableBox<HTMLElement | null>;
  weekdayFormat: ReadableBox<Intl.DateTimeFormatOptions['weekday']>;
  weekStartsOn: ReadableBox<WeekStartsOn | undefined>;
  pagedNavigation: ReadableBox<boolean>;
  isDateDisabled: ReadableBox<DateMatcher>;
  isDateUnavailable: ReadableBox<DateMatcher>;
  fixedWeeks: ReadableBox<boolean>;
  numberOfMonths: ReadableBox<number>;
  locale: ReadableBox<string>;
  calendarLabel: ReadableBox<string>;
  readonly: ReadableBox<boolean>;
  disabled: ReadableBox<boolean>;
  minValue: ReadableBox<DateValue | undefined>;
  maxValue: ReadableBox<DateValue | undefined>;
  disableDaysOutsideMonth: ReadableBox<boolean>;
  initialFocus: ReadableBox<boolean>;
  maxDays: ReadableBox<number | undefined>;
  placeholder: WritableBox<DateValue>;
  preventDeselect: ReadableBox<boolean>;
  value: WritableBox<DateValue | DateValue[] | undefined>;
  type: ReadableBox<CalendarType>;
  monthFormat: ReadableBox<Intl.DateTimeFormatOptions['month'] | ((month: number) => string)>;
  yearFormat: ReadableBox<Intl.DateTimeFormatOptions['year'] | ((year: number) => string)>;
  defaultPlaceholder: DateValue;
  onDateSelect?: () => void;
};

export const CalendarRootContext = new Context<CalendarRootState>('Calendar.Root | RangeCalendar.Root');

export class CalendarRootState {
  static create(opts: CalendarRootStateOpts) {
    return CalendarRootContext.set(new CalendarRootState(opts));
  }

  opts: CalendarRootStateOpts;
  visibleMonths = $derived.by(() => this.months.map((month) => month.value));
  formatter: Formatter;
  accessibleHeadingId = useId();
  domContext: DOMContext;
  attachment: ReturnType<typeof attachRef<HTMLElement>>;
  months = $state<Month<DateValue>[]>([]);
  announcer: ReturnType<typeof getAnnouncer>;

  constructor(opts: CalendarRootStateOpts) {
    this.opts = opts;
    this.attachment = attachRef(this.opts.ref);
    this.domContext = new DOMContext(opts.ref);
    this.announcer = getAnnouncer(null);
    this.formatter = createFormatter({
      initialLocale: this.opts.locale.current,
      monthFormat: this.opts.monthFormat,
      yearFormat: this.opts.yearFormat
    });

    onMount(() => {
      this.announcer = getAnnouncer(this.domContext.getDocument());
    });

    this.months = createMonths({
      dateObj: this.opts.placeholder.current,
      weekStartsOn: this.opts.weekStartsOn.current,
      locale: this.opts.locale.current,
      fixedWeeks: this.opts.fixedWeeks.current,
      numberOfMonths: this.opts.numberOfMonths.current
    });

    this.#setupInitialFocusEffect();
    this.#setupAccessibleHeadingEffect();
    this.#setupFormatterEffect();

    useMonthViewPlaceholderSync({
      placeholder: this.opts.placeholder,
      getVisibleMonths: () => this.visibleMonths,
      weekStartsOn: this.opts.weekStartsOn,
      locale: this.opts.locale,
      fixedWeeks: this.opts.fixedWeeks,
      numberOfMonths: this.opts.numberOfMonths,
      setMonths: (months) => (this.months = months)
    });

    useMonthViewOptionsSync({
      fixedWeeks: this.opts.fixedWeeks,
      locale: this.opts.locale,
      numberOfMonths: this.opts.numberOfMonths,
      placeholder: this.opts.placeholder,
      setMonths: this.setMonths,
      weekStartsOn: this.opts.weekStartsOn
    });

    watch(
      () => this.fullCalendarLabel,
      (label) => {
        const node = this.domContext.getElementById(this.accessibleHeadingId);
        if (!node) return;
        node.textContent = label;
      }
    );

    watch(
      () => this.opts.value.current,
      () => {
        const value = this.opts.value.current;
        if (Array.isArray(value) && value.length) {
          const lastValue = value[value.length - 1];
          if (lastValue && this.opts.placeholder.current !== lastValue) {
            this.opts.placeholder.current = lastValue;
          }
        } else if (!Array.isArray(value) && value && this.opts.placeholder.current !== value) {
          this.opts.placeholder.current = value;
        }
      }
    );

    useEnsureNonDisabledPlaceholder({
      placeholder: opts.placeholder,
      defaultPlaceholder: opts.defaultPlaceholder,
      isDateDisabled: opts.isDateDisabled,
      maxValue: opts.maxValue,
      minValue: opts.minValue,
      ref: opts.ref
    });
  }

  setMonths = (months: Month<DateValue>[]) => {
    this.months = months;
  };

  weekdays = $derived.by(() => {
    return getWeekdays({
      months: this.months,
      formatter: this.formatter,
      weekdayFormat: this.opts.weekdayFormat.current
    });
  });

  initialPlaceholderYear = $derived.by(() => untrack(() => this.opts.placeholder.current.year));
  defaultYears = $derived.by(() => {
    return getDefaultYears({
      minValue: this.opts.minValue.current,
      maxValue: this.opts.maxValue.current,
      placeholderYear: this.initialPlaceholderYear
    });
  });

  #setupInitialFocusEffect() {
    $effect(() => {
      const initialFocus = untrack(() => this.opts.initialFocus.current);
      if (initialFocus) {
        const firstFocusedDay = this.opts.ref.current?.querySelector<HTMLElement>('[data-focused]');
        firstFocusedDay?.focus();
      }
    });
  }

  #setupAccessibleHeadingEffect() {
    $effect(() => {
      if (!this.opts.ref.current) return;
      const removeHeading = createAccessibleHeading({
        calendarNode: this.opts.ref.current,
        label: this.fullCalendarLabel,
        accessibleHeadingId: this.accessibleHeadingId
      });
      return removeHeading;
    });
  }

  #setupFormatterEffect() {
    $effect.pre(() => {
      if (this.formatter.getLocale() === this.opts.locale.current) return;
      this.formatter.setLocale(this.opts.locale.current);
    });
  }

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

  isNextButtonDisabled = $derived.by(() => {
    return getIsNextButtonDisabled({
      maxValue: this.opts.maxValue.current,
      months: this.months,
      disabled: this.opts.disabled.current
    });
  });

  isPrevButtonDisabled = $derived.by(() => {
    return getIsPrevButtonDisabled({
      minValue: this.opts.minValue.current,
      months: this.months,
      disabled: this.opts.disabled.current
    });
  });

  isInvalid = $derived.by(() => {
    const value = this.opts.value.current;
    const isDateDisabled = this.opts.isDateDisabled.current;
    const isDateUnavailable = this.opts.isDateUnavailable.current;
    if (Array.isArray(value)) {
      if (!value.length) return false;
      for (const date of value) {
        if (isDateDisabled(date)) return true;
        if (isDateUnavailable(date)) return true;
      }
    } else {
      if (!value) return false;
      if (isDateDisabled(value)) return true;
      if (isDateUnavailable(value)) return true;
    }
    return false;
  });

  headingValue = $derived.by(() => {
    void this.opts.monthFormat.current;
    void this.opts.yearFormat.current;
    return getCalendarHeadingValue({
      months: this.months,
      formatter: this.formatter,
      locale: this.opts.locale.current
    });
  });

  fullCalendarLabel = $derived.by(() => `${this.opts.calendarLabel.current} ${this.headingValue}`);

  isOutsideVisibleMonths = (date: DateValue) => {
    return !this.visibleMonths.some((month) => isSameMonth(date, month));
  };

  isDateDisabled = (date: DateValue) => {
    if (this.opts.isDateDisabled.current(date) || this.opts.disabled.current) return true;
    const minValue = this.opts.minValue.current;
    const maxValue = this.opts.maxValue.current;
    if (minValue && isBefore(date, minValue)) return true;
    if (maxValue && isBefore(maxValue, date)) return true;
    return false;
  };

  isDateSelected = (date: DateValue) => {
    const value = this.opts.value.current;
    if (Array.isArray(value)) {
      return value.some((d) => isSameDay(d, date));
    }
    if (!value) return false;
    return isSameDay(value, date);
  };

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

  #isMultipleSelectionValid(selectedDates: DateValue[]) {
    if (this.opts.type.current !== 'multiple') return true;
    if (!this.opts.maxDays.current) return true;
    const selectedCount = selectedDates.length;
    if (this.opts.maxDays.current && selectedCount > this.opts.maxDays.current) return false;
    return true;
  }

  handleCellClick = (_: Event, date: DateValue) => {
    if (this.opts.readonly.current || this.opts.isDateDisabled.current?.(date) || this.opts.isDateUnavailable.current?.(date)) {
      return;
    }
    const prev = this.opts.value.current;
    const multiple = this.opts.type.current === 'multiple';
    if (multiple) {
      if (Array.isArray(prev) || prev === undefined) {
        this.opts.value.current = this.handleMultipleUpdate(prev, date);
      }
    } else if (!Array.isArray(prev)) {
      const next = this.handleSingleUpdate(prev, date);
      if (!next) {
        this.announcer.announce('Selected date is now empty.', 'polite', 5000);
      } else {
        this.announcer.announce(`Selected Date: ${this.formatter.selectedDate(next, false)}`, 'polite');
      }
      this.opts.value.current = getDateWithPreviousTime(next, prev);
      if (next !== undefined) {
        this.opts.onDateSelect?.();
      }
    }
  };

  handleMultipleUpdate = (prev: DateValue[] | undefined, date: DateValue): DateValue[] | undefined => {
    if (!prev) {
      const newSelection = [date];
      return this.#isMultipleSelectionValid(newSelection) ? newSelection : [date];
    }
    const index = prev.findIndex((d) => isSameDay(d, date));
    const preventDeselect = this.opts.preventDeselect.current;
    if (index === -1) {
      const newSelection = [...prev, date];
      if (this.#isMultipleSelectionValid(newSelection)) {
        return newSelection;
      }
      return [date];
    }
    if (preventDeselect) {
      return prev;
    }
    const next = prev.filter((d) => !isSameDay(d, date));
    if (!next.length) {
      this.opts.placeholder.current = date;
      return undefined;
    }
    return next;
  };

  handleSingleUpdate = (prev: DateValue | undefined, date: DateValue): DateValue | undefined => {
    if (!prev) return date;
    const preventDeselect = this.opts.preventDeselect.current;
    if (!preventDeselect && isSameDay(prev, date)) {
      this.opts.placeholder.current = date;
      return undefined;
    }
    return date;
  };

  onkeydown = (event: KeyboardEvent) => {
    handleCalendarKeydown({
      event,
      handleCellClick: this.handleCellClick,
      shiftFocus: this.shiftFocus,
      placeholderValue: this.opts.placeholder.current
    });
  };

  snippetProps = $derived.by(() => ({
    months: this.months,
    weekdays: this.weekdays
  }));

  getBitsAttr = (part: string) => {
    return calendarAttrs.getAttr(part);
  };

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
}

export type CalendarHeadingStateOpts = {
  id: ReadableBox<string>;
  ref: WritableBox<HTMLElement | null>;
};

export class CalendarHeadingState {
  static create(opts: CalendarHeadingStateOpts) {
    return new CalendarHeadingState(opts, CalendarRootContext.get());
  }

  opts: CalendarHeadingStateOpts;
  root: CalendarRootState;
  attachment: ReturnType<typeof attachRef<HTMLElement>>;

  constructor(opts: CalendarHeadingStateOpts, root: CalendarRootState) {
    this.opts = opts;
    this.root = root;
    this.attachment = attachRef(this.opts.ref);
  }

  props = $derived.by(() => ({
    id: this.opts.id.current,
    'aria-hidden': boolToStrTrueOrUndef(true),
    'data-disabled': boolToEmptyStrOrUndef(this.root.opts.disabled.current),
    'data-readonly': boolToEmptyStrOrUndef(this.root.opts.readonly.current),
    [this.root.getBitsAttr('heading')]: '',
    ...this.attachment
  }));
}

export type CalendarCellStateOpts = {
  id: ReadableBox<string>;
  ref: WritableBox<HTMLElement | null>;
  date: ReadableBox<DateValue>;
  month: ReadableBox<DateValue>;
};

export const CalendarCellContext = new Context<CalendarCellState>('Calendar.Cell | RangeCalendar.Cell');

export class CalendarCellState {
  static create(opts: CalendarCellStateOpts) {
    return CalendarCellContext.set(new CalendarCellState(opts, CalendarRootContext.get()));
  }

  opts: CalendarCellStateOpts;
  root: CalendarRootState;
  attachment: ReturnType<typeof attachRef<HTMLElement>>;

  cellDate = $derived.by(() => toDate(this.opts.date.current));
  isUnavailable = $derived.by(() => this.root.opts.isDateUnavailable.current(this.opts.date.current));
  isDateToday = $derived.by(() => isToday(this.opts.date.current, getLocalTimeZone()));
  isOutsideMonth = $derived.by(() => !isSameMonth(this.opts.date.current, this.opts.month.current));
  isOutsideVisibleMonths = $derived.by(() => this.root.isOutsideVisibleMonths(this.opts.date.current));
  isDisabled = $derived.by(
    () => this.root.isDateDisabled(this.opts.date.current) || (this.isOutsideMonth && this.root.opts.disableDaysOutsideMonth.current)
  );
  isFocusedDate = $derived.by(() => isSameDay(this.opts.date.current, this.root.opts.placeholder.current));
  isSelectedDate = $derived.by(() => this.root.isDateSelected(this.opts.date.current));
  labelText = $derived.by(() =>
    this.root.formatter.custom(this.cellDate, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
  );

  constructor(opts: CalendarCellStateOpts, root: CalendarRootState) {
    this.opts = opts;
    this.root = root;
    this.attachment = attachRef(this.opts.ref);
  }

  snippetProps = $derived.by(() => ({
    disabled: this.isDisabled,
    unavailable: this.isUnavailable,
    selected: this.isSelectedDate,
    day: `${this.opts.date.current.day}`
  }));

  ariaDisabled = $derived.by(() => {
    return this.isDisabled || (this.isOutsideMonth && this.root.opts.disableDaysOutsideMonth.current) || this.isUnavailable;
  });

  sharedDataAttrs = $derived.by(() => ({
    'data-unavailable': boolToEmptyStrOrUndef(this.isUnavailable),
    'data-today': this.isDateToday ? '' : undefined,
    'data-outside-month': this.isOutsideMonth ? '' : undefined,
    'data-outside-visible-months': this.isOutsideVisibleMonths ? '' : undefined,
    'data-focused': this.isFocusedDate ? '' : undefined,
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

export type CalendarDayStateOpts = {
  id: ReadableBox<string>;
  ref: WritableBox<HTMLElement | null>;
};

export class CalendarDayState {
  static create(opts: CalendarDayStateOpts) {
    return new CalendarDayState(opts, CalendarCellContext.get());
  }

  opts: CalendarDayStateOpts;
  cell: CalendarCellState;
  attachment: ReturnType<typeof attachRef<HTMLElement>>;

  constructor(opts: CalendarDayStateOpts, cell: CalendarCellState) {
    this.opts = opts;
    this.cell = cell;
    this.attachment = attachRef(this.opts.ref);
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
    ...this.attachment
  }));
}

export type CalendarNextButtonStateOpts = {
  id: ReadableBox<string>;
  ref: WritableBox<HTMLElement | null>;
};

export class CalendarNextButtonState {
  static create(opts: CalendarNextButtonStateOpts) {
    return new CalendarNextButtonState(opts, CalendarRootContext.get());
  }

  opts: CalendarNextButtonStateOpts;
  root: CalendarRootState;
  attachment: ReturnType<typeof attachRef<HTMLElement>>;
  isDisabled = $derived.by(() => this.root.isNextButtonDisabled);

  constructor(opts: CalendarNextButtonStateOpts, root: CalendarRootState) {
    this.opts = opts;
    this.root = root;
    this.attachment = attachRef(this.opts.ref);
  }

  onclick = () => {
    if (this.isDisabled) return;
    this.root.nextPage();
  };

  props = $derived.by(() => ({
    id: this.opts.id.current,
    role: 'button',
    type: 'button' as const,
    'aria-label': 'Next',
    'aria-disabled': boolToStr(this.isDisabled),
    'data-disabled': boolToEmptyStrOrUndef(this.isDisabled),
    disabled: this.isDisabled,
    [this.root.getBitsAttr('next-button')]: '',
    onclick: this.onclick,
    ...this.attachment
  }));
}

export type CalendarPrevButtonStateOpts = {
  id: ReadableBox<string>;
  ref: WritableBox<HTMLElement | null>;
};

export class CalendarPrevButtonState {
  static create(opts: CalendarPrevButtonStateOpts) {
    return new CalendarPrevButtonState(opts, CalendarRootContext.get());
  }

  opts: CalendarPrevButtonStateOpts;
  root: CalendarRootState;
  attachment: ReturnType<typeof attachRef<HTMLElement>>;
  isDisabled = $derived.by(() => this.root.isPrevButtonDisabled);

  constructor(opts: CalendarPrevButtonStateOpts, root: CalendarRootState) {
    this.opts = opts;
    this.root = root;
    this.attachment = attachRef(this.opts.ref);
  }

  onclick = () => {
    if (this.isDisabled) return;
    this.root.prevPage();
  };

  props = $derived.by(() => ({
    id: this.opts.id.current,
    role: 'button',
    type: 'button' as const,
    'aria-label': 'Previous',
    'aria-disabled': boolToStr(this.isDisabled),
    'data-disabled': boolToEmptyStrOrUndef(this.isDisabled),
    disabled: this.isDisabled,
    [this.root.getBitsAttr('prev-button')]: '',
    onclick: this.onclick,
    ...this.attachment
  }));
}

type SimplePartStateOpts = {
  id: ReadableBox<string>;
  ref: WritableBox<HTMLElement | null>;
};

function createSimplePartState(part: string) {
  return class {
    static create(opts: SimplePartStateOpts) {
      // biome-ignore lint/complexity/noThisInStatic: mirrors the class pattern used throughout this file
      return new this(opts, CalendarRootContext.get());
    }

    opts: SimplePartStateOpts;
    root: CalendarRootState;
    attachment: ReturnType<typeof attachRef<HTMLElement>>;

    constructor(opts: SimplePartStateOpts, root: CalendarRootState) {
      this.opts = opts;
      this.root = root;
      this.attachment = attachRef(this.opts.ref);
    }

    props = $derived.by(() => ({
      id: this.opts.id.current,
      'data-disabled': boolToEmptyStrOrUndef(this.root.opts.disabled.current),
      'data-readonly': boolToEmptyStrOrUndef(this.root.opts.readonly.current),
      [this.root.getBitsAttr(part)]: '',
      ...this.attachment
    }));
  };
}

export class CalendarGridState extends createSimplePartState('grid') {}
export class CalendarGridBodyState extends createSimplePartState('grid-body') {}
export class CalendarGridHeadState extends createSimplePartState('grid-head') {}
export class CalendarGridRowState extends createSimplePartState('grid-row') {}
export class CalendarHeadCellState extends createSimplePartState('head-cell') {}
export class CalendarHeaderState extends createSimplePartState('header') {}

export type CalendarMonthSelectStateOpts = {
  id: ReadableBox<string>;
  ref: WritableBox<HTMLElement | null>;
  months: ReadableBox<number[]>;
  monthFormat: ReadableBox<Intl.DateTimeFormatOptions['month'] | ((month: number) => string)>;
  disabled: ReadableBox<boolean>;
};

export class CalendarMonthSelectState {
  static create(opts: CalendarMonthSelectStateOpts) {
    return new CalendarMonthSelectState(opts, CalendarRootContext.get());
  }

  opts: CalendarMonthSelectStateOpts;
  root: CalendarRootState;
  attachment: ReturnType<typeof attachRef<HTMLElement>>;

  constructor(opts: CalendarMonthSelectStateOpts, root: CalendarRootState) {
    this.opts = opts;
    this.root = root;
    this.attachment = attachRef(this.opts.ref);
  }

  monthItems = $derived.by(() => {
    void this.root.opts.locale.current;
    const monthNumbers = this.opts.months.current;
    const monthFormat = this.opts.monthFormat.current;
    const months: Array<{ value: number; label: string }> = [];
    for (const month of monthNumbers) {
      const date = this.root.opts.placeholder.current.set({ month });
      const label =
        typeof monthFormat === 'function' ? monthFormat(month) : this.root.formatter.custom(toDate(date), { month: monthFormat });
      months.push({ value: month, label });
    }
    return months;
  });

  currentMonth = $derived.by(() => this.root.opts.placeholder.current.month);
  isDisabled = $derived.by(() => this.root.opts.disabled.current || this.opts.disabled.current);

  snippetProps = $derived.by(() => ({
    monthItems: this.monthItems,
    selectedMonthItem: this.monthItems.find((month) => month.value === this.currentMonth) as { value: number; label: string }
  }));

  onchange = (event: Event & { currentTarget: HTMLSelectElement }) => {
    if (this.isDisabled) return;
    const month = Number.parseInt(event.currentTarget.value, 10);
    if (!Number.isNaN(month)) {
      this.root.opts.placeholder.current = this.root.opts.placeholder.current.set({ month });
    }
  };

  props = $derived.by(() => ({
    id: this.opts.id.current,
    value: this.currentMonth,
    disabled: this.isDisabled,
    'data-disabled': boolToEmptyStrOrUndef(this.isDisabled),
    [this.root.getBitsAttr('month-select')]: '',
    onchange: this.onchange,
    ...this.attachment
  }));
}

export type CalendarYearSelectStateOpts = {
  id: ReadableBox<string>;
  ref: WritableBox<HTMLElement | null>;
  years: ReadableBox<number[] | undefined>;
  yearFormat: ReadableBox<Intl.DateTimeFormatOptions['year'] | ((year: number) => string)>;
  disabled: ReadableBox<boolean>;
};

export class CalendarYearSelectState {
  static create(opts: CalendarYearSelectStateOpts) {
    return new CalendarYearSelectState(opts, CalendarRootContext.get());
  }

  opts: CalendarYearSelectStateOpts;
  root: CalendarRootState;
  attachment: ReturnType<typeof attachRef<HTMLElement>>;

  constructor(opts: CalendarYearSelectStateOpts, root: CalendarRootState) {
    this.opts = opts;
    this.root = root;
    this.attachment = attachRef(this.opts.ref);
  }

  years = $derived.by(() => {
    if (this.opts.years.current && this.opts.years.current.length) return this.opts.years.current;
    return this.root.defaultYears;
  });

  yearItems = $derived.by(() => {
    void this.root.opts.locale.current;
    const yearFormat = this.opts.yearFormat.current;
    const localYears: Array<{ value: number; label: string }> = [];
    for (const year of this.years) {
      const date = this.root.opts.placeholder.current.set({ year });
      const label = typeof yearFormat === 'function' ? yearFormat(year) : this.root.formatter.custom(toDate(date), { year: yearFormat });
      localYears.push({ value: year, label });
    }
    return localYears;
  });

  currentYear = $derived.by(() => this.root.opts.placeholder.current.year);
  isDisabled = $derived.by(() => this.root.opts.disabled.current || this.opts.disabled.current);

  snippetProps = $derived.by(() => ({
    yearItems: this.yearItems,
    selectedYearItem: this.yearItems.find((year) => year.value === this.currentYear) as { value: number; label: string }
  }));

  onchange = (event: Event & { currentTarget: HTMLSelectElement }) => {
    if (this.isDisabled) return;
    const year = Number.parseInt(event.currentTarget.value, 10);
    if (!Number.isNaN(year)) {
      this.root.opts.placeholder.current = this.root.opts.placeholder.current.set({ year });
    }
  };

  props = $derived.by(() => ({
    id: this.opts.id.current,
    value: this.currentYear,
    disabled: this.isDisabled,
    'data-disabled': boolToEmptyStrOrUndef(this.isDisabled),
    [this.root.getBitsAttr('year-select')]: '',
    onchange: this.onchange,
    ...this.attachment
  }));
}
