<script lang="ts">
  import { type DateValue, getLocalTimeZone, today } from "@internationalized/date";
  import { Calendar, Day } from "$lib/components/ui/calendar";
  import { cn } from "$lib/utils";

  const GOOD_PRICE_THRESHOLD = 100;

  const todayValue = today(getLocalTimeZone());
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

<Calendar
  bind:value
  class="**:data-outside-month:invisible [&>div]:gap-8 [&_th]:w-12 md:[&>div]:flex-row sm:[&>div]:flex-col"
  {isDateDisabled}
  numberOfMonths={2}
  pagedNavigation
  mode="single"
>
  {#snippet day({ day: date })}
    {@const price = mockPriceData[date.toString()]}
    {@const isGoodPrice = price !== undefined && price < GOOD_PRICE_THRESHOLD}
    <Day class="size-12">
      {#snippet children({ day: dayLabel })}
        <span class="flex flex-col">
          {dayLabel}
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
    </Day>
  {/snippet}
</Calendar>
