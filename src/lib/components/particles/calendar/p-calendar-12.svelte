<script lang="ts">
  import { type DateValue, getDayOfWeek, getLocalTimeZone, today } from "@internationalized/date";
  import { Calendar, Day } from "$lib/components/ui/calendar";

  let value = $state(today(getLocalTimeZone()));

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

<Calendar bind:value fixedWeeks type="single">
  {#snippet day({ day: date })}
    {@const isWeekStart = getDayOfWeek(date, "en-US") === 0}
    <Day class="relative">
      {#snippet children({ day: dayLabel })}
        {dayLabel}
        {#if isWeekStart}
          <span class="-top-1 pointer-events-none absolute left-0.5 text-[0.6rem] text-muted-foreground">
            {getWeekNumber(date)}
          </span>
        {/if}
      {/snippet}
    </Day>
  {/snippet}
</Calendar>
