<script lang="ts">

	import { scaleUtc } from "d3-scale";
	import { curveNatural } from "d3-shape";
	import { AreaChart } from "layerchart";
	import { Chart, type ChartConfig, ChartTooltip } from "$lib/components/ui/chart";

	const chartData = [
		{ date: new Date("2024-01-01"), desktop: 186, mobile: 80 },
		{ date: new Date("2024-02-01"), desktop: 305, mobile: 200 },
		{ date: new Date("2024-03-01"), desktop: 237, mobile: 120 },
		{ date: new Date("2024-04-01"), desktop: 73, mobile: 190 },
		{ date: new Date("2024-05-01"), desktop: 209, mobile: 130 },
		{ date: new Date("2024-06-01"), desktop: 214, mobile: 140 },
	];

	const chartConfig = {
		desktop: { color: "var(--chart-1)", label: "Desktop" },
		mobile: { color: "var(--chart-2)", label: "Mobile" },
	} satisfies ChartConfig;
</script>


		<Chart config={chartConfig} class="grow p-6 h-87.5">
			<AreaChart
				data={chartData}
				x="date"
				xScale={scaleUtc()}
				yDomain={[0, 600]}
				series={[
					{
						key: "mobile",
						label: "Mobile",
						color: chartConfig.mobile.color,
					},
					{
						key: "desktop",
						label: "Desktop",
						color: chartConfig.desktop.color,
					},
				]}
				seriesLayout="stack"
				props={{
					area: {
						curve: curveNatural,
						fillOpacity: 0.4,
						line: { class: "stroke-1" },
						motion: "tween",
					},
					xAxis: {
						format: (v: Date) =>
							v.toLocaleDateString("en-US", { month: "short" }),
					},
					yAxis: { ticks: [0, 300, 600] },
				}}
			>
				{#snippet tooltip()}
					<ChartTooltip
						labelFormatter={(v) => {
							return (v as Date).toLocaleDateString("en-US", {
								month: "long",
							});
						}}
						indicator="dot"
					/>
				{/snippet}
			</AreaChart>
		</Chart>
	