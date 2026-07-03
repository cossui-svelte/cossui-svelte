<script lang="ts">
  import { CalendarDate, type DateValue, getLocalTimeZone, today } from "@internationalized/date";
  import { Calendar as CalendarPrimitive } from "bits-ui";
  import * as Calendar from "$lib/components/ui/calendar";
  import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from "$lib/components/ui/select";

  let value = $state<DateValue | undefined>(today(getLocalTimeZone()));
  let placeholder = $state<DateValue>(value ?? today(getLocalTimeZone()));

  const minValue = new CalendarDate(1930, 1, 1);
  const maxValue = new CalendarDate(2030, 12, 31);

  const monthItems = Array.from({ length: 12 }, (_, i) => ({
    label: new Date(2000, i, 1).toLocaleString("default", { month: "long" }),
    value: String(i + 1),
  }));
  const yearItems = Array.from({ length: maxValue.year - minValue.year + 1 }, (_, i) => {
    const y = minValue.year + i;
    return { label: String(y), value: String(y) };
  });
</script>

<CalendarPrimitive.Root
  bind:value={value as never}
  bind:placeholder
  class="cn-calendar bg-background w-fit [--cell-size:--spacing(10)] sm:[--cell-size:--spacing(9)]"
  {maxValue}
  {minValue}
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
            <div class="flex w-full items-center justify-center gap-1.5">
              <Select
                items={monthItems}
                onValueChange={(v: string) => {
                  if (!v) return;
                  placeholder = placeholder.set({ month: Number(v) });
                }}
                value={String(month.value.month)}
              >
                <SelectTrigger aria-label="Month" class="min-w-none"><SelectValue /></SelectTrigger>
                <SelectPopup>
                  {#each monthItems as item (item.value)}
                    <SelectItem value={item.value}>{item.label}</SelectItem>
                  {/each}
                </SelectPopup>
              </Select>
              <Select
                items={yearItems}
                onValueChange={(v: string) => {
                  if (!v) return;
                  placeholder = placeholder.set({ year: Number(v) });
                }}
                value={String(month.value.year)}
              >
                <SelectTrigger aria-label="Year" class="min-w-none"><SelectValue /></SelectTrigger>
                <SelectPopup>
                  {#each yearItems as item (item.value)}
                    <SelectItem value={item.value}>{item.label}</SelectItem>
                  {/each}
                </SelectPopup>
              </Select>
            </div>
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
