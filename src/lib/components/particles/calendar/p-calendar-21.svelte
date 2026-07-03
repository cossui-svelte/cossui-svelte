<script lang="ts">
  import {
    type DateValue,
    endOfMonth,
    endOfYear,
    getLocalTimeZone,
    startOfMonth,
    startOfYear,
    today,
  } from "@internationalized/date";
  import { Button } from "$lib/components/ui/button";
  import { RangeCalendar } from "$lib/components/ui/range-calendar";

  const todayValue = today(getLocalTimeZone());
  const yesterday = {
    end: todayValue.subtract({ days: 1 }),
    start: todayValue.subtract({ days: 1 }),
  };
  const last7Days = { end: todayValue, start: todayValue.subtract({ days: 6 }) };
  const last30Days = { end: todayValue, start: todayValue.subtract({ days: 29 }) };
  const monthToDate = { end: todayValue, start: startOfMonth(todayValue) };
  const lastMonthValue = todayValue.subtract({ months: 1 });
  const lastMonth = { end: endOfMonth(lastMonthValue), start: startOfMonth(lastMonthValue) };
  const yearToDate = { end: todayValue, start: startOfYear(todayValue) };
  const lastYearValue = todayValue.subtract({ years: 1 });
  const lastYear = { end: endOfYear(lastYearValue), start: startOfYear(lastYearValue) };

  let placeholder = $state<DateValue>(todayValue);
  let date = $state<{ end: DateValue | undefined; start: DateValue | undefined } | undefined>(last7Days);

  function isDateDisabled(d: DateValue): boolean {
    return d.compare(todayValue) > 0;
  }
</script>

<div class="flex max-sm:flex-col">
  <div class="relative py-1 ps-1 max-sm:order-1 max-sm:border-t">
    <div class="flex h-full flex-col sm:border-e sm:pe-3">
      <Button
        class="w-full justify-start"
        onclick={() => {
          date = { end: todayValue, start: todayValue };
          placeholder = todayValue;
        }}
        size="sm"
        variant="ghost"
      >
        Today
      </Button>
      <Button
        class="w-full justify-start"
        onclick={() => {
          date = yesterday;
          placeholder = yesterday.end;
        }}
        size="sm"
        variant="ghost"
      >
        Yesterday
      </Button>
      <Button
        class="w-full justify-start"
        onclick={() => {
          date = last7Days;
          placeholder = last7Days.end;
        }}
        size="sm"
        variant="ghost"
      >
        Last 7 days
      </Button>
      <Button
        class="w-full justify-start"
        onclick={() => {
          date = last30Days;
          placeholder = last30Days.end;
        }}
        size="sm"
        variant="ghost"
      >
        Last 30 days
      </Button>
      <Button
        class="w-full justify-start"
        onclick={() => {
          date = monthToDate;
          placeholder = monthToDate.end;
        }}
        size="sm"
        variant="ghost"
      >
        Month to date
      </Button>
      <Button
        class="w-full justify-start"
        onclick={() => {
          date = lastMonth;
          placeholder = lastMonth.end;
        }}
        size="sm"
        variant="ghost"
      >
        Last month
      </Button>
      <Button
        class="w-full justify-start"
        onclick={() => {
          date = yearToDate;
          placeholder = yearToDate.end;
        }}
        size="sm"
        variant="ghost"
      >
        Year to date
      </Button>
      <Button
        class="w-full justify-start"
        onclick={() => {
          date = lastYear;
          placeholder = lastYear.end;
        }}
        size="sm"
        variant="ghost"
      >
        Last year
      </Button>
    </div>
  </div>
  <RangeCalendar
    bind:placeholder
    class="max-sm:pb-3 sm:ps-5"
    {isDateDisabled}
    onValueChange={(newDate) => {
      if (newDate) date = newDate;
    }}
    value={date}
  />
</div>
