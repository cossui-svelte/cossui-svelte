<script lang="ts">
	import Check from "@lucide/svelte/icons/check";
	import ChevronDown from "@lucide/svelte/icons/chevron-down";
	import Plus from "@lucide/svelte/icons/plus";
	import { Button } from "$lib/components/ui/button";
	import {
		Command,
		CommandEmpty,
		CommandGroup,
		CommandInput,
		CommandItem,
		CommandList,
		CommandSeparator,
	} from "$lib/components/ui/command";
	import { Label } from "$lib/components/ui/label";
	import {
		Popover,
		PopoverContent,
		PopoverTrigger,
	} from "$lib/components/ui/popover";
	import { cn } from "$lib/utils";

	let open = $state(false);
	let value = $state("originui");

	const organizations = [
		{
			label: "Origin UI - Svelte",
			value: "originui",
		},
		{
			label: "Bits UI",
			value: "bitsui",
		},
	] as const;

	function handleSelect(currentValue: string) {
		value = currentValue === value ? "" : currentValue;
		open = false;
	}
</script>

<div class="space-y-2">
	<Label>Select with search and button</Label>
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
							{organizations.find(
								(organization) => organization.value === value,
							)?.label}
						{:else}
							Select organization
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
				<CommandInput placeholder="Find organization" />
				<CommandList>
					<CommandEmpty>No organization found.</CommandEmpty>
					<CommandGroup>
						{#each organizations as organization (organization.value)}
							<CommandItem
								value={organization.value}
								onSelect={() =>
									handleSelect(organization.value)}
							>
								{organization.label}
								<Check
									class={cn(
										"ml-auto",
										value === organization.value
											? "opacity-100"
											: "opacity-0",
									)}
								/>
							</CommandItem>
						{/each}
					</CommandGroup>
					<CommandSeparator />
					<CommandGroup>
						<Button
							variant="ghost"
							class="w-full justify-start font-normal"
						>
							<Plus
								size={16}
								stroke-width={2}
								class="-ms-2 me-2 opacity-60"
								aria-hidden="true"
							/>
							New organization
						</Button>
					</CommandGroup>
				</CommandList>
			</Command>
		</PopoverContent>
	</Popover>
</div>
