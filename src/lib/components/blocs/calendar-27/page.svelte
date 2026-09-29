<script lang="ts">
  import { CalendarDate, getLocalTimeZone } from '@internationalized/date';
  import CalendarIcon from '@lucide/svelte/icons/calendar';
  import { scaleBand } from 'd3-scale';
  import { BarChart, Highlight } from 'layerchart';
  import { cubicInOut } from 'svelte/easing';
  import { buttonVariants } from '$lib/components/ui/button';
  import { type DateRange } from '$lib/components/ui/calendar';
  import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardPanel,
    CardTitle
  } from '$lib/components/ui/card';
  import { Chart, type ChartConfig, ChartTooltip } from '$lib/components/ui/chart';
  import { Popover, PopoverPopup, PopoverTrigger } from '$lib/components/ui/popover';
  import { RangeCalendar } from '$lib/components/ui/range-calendar';
  import { cn } from '$lib/utils';

  let value = $state<DateRange | undefined>({
    start: new CalendarDate(2025, 6, 5),
    end: new CalendarDate(2025, 6, 20)
  });

  const chartData = [
    { date: new Date('2025-06-01'), visitors: 178 },
    { date: new Date('2025-06-02'), visitors: 470 },
    { date: new Date('2025-06-03'), visitors: 103 },
    { date: new Date('2025-06-04'), visitors: 439 },
    { date: new Date('2025-06-05'), visitors: 88 },
    { date: new Date('2025-06-06'), visitors: 294 },
    { date: new Date('2025-06-07'), visitors: 323 },
    { date: new Date('2025-06-08'), visitors: 385 },
    { date: new Date('2025-06-09'), visitors: 438 },
    { date: new Date('2025-06-10'), visitors: 155 },
    { date: new Date('2025-06-11'), visitors: 92 },
    { date: new Date('2025-06-12'), visitors: 492 },
    { date: new Date('2025-06-13'), visitors: 81 },
    { date: new Date('2025-06-14'), visitors: 426 },
    { date: new Date('2025-06-15'), visitors: 307 },
    { date: new Date('2025-06-16'), visitors: 371 },
    { date: new Date('2025-06-17'), visitors: 475 },
    { date: new Date('2025-06-18'), visitors: 107 },
    { date: new Date('2025-06-19'), visitors: 341 },
    { date: new Date('2025-06-20'), visitors: 408 },
    { date: new Date('2025-06-21'), visitors: 169 },
    { date: new Date('2025-06-22'), visitors: 317 },
    { date: new Date('2025-06-23'), visitors: 480 },
    { date: new Date('2025-06-24'), visitors: 132 },
    { date: new Date('2025-06-25'), visitors: 141 },
    { date: new Date('2025-06-26'), visitors: 434 },
    { date: new Date('2025-06-27'), visitors: 448 },
    { date: new Date('2025-06-28'), visitors: 149 },
    { date: new Date('2025-06-29'), visitors: 103 },
    { date: new Date('2025-06-30'), visitors: 446 }
  ];

  const total = chartData.reduce((acc, curr) => acc + curr.visitors, 0);

  const chartConfig = {
    visitors: {
      label: 'Visitors',
      color: 'var(--color-primary)'
    }
  } satisfies ChartConfig;

  const filteredData = $derived.by(() => {
    const start = value?.start;
    const end = value?.end;
    if (!start || !end) return chartData;
    const startDate = start.toDate(getLocalTimeZone());
    const endDate = end.toDate(getLocalTimeZone());
    // set end date to end of day to include the full day
    endDate.setHours(23, 59, 59, 999);
    return chartData.filter(({ date }) => {
      const dateObj = new Date(date);
      return dateObj >= startDate && dateObj <= endDate;
    });
  });
</script>

<Card class="@container/card w-full max-w-xl">
  <CardHeader class="flex flex-col border-b @md/card:grid">
    <CardTitle>Web Analytics</CardTitle>
    <CardDescription>Showing total visitors for this month.</CardDescription>
    <CardAction class="mt-2 @md/card:mt-0">
      <Popover>
        <PopoverTrigger class={cn(buttonVariants({ variant: 'outline' }))}>
          <CalendarIcon />
          {value?.start && value?.end
            ? `${value.start.toDate(getLocalTimeZone()).toLocaleDateString()} - ${value.end.toDate(getLocalTimeZone()).toLocaleDateString()}`
            : 'June 2025'}
        </PopoverTrigger>
        <PopoverPopup class="w-auto overflow-hidden p-0" align="end">
          <RangeCalendar
            class="w-full"
            fixedWeeks
            bind:value
            minValue={new CalendarDate(2025, 6, 1)}
            maxValue={new CalendarDate(2025, 6, 31)}
          />
        </PopoverPopup>
      </Popover>
    </CardAction>
  </CardHeader>
  <CardPanel class="px-4">
    <Chart config={chartConfig} class="aspect-auto h-[250px] w-full">
      <BarChart
        data={filteredData}
        xScale={scaleBand().padding(0.25)}
        x="date"
        axis="x"
        y="visitors"
        props={{
          bars: {
            stroke: 'none',
            rounded: 'all',
            radius: 4,
            motion: { type: 'tween', duration: 500, easing: cubicInOut }
          },
          xAxis: { format: (d) => d.toLocaleDateString('en-US', { day: 'numeric' }) }
        }}
      >
        {#snippet belowMarks()}
          <Highlight area={{ class: 'fill-muted' }} />
        {/snippet}
        {#snippet tooltip()}
          <ChartTooltip
            class="w-[150px]"
            nameKey="visitors"
            labelFormatter={(d) =>
              (d as Date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
          />
        {/snippet}
      </BarChart>
    </Chart>
  </CardPanel>
  <CardFooter class="border-t">
    <div class="text-sm">
      You had
      <span class="font-semibold">{total.toLocaleString()}</span>
      visitors for the month of June.
    </div>
  </CardFooter>
</Card>
