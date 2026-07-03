<script lang="ts">
  import { type DateValue, getLocalTimeZone, today } from "@internationalized/date";
  import { Calendar as CalendarPrimitive } from "bits-ui";
  import * as Calendar from "$lib/components/ui/calendar";

  let placeholder = $state<DateValue>(today(getLocalTimeZone()));
  let value = $state<DateValue | undefined>(today(getLocalTimeZone()));
</script>

<CalendarPrimitive.Root
  bind:placeholder
  bind:value={value as never}
  class="cn-calendar bg-background w-fit [--cell-size:--spacing(10)] sm:[--cell-size:--spacing(9)]"
  type="single"
  weekdayFormat="short"
>
  {#snippet children({ months, weekdays })}
    <Calendar.Months>
      <Calendar.Nav class="justify-end">
        <Calendar.PrevButton />
        <Calendar.NextButton />
      </Calendar.Nav>
      {#each months as month (month)}
        <Calendar.Month>
          <Calendar.Header class="me-[calc(var(--cell-size)*2)] ms-0 justify-start">
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
