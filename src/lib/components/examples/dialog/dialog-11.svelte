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
	import { Label } from "$lib/components/ui/label";
	import {
		RadioGroup,
		RadioGroupItem,
	} from "$lib/components/ui/radio-group/index.js";
	import { Textarea } from "$lib/components/ui/textarea";
</script>

<Dialog>
	<DialogTrigger class={buttonVariants({ variant: "outline" })}
		>Rating</DialogTrigger
	>
	<DialogContent
		class="flex flex-col gap-0 p-0 [&>button:last-child]:top-3.5"
	>
		<DialogHeader class="contents space-y-0 text-left">
			<DialogTitle class="border-b border-border px-6 py-4 text-base">
				Help us improve
			</DialogTitle>
		</DialogHeader>
		<div class="px-6 py-4">
			<form class="space-y-5">
				<div class="space-y-4">
					<div>
						<fieldset class="space-y-4">
							<legend
								class="text-lg font-semibold leading-none text-foreground"
							>
								How hard was it to set up your account?
							</legend>
							<RadioGroup
								value=""
								class="flex gap-0 -space-x-px rounded-lg shadow-sm shadow-black/5"
							>
								{#each Array.from( { length: 9 }, ) as _, index (index)}
									<label
										for="radio-17-r{index}"
										class="relative flex size-9 flex-1 cursor-pointer flex-col items-center justify-center gap-3 border border-input text-center text-sm outline-offset-2 transition-colors first:rounded-s-lg last:rounded-e-lg has-[[data-state=checked]]:z-10 has-[[data-disabled]]:cursor-not-allowed has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-accent has-[[data-disabled]]:opacity-50 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring/70"
									>
										<RadioGroupItem
											id="radio-17-r{index}"
											value="r{index}"
											class="sr-only after:absolute after:inset-0"
										/>
										{index}
									</label>
								{/each}
							</RadioGroup>
						</fieldset>
						<div
							class="mt-2 flex justify-between text-xs text-muted-foreground"
						>
							<p>Very easy</p>
							<p>Very dificult</p>
						</div>
					</div>
					<div class="space-y-2">
						<Label>Why did you give this rating?</Label>
						<Textarea
							id="feedback"
							placeholder="How can we improve Origin UI?"
							aria-label="Send feedback"
						/>
					</div>
				</div>
				<Button type="button" class="w-full">Send feedback</Button>
			</form>
		</div>
	</DialogContent>
</Dialog>
