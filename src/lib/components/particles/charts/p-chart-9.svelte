<script lang="ts">
  import { scaleBand } from "d3-scale";
  import { BarChart } from "layerchart";
  import { cubicInOut } from "svelte/easing";
  import {Chart, type ChartConfig, ChartTooltip } from "$lib/components/ui/chart";

  const chartData = [
    { desktop: 186, mobile: 80, month: "January" },
    { desktop: 305, mobile: 200, month: "February" },
    { desktop: 237, mobile: 120, month: "March" },
    { desktop: 73, mobile: 190, month: "April" },
    { desktop: 209, mobile: 130, month: "May" },
    { desktop: 214, mobile: 140, month: "June" },
  ];

  const chartConfig = {
    desktop: { color: "var(--chart-1)", label: "Desktop" },
    mobile: { color: "var(--chart-2)", label: "Mobile" },
  } satisfies ChartConfig;
</script>


    <Chart config={chartConfig} class="grow p-12 h-87.5">
      <BarChart
        data={chartData}
        xScale={scaleBand().padding(0.25)}
        x="month"
        axis="x"
        series={[
          { key: "desktop", label: "Desktop", color: chartConfig.desktop.color },
          { key: "mobile", label: "Mobile", color: chartConfig.mobile.color },
        ]}
        x1Scale={scaleBand().paddingInner(0.2)}
        seriesLayout="group"
        rule={false}
        props={{
          bars: {
            stroke: "none",
            strokeWidth: 0,
            rounded: "all",
            motion: { type: "tween", duration: 500, easing: cubicInOut },
          },
          highlight: { area: { fill: "none" } },
          xAxis: { format: (d) => d.slice(0, 3) },
        }}
      >
        {#snippet tooltip()}
          <ChartTooltip indicator="dashed" />
        {/snippet}
      </BarChart>
    </Chart>
