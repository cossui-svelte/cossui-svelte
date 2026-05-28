<script lang="ts">
	import { Label } from "$lib/components/ui/label";
	import {
		Select,
		SelectContent,
		SelectItem,
		SelectTrigger,
	} from "$lib/components/ui/select/index.js";

	const timezones = Intl.supportedValuesOf("timeZone")
		.map((timezone) => {
			const formatter = new Intl.DateTimeFormat("en", {
				timeZone: timezone,
				timeZoneName: "shortOffset",
			});
			const parts = formatter.formatToParts(new Date());
			const offset =
				parts.find((part) => part.type === "timeZoneName")?.value || "";
			const modifiedOffset = offset === "GMT" ? "GMT+0" : offset;

			return {
				label: `(${modifiedOffset}) ${timezone.replace(/_/g, " ")}`,
				numericOffset: parseInt(
					offset.replace("GMT", "").replace("+", "") || "0",
				),
				value: timezone,
			};
		})
		.sort((a, b) => a.numericOffset - b.numericOffset);

	let value = $state("Europe/London");

	const selected = $derived(timezones.find((i) => i.value === value));

	const uid = $props.id();
</script>

<div class="space-y-2">
	<Label for={uid}>Timezone select</Label>
	<Select type="single" bind:value>
		<SelectTrigger id={uid}>
			{selected?.label ?? "Select a timezone"}
		</SelectTrigger>
		<SelectContent>
			{#each timezones as item (item.value)}
				<SelectItem value={item.value}>
					{item.label}
				</SelectItem>
			{/each}
		</SelectContent>
	</Select>
</div>
