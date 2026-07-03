<script lang="ts">
  import { type DateValue, getLocalTimeZone, today } from "@internationalized/date";
  import { RangeCalendar as RangeCalendarPrimitive } from "bits-ui";
  import * as Calendar from "$lib/components/ui/calendar";
  import { Cell as RangeCalendarCell, Day as RangeCalendarDay } from "$lib/components/ui/range-calendar";

  const todayValue = today(getLocalTimeZone());
  let placeholder = $state<DateValue>(todayValue);
  let value = $state<{ end: DateValue | undefined; start: DateValue | undefined } | undefined>({
    end: todayValue.add({ days: 25 }),
    start: todayValue,
  });
</script>

<RangeCalendarPrimitive.Root
  bind:placeholder
  bind:value={value as never}
  class="cn-calendar bg-background w-fit [--cell-size:--spacing(10)] [&_[data-outside-month]]:invisible sm:[--cell-size:--spacing(9)]"
  numberOfMonths={2}
  pagedNavigation
  weekdayFormat="short"
>
  {#snippet children({ months, weekdays })}
    <Calendar.Months class="gap-8">
      <Calendar.Nav>
        <Calendar.PrevButton />
        <Calendar.NextButton />
      </Calendar.Nav>
      {#each months as month (month)}
        <Calendar.Month
          class="relative before:absolute before:bg-border first-of-type:before:hidden max-sm:before:-top-2 max-sm:before:inset-x-2 max-sm:before:h-px sm:before:-left-4 sm:before:inset-y-2 sm:before:w-px"
        >
          <Calendar.Header>
            <Calendar.Caption
              bind:placeholder
              captionLayout="label"
              locale="en-US"
              month={month.value}
              monthFormat="long"
              monthIndex={0}
              months={undefined}
              yearFormat="numeric"
              years={undefined}
            />
          </Calendar.Header>
          <Calendar.Grid>
            <Calendar.GridHead>
              <Calendar.GridRow class="select-none">
                {#each weekdays as weekday, i (i)}
                  <Calendar.HeadCell>{weekday.slice(0, 2)}</Calendar.HeadCell>
                {/each}
              </Calendar.GridRow>
            </Calendar.GridHead>
            <Calendar.GridBody>
              {#each month.weeks as weekDates (weekDates)}
                <Calendar.GridRow class="mt-2 w-full">
                  {#each weekDates as date (date)}
                    <RangeCalendarCell {date} month={month.value}>
                      <RangeCalendarDay />
                    </RangeCalendarCell>
                  {/each}
                </Calendar.GridRow>
              {/each}
            </Calendar.GridBody>
          </Calendar.Grid>
        </Calendar.Month>
      {/each}
    </Calendar.Months>
  {/snippet}
</RangeCalendarPrimitive.Root>
