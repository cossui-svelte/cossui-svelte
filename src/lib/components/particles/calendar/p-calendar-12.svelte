<script lang="ts">
  import { type DateValue, getLocalTimeZone, today } from "@internationalized/date";
  import { Calendar as CalendarPrimitive } from "bits-ui";
  import * as Calendar from "$lib/components/ui/calendar";

  let placeholder = $state<DateValue>(today(getLocalTimeZone()));
  let value = $state<DateValue | undefined>(today(getLocalTimeZone()));

  function getWeekNumber(date: DateValue): number {
    const d = date.toDate(getLocalTimeZone());
    const target = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const dayNr = (target.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNr + 3);
    const firstThursday = target.getTime();
    target.setMonth(0, 1);
    if (target.getDay() !== 4) {
      target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7));
    }
    return 1 + Math.round((firstThursday - target.getTime()) / (7 * 24 * 60 * 60 * 1000));
  }
</script>

<CalendarPrimitive.Root
  bind:placeholder
  bind:value={value as never}
  class="cn-calendar bg-background w-fit [--cell-size:--spacing(10)] sm:[--cell-size:--spacing(9)]"
  fixedWeeks
  type="single"
  weekdayFormat="short"
>
  {#snippet children({ months, weekdays })}
    <Calendar.Months>
      <Calendar.Nav>
        <Calendar.PrevButton />
        <Calendar.NextButton />
      </Calendar.Nav>
      {#each months as month (month)}
        <Calendar.Month>
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
                <Calendar.HeadCell>
                  <span class="inline-flex size-(--cell-size) items-center justify-center">Wk</span>
                </Calendar.HeadCell>
                {#each weekdays as weekday, i (i)}
                  <Calendar.HeadCell>{weekday.slice(0, 2)}</Calendar.HeadCell>
                {/each}
              </Calendar.GridRow>
            </Calendar.GridHead>
            <Calendar.GridBody>
              {#each month.weeks as weekDates (weekDates)}
                <Calendar.GridRow class="mt-2 w-full">
                  <th class="text-muted-foreground w-(--cell-size) text-[0.8rem] font-normal">
                    <span class="inline-flex size-(--cell-size) items-center justify-center">
                      {getWeekNumber(weekDates[0])}
                    </span>
                  </th>
                  {#each weekDates as date (date)}
                    <Calendar.Cell {date} month={month.value}>
                      <Calendar.Day />
                    </Calendar.Cell>
                  {/each}
                </Calendar.GridRow>
              {/each}
            </Calendar.GridBody>
          </Calendar.Grid>
        </Calendar.Month>
      {/each}
    </Calendar.Months>
  {/snippet}
</CalendarPrimitive.Root>
