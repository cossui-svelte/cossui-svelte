<script lang="ts">
    import { scaleBand } from "d3-scale";
    import { BarChart } from "layerchart";
    import { cubicInOut } from "svelte/easing";
    import { Chart, type ChartConfig, ChartTooltip } from "$lib/components/ui/chart";

    const chartData = [
        { browser: "chrome", color: "var(--color-chrome)", visitors: 275 },
        { browser: "safari", color: "var(--color-safari)", visitors: 200 },
        { browser: "firefox", color: "var(--color-firefox)", visitors: 187 },
        { browser: "edge", color: "var(--color-edge)", visitors: 173 },
        { browser: "other", color: "var(--color-other)", visitors: 90 },
    ];

    const chartConfig = {
        chrome: { color: "var(--chart-1)", label: "Chrome" },
        edge: { color: "var(--chart-4)", label: "Edge" },
        firefox: { color: "var(--chart-3)", label: "Firefox" },
        other: { color: "var(--chart-5)", label: "Other" },
        safari: { color: "var(--chart-2)", label: "Safari" },
        visitors: { label: "Visitors" },
    } satisfies ChartConfig;
</script>

<Chart config={chartConfig} class="grow p-12 h-87.5">
    <BarChart
        data={chartData}
        orientation="horizontal"
        yScale={scaleBand().padding(0.25)}
        y="browser"
        x="visitors"
        cRange={chartData.map((c) => c.color)}
        c="color"
        padding={{ left: 48 }}
        grid={false}
        rule={false}
        axis="y"
        props={{
            bars: {
                stroke: "none",
                radius: 5,
                rounded: "all",
                motion: { type: "tween", duration: 500, easing: cubicInOut },
            },
            highlight: { area: { fill: "none" } },
            yAxis: {
                format: (d) => chartConfig[d as keyof typeof chartConfig].label,
                tickLabelProps: {
                    svgProps: {
                        x: -16,
                    },
                },
            },
        }}
    >
        {#snippet tooltip()}
            <ChartTooltip hideLabel nameKey="visitors" />
        {/snippet}
    </BarChart>
</Chart>
