<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { Label } from "$lib/components/ui/label";

	import Check from "@lucide/svelte/icons/check";
	import ChevronDown from "@lucide/svelte/icons/chevron-down";
	import {
		Command,
		CommandEmpty,
		CommandGroup,
		CommandInput,
		CommandItem,
		CommandList,
	} from "$lib/components/ui/command";
	import {
		Popover,
		PopoverContent,
		PopoverTrigger,
	} from "$lib/components/ui/popover";
	import { cn } from "$lib/utils";

	let open = $state(false);
	let value = $state("");

	const frameworks = [
		{ label: "SvelteKit", value: "sveltekit" },
		{ label: "Svelte", value: "svelte" },
		{ label: "Nuxt.js", value: "nuxt.js" },
		{ label: "Remix", value: "remix" },
		{ label: "Astro", value: "astro" },
		{ label: "Angular", value: "angular" },
		{ label: "Vue.js", value: "vue" },
		{ label: "Ember.js", value: "ember" },
		{ label: "Gatsby", value: "gatsby" },
		{ label: "Eleventy", value: "eleventy" },
		{ label: "SolidJS", value: "solid" },
		{ label: "Preact", value: "preact" },
		{ label: "Qwik", value: "qwik" },
		{ label: "Next.js", value: "next.js" },
		{ label: "Alpine.js", value: "alpine" },
		{ label: "Lit", value: "lit" },
	] as const;

	function handleSelect(currentValue: string) {
		value = currentValue === value ? "" : currentValue;
		open = false;
	}
</script>

<div class="space-y-2">
	<Label>Select with search</Label>
	<Popover bind:open>
		<PopoverTrigger>
			{#snippet child({ props })}
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					class="w-full justify-between bg-background px-3 font-normal outline-offset-0 hover:bg-background focus-visible:border-ring focus-visible:outline-[3px] focus-visible:outline-ring/20"
					{...props}
				>
					<span
						class={cn(
							"truncate",
							!value && "text-muted-foreground",
						)}
					>
						{#if value}
							{frameworks.find(
								(framework) => framework.value === value,
							)?.label}
						{:else}
							Select framework
						{/if}
					</span>
					<ChevronDown
						size={16}
						stroke-width={2}
						class="shrink-0 text-muted-foreground/80"
						aria-hidden="true"
					/>
				</Button>
			{/snippet}
		</PopoverTrigger>
		<PopoverContent
			class="w-full min-w-[var(--bits-popover-anchor-width)] p-0"
			align="start"
		>
			<Command>
				<CommandInput placeholder="Search framework..." />
				<CommandList>
					<CommandEmpty>No framework found.</CommandEmpty>
					<CommandGroup>
						{#each frameworks as framework (framework.value)}
							<CommandItem
								value={framework.value}
								onSelect={() => handleSelect(framework.value)}
							>
								{framework.label}
								<Check
									class={cn(
										"ml-auto",
										value === framework.value
											? "opacity-100"
											: "opacity-0",
									)}
								/>
							</CommandItem>
						{/each}
					</CommandGroup>
				</CommandList>
			</Command>
		</PopoverContent>
	</Popover>
</div>
