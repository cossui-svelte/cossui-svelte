<script lang="ts">
    import { Arc, PieChart, Text } from "layerchart";
    import {Chart, type ChartConfig, ChartTooltip } from "$lib/components/ui/chart";


    const desktopData = [
        { color: "var(--color-january)", desktop: 186, month: "january" },
        { color: "var(--color-february)", desktop: 305, month: "february" },
        { color: "var(--color-march)", desktop: 237, month: "march" },
        { color: "var(--color-april)", desktop: 173, month: "april" },
        { color: "var(--color-may)", desktop: 209, month: "may" },
    ];

    const chartConfig = {
        april: { color: "var(--chart-4)", label: "April" },
        desktop: { label: "Desktop" },
        february: { color: "var(--chart-2)", label: "February" },
        january: { color: "var(--chart-1)", label: "January" },
        march: { color: "var(--chart-3)", label: "March" },
        may: { color: "var(--chart-5)", label: "May" },
    } satisfies ChartConfig;

    let activeMonth = $state(desktopData[0].month);

    const id = "pie-interactive";

    const activeIndex = $derived(
        desktopData.findIndex((item) => item.month === activeMonth),
    );

    const months = $derived(desktopData.map((item) => item.month));
</script>

<Chart {id} config={chartConfig} class="grow p-4 h-87.5">
    <PieChart
        data={desktopData}
        label="month"
        key="month"
        value="desktop"
        c="color"
        props={{
            pie: {
                sort: (a, b) => {
                    const monthOrder = [
                        "january",
                        "february",
                        "march",
                        "april",
                        "may",
                    ];
                    return (
                        monthOrder.indexOf(a.month) -
                        monthOrder.indexOf(b.month)
                    );
                },
                motion: "tween",
            },
        }}
        innerRadius={60}
        padding={29}
    >
        {#snippet aboveMarks()}
            <Text
                value={desktopData[activeIndex].desktop.toLocaleString()}
                textAnchor="middle"
                verticalAnchor="middle"
                class="fill-foreground !text-3xl font-bold"
                dy={3}
            />
            <Text
                value="Visitors"
                textAnchor="middle"
                verticalAnchor="middle"
                class="!fill-muted-foreground text-muted-foreground"
                dy={22}
            />
        {/snippet}
        {#snippet arc({ props, index })}
            {@const isActive = index === activeIndex}
            {@const arcProps = isActive
                ? { ...props, outerRadius: 60, innerRadius: 105 }
                : props}

            {#if isActive}
                <g>
                    <Arc {...arcProps} />
                    <Arc {...arcProps} outerRadius={107} innerRadius={119} />
                </g>
            {:else}
                <Arc {...arcProps} />
            {/if}
        {/snippet}
        {#snippet tooltip()}
            <ChartTooltip
                labelKey="visitors"
                nameKey="month"
                indicator="line"
                labelFormatter={(_, payload) => {
                    return chartConfig[
                        payload?.[0].key as keyof typeof chartConfig
                    ].label;
                }}
            />
        {/snippet}
    </PieChart>
</Chart>
