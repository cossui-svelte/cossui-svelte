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
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";

	import CircleAlert from "@lucide/svelte/icons/circle-alert";
	import { PROJECT_NAME } from "$lib/config";

	let inputValue = $state("");
</script>

<Dialog>
	<DialogTrigger class={buttonVariants({ variant: "outline" })}
		>Delete project</DialogTrigger
	>
	<DialogContent>
		<div class="flex flex-col items-center gap-2">
			<div
				class="flex size-9 shrink-0 items-center justify-center rounded-full border border-border"
				aria-hidden="true"
			>
				<CircleAlert class="opacity-80" size={16} strokeWidth={2} />
			</div>
			<DialogHeader>
				<DialogTitle class="sm:text-center"
					>Final confirmation</DialogTitle
				>
				<DialogDescription class="sm:text-center">
					This action cannot be undone. To confirm, please enter the
					project name
					<span class="text-foreground">{PROJECT_NAME}</span>.
				</DialogDescription>
			</DialogHeader>
		</div>

		<form class="space-y-5">
			<div class="space-y-2">
				<Label for="project-name">Project name</Label>
				<Input
					id="project-name"
					type="text"
					placeholder="Type Origin UI to confirm"
					bind:value={inputValue}
				/>
			</div>
			<DialogFooter>
				<DialogClose
					class="{buttonVariants({ variant: 'outline' })} flex-1"
					>Cancel</DialogClose
				>
				<Button
					type="button"
					class="flex-1"
					disabled={inputValue !== PROJECT_NAME}>Delete</Button
				>
			</DialogFooter>
		</form>
	</DialogContent>
</Dialog>
