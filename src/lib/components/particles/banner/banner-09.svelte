<script lang="ts">
	import { Button } from "$lib/components/ui/button";

	import Rocket from "@lucide/svelte/icons/rocket";
	import X from "@lucide/svelte/icons/x";

	let visible = $state(true);
</script>

{#if visible}
	<div class="bg-black px-4 py-3 text-white">
		<div class="flex gap-2 md:items-center">
			<div class="flex grow gap-3 md:items-center">
				<div
					class="flex size-9 shrink-0 items-center justify-center rounded-full bg-gray-700 max-md:mt-0.5"
					aria-hidden="true"
				>
					<Rocket class="opacity-90" size={16} strokeWidth={2} />
				</div>
				<div
					class="flex grow flex-col justify-between gap-3 md:flex-row md:items-center"
				>
					<div class="space-y-0.5">
						<p class="text-sm font-medium">
							Boost your experience with Origin UI
						</p>
						<p class="text-sm text-muted-foreground">
							The new feature is live! Try it out and let us know
							what you think.
						</p>
					</div>
					<div class="flex gap-2 max-md:flex-wrap">
						<Button size="sm" class="text-sm">Try now</Button>
					</div>
				</div>
			</div>
			<Button
				variant="ghost"
				class="group -my-1.5 -me-2 size-8 shrink-0 p-0 hover:bg-transparent"
				onclick={() => (visible = false)}
				aria-label="Close banner"
			>
				<X
					size={16}
					strokeWidth={2}
					class="opacity-60 transition-opacity group-hover:opacity-100"
					aria-hidden="true"
				/>
			</Button>
		</div>
	</div>
{/if}
