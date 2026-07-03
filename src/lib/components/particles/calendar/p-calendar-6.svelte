<script lang="ts">
  import { CalendarDate, type DateValue, getLocalTimeZone, today } from "@internationalized/date";
  import { Calendar as CalendarPrimitive } from "bits-ui";
  import * as Calendar from "$lib/components/ui/calendar";
  import {
    Combobox,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
    ComboboxPopup,
  } from "$lib/components/ui/combobox";

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
              <Combobox
                autoHighlight
                items={monthItems}
                onValueChange={(v: string) => {
                  if (!v) return;
                  placeholder = placeholder.set({ month: Number(v) });
                }}
                value={String(month.value.month)}
              >
                <ComboboxInput
                  aria-label="Month"
                  class="**:[input]:w-0 **:[input]:flex-1"
                  onfocus={(e) => e.currentTarget.select()}
                />
                <ComboboxPopup aria-label="Month">
                  <ComboboxEmpty>No items found.</ComboboxEmpty>
                  <ComboboxList>
                    {#each monthItems as item (item.value)}
                      <ComboboxItem label={item.label} value={item.value}>{item.label}</ComboboxItem>
                    {/each}
                  </ComboboxList>
                </ComboboxPopup>
              </Combobox>
              <Combobox
                autoHighlight
                items={yearItems}
                onValueChange={(v: string) => {
                  if (!v) return;
                  placeholder = placeholder.set({ year: Number(v) });
                }}
                value={String(month.value.year)}
              >
                <ComboboxInput
                  aria-label="Year"
                  class="**:[input]:w-0 **:[input]:flex-1"
                  onfocus={(e) => e.currentTarget.select()}
                />
                <ComboboxPopup aria-label="Year">
                  <ComboboxEmpty>No items found.</ComboboxEmpty>
                  <ComboboxList>
                    {#each yearItems as item (item.value)}
                      <ComboboxItem label={item.label} value={item.value}>{item.label}</ComboboxItem>
                    {/each}
                  </ComboboxList>
                </ComboboxPopup>
              </Combobox>
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
