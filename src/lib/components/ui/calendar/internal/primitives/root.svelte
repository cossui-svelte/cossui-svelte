<script lang="ts">
  import { watch } from 'runed';
  import { boxWith, mergeProps } from 'svelte-toolbelt';
  import type { DateValue } from '@internationalized/date';
  import { CalendarRootState } from '../calendar-state.svelte';
  import type { CalendarRootProps } from '../types';
  import { useId } from '../ids';
  import { getDefaultDate } from '../date-utils';
  import { resolveLocaleProp } from '../prop-resolvers';

  const noop = () => {};

  let {
    child,
    children,
    id = useId(),
    ref = $bindable(null),
    value = $bindable(),
    onValueChange = noop,
    placeholder = $bindable(),
    onPlaceholderChange = noop,
    weekdayFormat = 'narrow',
    weekStartsOn,
    pagedNavigation = false,
    isDateDisabled = () => false,
    isDateUnavailable = () => false,
    fixedWeeks = false,
    numberOfMonths = 1,
    locale,
    calendarLabel = 'Event',
    disabled = false,
    readonly = false,
    minValue = undefined,
    maxValue = undefined,
    preventDeselect = false,
    type,
    disableDaysOutsideMonth = true,
    initialFocus = false,
    maxDays,
    monthFormat = 'long',
    yearFormat = 'numeric',
    ...restProps
  }: CalendarRootProps = $props();

  const defaultPlaceholder = getDefaultDate({ defaultValue: value, minValue, maxValue });

  function handleDefaultPlaceholder() {
    if (placeholder !== undefined) return;
    placeholder = defaultPlaceholder;
  }
  handleDefaultPlaceholder();
  watch.pre(
    () => placeholder,
    () => {
      handleDefaultPlaceholder();
    }
  );

  function handleDefaultValue() {
    if (value !== undefined) return;
    value = type === 'single' ? undefined : [];
  }
  handleDefaultValue();
  watch.pre(
    () => value,
    () => {
      handleDefaultValue();
    }
  );

  const rootState = CalendarRootState.create({
    id: boxWith(() => id!),
    ref: boxWith(
      () => ref,
      (v) => (ref = v)
    ),
    weekdayFormat: boxWith(() => weekdayFormat),
    weekStartsOn: boxWith(() => weekStartsOn),
    pagedNavigation: boxWith(() => pagedNavigation),
    isDateDisabled: boxWith(() => isDateDisabled),
    isDateUnavailable: boxWith(() => isDateUnavailable),
    fixedWeeks: boxWith(() => fixedWeeks),
    numberOfMonths: boxWith(() => numberOfMonths),
    locale: resolveLocaleProp(() => locale),
    calendarLabel: boxWith(() => calendarLabel),
    readonly: boxWith(() => readonly),
    disabled: boxWith(() => disabled),
    minValue: boxWith(() => minValue),
    maxValue: boxWith(() => maxValue),
    disableDaysOutsideMonth: boxWith(() => disableDaysOutsideMonth),
    initialFocus: boxWith(() => initialFocus),
    maxDays: boxWith(() => maxDays),
    placeholder: boxWith(
      () => placeholder as DateValue,
      (v) => {
        placeholder = v;
        onPlaceholderChange(v as DateValue);
      }
    ),
    preventDeselect: boxWith(() => preventDeselect),
    value: boxWith(
      () => value,
      (v) => {
        value = v;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- discriminated single/multiple onValueChange signature can't be narrowed here
        onValueChange(v as any);
      }
    ),
    type: boxWith(() => type as 'single' | 'multiple'),
    monthFormat: boxWith(() => monthFormat),
    yearFormat: boxWith(() => yearFormat),
    defaultPlaceholder
  });

  const mergedProps = $derived(mergeProps(restProps, rootState.props));
</script>

{#if child}
  {@render child({ props: mergedProps, ...rootState.snippetProps })}
{:else}
  <div {...mergedProps}>
    {@render children?.(rootState.snippetProps)}
  </div>
{/if}
