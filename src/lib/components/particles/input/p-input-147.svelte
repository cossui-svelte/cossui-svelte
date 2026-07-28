<script lang="ts">
	import type { CountryCode } from "svelte-tel-input/types";
	import { countries, TelInput } from "svelte-tel-input";
	import "svelte-tel-input/styles/flags.css";

	import { Group, GroupSeparator } from "$lib/components/ui/group";
	import { Label } from "$lib/components/ui/label";
	import {
		Select,
		SelectItem,
		SelectPopup,
		SelectTrigger,
	} from "$lib/components/ui/select";

	import Phone from "@lucide/svelte/icons/phone";

	let selectedCountry = $state<CountryCode | null>(null);
	let value = $state("");

	const uid = $props.id();
</script>

<div class="*:not-first:mt-2" dir="ltr">
	<Label for={uid}>Phone number input</Label>
	<Group aria-label="Phone number">
		<Select
			value={selectedCountry ?? ""}
			onValueChange={(v: string) => (selectedCountry = (v || null) as CountryCode)}
		>
			<SelectTrigger class="w-fit min-w-none gap-1 px-3" aria-label="Select country">
				<span class="flex h-[16px] w-5 items-center overflow-hidden rounded-sm">
					{#if selectedCountry}
						<span
							class="flag flag-{selectedCountry.toLowerCase()} h-[13px]! w-5!"
							aria-hidden="true"
						></span>
					{:else}
						<Phone size={16} aria-hidden="true" />
					{/if}
				</span>
			</SelectTrigger>
			<SelectPopup class="w-72">
				{#each countries as country (country.id)}
					<SelectItem value={country.iso2} label={country.label}>
						<span
							class="flag flag-{country.iso2.toLowerCase()} h-[13px]! w-5! shrink-0"
							aria-hidden="true"
						></span>
						<span class="truncate">{country.label}</span>
					</SelectItem>
				{/each}
			</SelectPopup>
		</Select>
		<GroupSeparator />
		<span
			data-slot="input-control"
			class="border-input bg-background text-foreground not-dark:bg-clip-padding ring-ring/24 dark:bg-input/32 relative inline-flex w-full rounded-lg border text-base shadow-xs/5 transition-shadow before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] not-has-disabled:not-has-focus-visible:before:shadow-[0_1px_--theme(--color-black/4%)] has-focus-visible:border-ring has-focus-visible:shadow-none has-focus-visible:ring-[3px] has-disabled:opacity-64 sm:text-sm dark:not-has-disabled:not-has-focus-visible:before:shadow-[0_-1px_--theme(--color-white/6%)]"
		>
			<TelInput
				id={uid}
				required
				placeholder="Enter phone number"
				class="h-8.5 sm:h-7.5 sm:leading-7.5 placeholder:text-muted-foreground/72 w-full min-w-0 rounded-[inherit] px-[calc(--spacing(3)-1px)] leading-8.5 outline-none disabled:cursor-not-allowed disabled:opacity-50"
				bind:country={selectedCountry}
				bind:value
				initialFormat="international"
			/>
		</span>
	</Group>
</div>
