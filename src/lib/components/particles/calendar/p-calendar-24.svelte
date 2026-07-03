<script lang="ts">
  import { type DateValue, getLocalTimeZone, today } from "@internationalized/date";
  import { Calendar as CalendarPrimitive } from "bits-ui";
  import * as Calendar from "$lib/components/ui/calendar";
  import { cn } from "$lib/utils";

  const GOOD_PRICE_THRESHOLD = 100;

  const todayValue = today(getLocalTimeZone());
  let placeholder = $state<DateValue>(todayValue);
  let value = $state<DateValue | undefined>(todayValue);

  const mockPriceData: Record<string, number> = {};
  for (let i = 0; i < 180; i++) {
    const date = todayValue.add({ days: i });
    mockPriceData[date.toString()] = Math.floor(Math.random() * (200 - 80 + 1)) + 80;
  }

  function isDateDisabled(d: DateValue): boolean {
    return mockPriceData[d.toString()] === undefined;
  }
</script>

<CalendarPrimitive.Root
  bind:placeholder
  bind:value={value as never}
  class="cn-calendar bg-background w-fit [--cell-size:--spacing(10)] [&_[data-outside-month]]:invisible sm:[--cell-size:--spacing(9)]"
  {isDateDisabled}
  numberOfMonths={2}
  pagedNavigation
  type="single"
  weekdayFormat="short"
>
  {#snippet children({ months, weekdays })}
    <Calendar.Months class="gap-8 sm:flex-col md:flex-row">
      <Calendar.Nav>
        <Calendar.PrevButton />
        <Calendar.NextButton />
      </Calendar.Nav>
      {#each months as month (month)}
        <Calendar.Month
          class="relative before:absolute before:bg-border first-of-type:before:hidden max-md:before:-top-4 max-md:before:inset-x-2 max-md:before:h-px md:before:-left-4 md:before:inset-y-2 md:before:w-px"
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
                  <Calendar.HeadCell class="w-12">{weekday.slice(0, 2)}</Calendar.HeadCell>
                {/each}
              </Calendar.GridRow>
            </Calendar.GridHead>
            <Calendar.GridBody>
              {#each month.weeks as weekDates (weekDates)}
                <Calendar.GridRow class="mt-2 w-full">
                  {#each weekDates as date (date)}
                    {@const price = mockPriceData[date.toString()]}
                    {@const isGoodPrice = price !== undefined && price < GOOD_PRICE_THRESHOLD}
                    <Calendar.Cell {date} month={month.value}>
                      <Calendar.Day class="size-12">
                        {#snippet children({ day })}
                          <span class="flex flex-col">
                            {day}
                            {#if price}
                              <span
                                class={cn(
                                  "font-normal text-xs",
                                  isGoodPrice
                                    ? "text-emerald-500"
                                    : "in-data-selected:text-primary-foreground/70 text-muted-foreground"
                                )}
                              >
                                ${price}
                              </span>
                            {/if}
                          </span>
                        {/snippet}
                      </Calendar.Day>
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
