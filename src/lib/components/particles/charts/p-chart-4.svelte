<script lang="ts">
	import { scaleBand } from "d3-scale";
	import { curveLinearClosed } from "d3-shape";
	import { Axis, LineChart, Text } from "layerchart";
	import {
		Chart,
		type ChartConfig,
		ChartTooltip,
	} from "$lib/components/ui/chart";

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
	<LineChart
		data={chartData}
		series={[
			{
				key: "desktop",
				label: "Desktop",
				color: chartConfig.desktop.color,
				props: {
					fill: chartConfig.desktop.color,
					fillOpacity: 0.6,
				},
			},
			{
				key: "mobile",
				label: "Mobile",
				color: chartConfig.mobile.color,
				props: {
					fill: chartConfig.mobile.color,
				},
			},
		]}
		radial
		x="month"
		xScale={scaleBand()}
		padding={12}
		props={{
			spline: {
				curve: curveLinearClosed,
				stroke: "0",
				motion: "tween",
			},
			xAxis: {
				tickLength: 0,
			},
			yAxis: {
				format: () => "",
			},
			grid: {
				radialY: "linear",
			},
			tooltip: {
				context: {
					mode: "voronoi",
				},
			},
			highlight: {
				lines: false,
				points: { r: 4 },
			},
		}}
	>
		{#snippet axis()}
			<Axis placement="angle" tickLength={0}>
				{#snippet tickLabel({ props, index })}
					{@const y = props.y
						? typeof props.y === "number"
							? props.y
							: typeof props.y === "string"
								? Number.parseInt(props.y, 10)
								: 0
						: 0}
					{@const data = chartData[index]}
					<Text
						{...props}
						{y}
						value="{data.desktop} / {data.mobile}"
						class="fill-foreground"
					/>
					<Text {...props} y={y + 14} />
				{/snippet}
			</Axis>
			<Axis placement="radius" format={() => ""} />
		{/snippet}
		{#snippet tooltip()}
			<ChartTooltip />
		{/snippet}
	</LineChart>
</Chart>
