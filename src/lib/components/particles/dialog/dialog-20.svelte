<script lang="ts">
	import { Button, buttonVariants } from "$lib/components/ui/button";
	import {
		Dialog,
		DialogClose,
		DialogContent,
		DialogDescription,
		DialogFooter,
		DialogHeader,
		DialogTitle,
		DialogTrigger,
	} from "$lib/components/ui/dialog";

	import ArrowRight from "@lucide/svelte/icons/arrow-right";
	import DialogImg from "$assets/dialog-content.png";
	import { cn } from "$lib/utils";

	const steps = [
		{
			description:
				"Discover a powerful collection of components designed to enhance your development workflow.",
			title: "Welcome to Origin UI",
		},
		{
			description:
				"Each component is fully customizable and built with modern web standards in mind.",
			title: "Customizable Components",
		},
		{
			description:
				"Begin building amazing interfaces with our comprehensive component library.",
			title: "Ready to Start?",
		},
		{
			description:
				"Access our extensive documentation and community resources to make the most of Origin UI.",
			title: "Get Support",
		},
	];

	let step = $state(1);

	function handleContinue() {
		if (step < steps.length) {
			step += 1;
		}
	}
</script>

<Dialog
	onOpenChange={(open) => {
		if (open) step = 1;
	}}
>
	<DialogTrigger class={buttonVariants({ variant: "outline" })}
		>Onboarding</DialogTrigger
	>
	<DialogContent class="gap-0 p-0 [&>button:last-child]:text-white">
		<div class="p-2">
			<img
				class="w-full rounded-lg"
				src={DialogImg}
				width={382}
				height={216}
				alt="dialog"
			/>
		</div>
		<div class="space-y-6 px-6 pb-6 pt-3">
			<DialogHeader>
				<DialogTitle>{steps[step - 1].title}</DialogTitle>
				<DialogDescription
					>{steps[step - 1].description}</DialogDescription
				>
			</DialogHeader>
			<div
				class="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"
			>
				<div class="flex justify-center space-x-1.5 max-sm:order-1">
					{#each { length: steps.length } as _, index (index)}
						<div
							class={cn(
								"h-1.5 w-1.5 rounded-full bg-primary",
								index + 1 === step
									? "bg-primary"
									: "opacity-20",
							)}
						></div>
					{/each}
				</div>
				<DialogFooter>
					<DialogClose class={buttonVariants({ variant: "ghost" })}
						>Skip</DialogClose
					>
					{#if step < steps.length}
						<Button
							class="group"
							type="button"
							onclick={handleContinue}
						>
							Next
							<ArrowRight
								className="-me-1 ms-2 opacity-60 transition-transform group-hover:translate-x-0.5"
								size={16}
								strokeWidth={2}
								aria-hidden="true"
							/>
						</Button>
					{:else}
						<DialogClose class={buttonVariants()}>Okay</DialogClose>
					{/if}
				</DialogFooter>
			</div>
		</div>
	</DialogContent>
</Dialog>
