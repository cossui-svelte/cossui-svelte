<script lang="ts">
	import { RangeCalendar as RangeCalendarPrimitive } from "bits-ui";
	import { cn } from "$lib/utils";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: RangeCalendarPrimitive.DayProps = $props();
</script>

<RangeCalendarPrimitive.Day
	bind:ref
	class={cn(
		"relative flex size-(--cell-size) flex-col items-center justify-center gap-1 rounded-(--cell-radius) p-0 leading-none font-normal whitespace-nowrap select-none",
		"not-data-selected:hover:bg-accent/50 not-data-selected:hover:text-accent-foreground",
		"[&[data-today]:not([data-selected])]:bg-accent [&[data-today]:not([data-selected])]:text-accent-foreground [&[data-today][data-disabled]]:text-muted-foreground",
		// Selected (start/end only — range-middle is styled separately below)
		"[&[data-selected]:not([data-range-middle])]:bg-primary [&[data-selected]:not([data-range-middle])]:text-primary-foreground",
		// Today indicator dot
		"data-today:after:pointer-events-none data-today:after:absolute data-today:after:bottom-1 data-today:after:inset-s-1/2 data-today:after:z-1 data-today:after:size-0.75 data-today:after:-translate-x-1/2 data-today:after:rounded-full data-today:after:bg-primary data-today:after:transition-colors",
		"[&[data-today][data-selected]:not([data-range-middle])]:after:bg-background data-today:data-disabled:after:bg-foreground/30",
		// bits-ui sets both range-start and range-end on a lone start-only day, so only flatten when they're distinct
		"[&[data-range-start]:not([data-range-end])]:rounded-e-none [&[data-range-end]:not([data-range-start])]:rounded-s-none",
		// Range middle (intermediary dates)
		"data-range-middle:rounded-none data-range-middle:bg-accent data-range-middle:text-accent-foreground data-range-middle:hover:bg-accent",
		// Outside months
		"[&[data-outside-month]:not([data-selected])]:text-muted-foreground [&[data-outside-month]:not([data-selected])]:hover:text-accent-foreground",
		// Disabled
		"data-[disabled]:text-muted-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
		// Unavailable
		"data-[unavailable]:text-muted-foreground data-[unavailable]:line-through",
		// focus
		"focus:border-ring focus:ring-ring/50 focus:relative",
		// inner spans
		"[&>span]:text-xs [&>span]:opacity-70",
		className
	)}
	{...restProps}
/>
