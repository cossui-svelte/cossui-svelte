<script lang="ts">
    import { scaleUtc } from "d3-scale";
    import { curveNatural } from "d3-shape";
    import { LineChart } from "layerchart";
    import { Chart, type ChartConfig, ChartTooltip } from "$lib/components/ui/chart";

    const chartData = [
        { date: new Date("2024-01-01"), desktop: 186 },
        { date: new Date("2024-02-01"), desktop: 305 },
        { date: new Date("2024-03-01"), desktop: 237 },
        { date: new Date("2024-04-01"), desktop: 73 },
        { date: new Date("2024-05-01"), desktop: 209 },
        { date: new Date("2024-06-01"), desktop: 214 },
    ];

    const chartConfig = {
        desktop: { color: "var(--chart-1)", label: "Desktop" },
    } satisfies ChartConfig;
</script>

<Chart config={chartConfig} class="flex-1 p-8 mx-auto aspect-square max-h-[250px]">
    <LineChart
        points={{ r: 4 }}
        labels={{ offset: 12 }}
        data={chartData}
        x="date"
        axis="x"
        xScale={scaleUtc()}
        series={[
            {
                key: "desktop",
                label: "Desktop",
                color: chartConfig.desktop.color,
            },
        ]}
        props={{
            spline: { curve: curveNatural, motion: "tween", strokeWidth: 2 },
            highlight: {
                points: {
                    motion: "none",
                    r: 6,
                },
            },
            xAxis: {
                format: (v: Date) =>
                    v.toLocaleDateString("en-US", { month: "short" }),
            },
        }}
    >
        {#snippet tooltip()}
            <ChartTooltip
                labelFormatter={(v) => {
                    return (v as Date).toLocaleDateString("en-US", {
                        month: "long",
                    });
                }}
                indicator="line"
            />
        {/snippet}
    </LineChart>
</Chart>
