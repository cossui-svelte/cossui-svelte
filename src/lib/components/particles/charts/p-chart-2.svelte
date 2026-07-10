<script lang="ts">
	import { ArcChart, Text } from "layerchart";
	import { Chart, type ChartConfig } from "$lib/components/ui/chart";

	const chartData = [
		{ browser: "safari", color: "var(--color-safari)", visitors: 200 },
	];

	const chartConfig = {
		safari: { color: "var(--chart-2)", label: "Safari" },
		visitors: { label: "Visitors" },
	} satisfies ChartConfig;
</script>

<Chart config={chartConfig} class="flex-1 p-2 aspect-square max-h-[250px]">
	<ArcChart
		label="browser"
		value="visitors"
		outerRadius={-20}
		innerRadius={-12}
		padding={40}
		range={[90, -270]}
		maxValue={300}
		cornerRadius={20}
		series={chartData.map((d) => ({
		
			color: d.color,
			data: [d],
				key: d.browser,
		}))}
		props={{
			arc: { motion: "tween" ,track: { fill: "var(--muted)" }},
			tooltip: { context: { hideDelay: 350 } },
		}}
		tooltipContext={false}
	>
		{#snippet belowMarks()}
			<circle cx="0" cy="0" r="60" class="fill-background"></circle>
		{/snippet}

		{#snippet aboveMarks()}
			<Text
				value={String(chartData[0].visitors)}
				textAnchor="middle"
				verticalAnchor="middle"
				class="fill-foreground text-4xl! font-bold"
				dy={3}
			/>
			<Text
				value="Visitors"
				textAnchor="middle"
				verticalAnchor="middle"
				class="fill-muted-foreground!"
				dy={22}
			/>
		{/snippet}
	</ArcChart>
</Chart>
