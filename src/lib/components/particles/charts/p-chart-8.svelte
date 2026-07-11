<script lang="ts">
    import { Arc, PieChart, Text } from "layerchart";
    import {
        Chart,
        type ChartConfig,
        ChartTooltip,
    } from "$lib/components/ui/chart";

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
    <PieChart
        data={chartData}
        key="browser"
        value="visitors"
        cRange={chartData.map((d) => d.color)}
        c="color"
        props={{
            pie: {
                motion: "tween",
            },
        }}
    >
        {#snippet tooltip()}
            <ChartTooltip hideLabel />
        {/snippet}
        {#snippet arc({ props, visibleData, index })}
            <Arc {...props}>
                {#snippet children({ getArcTextProps })}
                    <Text
                        value={visibleData[index].visitors}
                        {...getArcTextProps("outer", {
                            startOffset: "50%",
                            outerPadding: 10,
                        })}
                        class="fill-foreground"
                    />
                {/snippet}
            </Arc>
        {/snippet}
    </PieChart>
</Chart>
