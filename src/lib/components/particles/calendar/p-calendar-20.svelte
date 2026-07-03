<script lang="ts">
  import { type DateValue, getLocalTimeZone, today } from "@internationalized/date";
  import { Button } from "$lib/components/ui/button";
  import { Calendar } from "$lib/components/ui/calendar";

  const todayValue = today(getLocalTimeZone());
  const yesterday = todayValue.subtract({ days: 1 });
  const lastWeek = todayValue.subtract({ days: 7 });
  const lastMonth = todayValue.subtract({ months: 1 });
  const lastYear = todayValue.subtract({ years: 1 });

  let placeholder = $state<DateValue>(todayValue);
  let date = $state<DateValue>(todayValue);

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
          date = todayValue;
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
          placeholder = yesterday;
        }}
        size="sm"
        variant="ghost"
      >
        Yesterday
      </Button>
      <Button
        class="w-full justify-start"
        onclick={() => {
          date = lastWeek;
          placeholder = lastWeek;
        }}
        size="sm"
        variant="ghost"
      >
        Last week
      </Button>
      <Button
        class="w-full justify-start"
        onclick={() => {
          date = lastMonth;
          placeholder = lastMonth;
        }}
        size="sm"
        variant="ghost"
      >
        Last month
      </Button>
      <Button
        class="w-full justify-start"
        onclick={() => {
          date = lastYear;
          placeholder = lastYear;
        }}
        size="sm"
        variant="ghost"
      >
        Last year
      </Button>
    </div>
  </div>
  <Calendar
    bind:placeholder
    bind:value={date}
    class="max-sm:pb-3 sm:ps-5"
    {isDateDisabled}
    type="single"
  />
</div>
