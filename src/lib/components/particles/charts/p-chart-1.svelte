<script lang="ts">

	import { Arc, ArcChart, Text } from "layerchart";
	import {
		Chart,
		type ChartConfig,
		ChartTooltip,
	} from "$lib/components/ui/chart";

	const chartData = [
		{ browser: "other", color: "var(--color-other)", visitors: 90 },
		{ browser: "edge", color: "var(--color-edge)", visitors: 173 },
		{ browser: "firefox", color: "var(--color-firefox)", visitors: 187 },
		{ browser: "safari", color: "var(--color-safari)", visitors: 200 },
		{ browser: "chrome", color: "var(--color-chrome)", visitors: 275 },
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

<Chart config={chartConfig} class="flex-1 p-4 aspect-square max-h-[250px]">
	<ArcChart
		label="browser"
		value="visitors"
		outerRadius={-17}
		innerRadius={-12.5}
		padding={20}
		range={[180, -180]}
		maxValue={Math.max(...chartData.map((d) => d.visitors)) + 0}
		series={chartData.map((d) => ({
			color: d.color,
			data: [d],
			key: d.browser,
			label: d.browser,
		}))}
		props={{
			arc: {  motion: "tween" , track: { fill: "var(--muted)" }},
			tooltip: { context: { hideDelay: 350 } },
		}}
	>
		{#snippet tooltip()}
			<ChartTooltip hideLabel nameKey="browser" />
		{/snippet}
		{#snippet arc({ props, seriesIndex, context })}
			<Arc {...props}>
				{#snippet children({ getTrackTextProps })}
					<Text
						{...getTrackTextProps("middle", {
							startOffset: "1%",
						})}
						class="pointer-events-none capitalize select-none"
						value={context.series.visibleSeries[seriesIndex].label}
						fill="white"
					/>
				{/snippet}
			</Arc>
		{/snippet}
	</ArcChart>
</Chart>
