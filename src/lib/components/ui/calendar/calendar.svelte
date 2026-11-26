<script module lang="ts">
  import type { DateValue } from '@internationalized/date';
  import type { Snippet } from 'svelte';
  import type { ButtonVariant } from '#lib/components/ui/button/index.js';
  import type { RenameTypeToMode, WithoutChildrenOrChild } from '#lib/utils.js';
  import type * as CalendarPrimitiveTypes from './internal';
  import type * as RangeCalendarPrimitiveTypes from './internal/range';
  import type { DateRange } from './internal/range/types';

  export type CalendarMode = 'single' | 'multiple' | 'range';
  export type { DateRange };

  type CalendarSingleOrMultipleProps = WithoutChildrenOrChild<
    RenameTypeToMode<CalendarPrimitiveTypes.RootProps>
  >;
  type CalendarRangeProps = WithoutChildrenOrChild<RangeCalendarPrimitiveTypes.RootProps> & {
    mode: 'range';
  };

  export type Props = (CalendarSingleOrMultipleProps | CalendarRangeProps) & {
    buttonVariant?: ButtonVariant;
    captionLayout?: 'dropdown' | 'dropdown-months' | 'dropdown-years' | 'label';
    months?: CalendarPrimitiveTypes.MonthSelectProps['months'];
    years?: CalendarPrimitiveTypes.YearSelectProps['years'];
    monthFormat?: CalendarPrimitiveTypes.MonthSelectProps['monthFormat'];
    yearFormat?: CalendarPrimitiveTypes.YearSelectProps['yearFormat'];
    day?: Snippet<[{ day: DateValue; outsideMonth: boolean }]>;
    /**
     * When `false`, days that fall outside the currently displayed month are
     * not rendered at all (the cell stays empty, preserving grid alignment).
     * Defaults to `true`, matching the React `Calendar`/DayPicker default.
     *
     * This is distinct from `disableDaysOutsideMonth`, which only disables
     * interactivity/styling of outside days without hiding them.
     */
    showOutsideDays?: boolean;
    /** Keep six week rows so the height stays stable between months. Defaults to `true`. */
    fixedWeeks?: boolean;
  };
</script>

<script lang="ts">
  import { isEqualMonth } from '@internationalized/date';
  import { cn } from '#lib/utils.js';
  import RangeCalendarCell from './calendar-range-cell.svelte';
  import RangeCalendarDay from './calendar-range-day.svelte';
  import * as Calendar from './index.js';
  import * as CalendarPrimitive from './internal';
  import * as RangeCalendarPrimitive from './internal/range';

  let {
    ref = $bindable(null),
    value = $bindable(),
    placeholder = $bindable(),
    class: className,
    weekdayFormat = 'short',
    buttonVariant = 'ghost',
    captionLayout = 'label',
    locale = 'en-US',
    months: monthsProp,
    years,
    monthFormat: monthFormatProp,
    yearFormat = 'numeric',
    day,
    disableDaysOutsideMonth = false,
    showOutsideDays = true,
    fixedWeeks = true,
    mode,
    ...restProps
  }: Props = $props();

  const monthFormat = $derived.by(() => {
    if (monthFormatProp) return monthFormatProp;
    if (captionLayout.startsWith('dropdown')) return 'short';
    return 'long';
  });

  const rootClass = $derived(
    cn(
      'bg-background group/calendar w-fit [--cell-radius:var(--radius-md)] [--cell-size:--spacing(10)] in-data-[slot=card-content]:bg-transparent in-data-[slot=popover-content]:bg-transparent sm:[--cell-size:--spacing(9)]',
      className
    )
  );

  // The day/cell primitives differ between range mode (reusing the
  // the range primitives' own selection state/styling) and single/multiple mode
  // (this component's own state), but share an identical external prop
  // shape, so they can be swapped in as plain component references.
  const CellComponent = $derived(mode === 'range' ? RangeCalendarCell : Calendar.Cell);
  const DayComponent = $derived(mode === 'range' ? RangeCalendarDay : Calendar.Day);
</script>

{#snippet monthsBody({
  months,
  weekdays
}: {
  months: { value: DateValue; weeks: DateValue[][] }[];
  weekdays: string[];
})}
  <Calendar.Months>
    <Calendar.Nav>
      <Calendar.PrevButton variant={buttonVariant} />
      <Calendar.NextButton variant={buttonVariant} />
    </Calendar.Nav>
    {#each months as month, monthIndex (month)}
      <Calendar.Month>
        <Calendar.Header>
          <Calendar.Caption
            {captionLayout}
            months={monthsProp}
            {monthFormat}
            {years}
            {yearFormat}
            month={month.value}
            bind:placeholder
            {locale}
            {monthIndex}
          />
        </Calendar.Header>
        <Calendar.Grid>
          <Calendar.GridHead>
            <Calendar.GridRow class="select-none">
              {#each weekdays as weekday, i (i)}
                <Calendar.HeadCell>
                  {weekday.slice(0, 2)}
                </Calendar.HeadCell>
              {/each}
            </Calendar.GridRow>
          </Calendar.GridHead>
          <Calendar.GridBody>
            {#each month.weeks as weekDates (weekDates)}
              <Calendar.GridRow class="mt-2 w-full">
                {#each weekDates as date (date)}
                  {@const outsideMonth = !isEqualMonth(date, month.value)}
                  <CellComponent {date} month={month.value}>
                    {#if showOutsideDays || !outsideMonth}
                      {#if day}
                        {@render day({ day: date, outsideMonth })}
                      {:else}
                        <DayComponent />
                      {/if}
                    {/if}
                  </CellComponent>
                {/each}
              </Calendar.GridRow>
            {/each}
          </Calendar.GridBody>
        </Calendar.Grid>
      </Calendar.Month>
    {/each}
  </Calendar.Months>
{/snippet}

{#if mode === 'range'}
  <RangeCalendarPrimitive.Root
    bind:value={value as never}
    bind:ref
    bind:placeholder
    {weekdayFormat}
    {disableDaysOutsideMonth}
    {fixedWeeks}
    class={rootClass}
    {locale}
    {monthFormat}
    {yearFormat}
    {...restProps as Record<string, unknown>}
  >
    {#snippet children(snippetProps)}
      {@render monthsBody(snippetProps)}
    {/snippet}
  </RangeCalendarPrimitive.Root>
{:else}
  <!--
  Discriminated Unions + Destructing (required for bindable) do not
  get along, so we shut typescript up by casting `value` to `never`.
  -->
  <CalendarPrimitive.Root
    bind:value={value as never}
    bind:ref
    bind:placeholder
    type={mode as never}
    {weekdayFormat}
    {disableDaysOutsideMonth}
    {fixedWeeks}
    class={rootClass}
    {locale}
    {monthFormat}
    {yearFormat}
    {...restProps as Record<string, unknown>}
  >
    {#snippet children(snippetProps)}
      {@render monthsBody(snippetProps)}
    {/snippet}
  </CalendarPrimitive.Root>
{/if}
