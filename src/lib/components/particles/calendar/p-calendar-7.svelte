<script lang="ts">
  import { type DateValue, getLocalTimeZone, today } from "@internationalized/date";
  import { RangeCalendar } from "$lib/components/ui/range-calendar";

  const todayValue = today(getLocalTimeZone());
  const blockedRange1 = { from: todayValue.add({ days: 14 }), to: todayValue.add({ days: 16 }) };
  const blockedRange2 = { from: todayValue.add({ days: 23 }), to: todayValue.add({ days: 24 }) };

  function isDateDisabled(date: DateValue): boolean {
    if (date.compare(todayValue) <= 0) return true;
    const weekday = date.toDate(getLocalTimeZone()).getDay();
    if (weekday === 0 || weekday === 6) return true;
    if (date.compare(blockedRange1.from) >= 0 && date.compare(blockedRange1.to) <= 0) return true;
    if (date.compare(blockedRange2.from) >= 0 && date.compare(blockedRange2.to) <= 0) return true;
    return false;
  }
</script>

<RangeCalendar excludeDisabled {isDateDisabled} />
