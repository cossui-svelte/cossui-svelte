<script lang="ts">
	import Info from "@lucide/svelte/icons/info";
	import { Button } from "$lib/components/ui/button";
	import { Drawer, DrawerPopup } from "$lib/components/ui/drawer";
	import { Spinner } from "$lib/components/ui/spinner";	
	import ComponentSource from "$lib/components/app/component-source.svelte";
	import type { RegistryParticuleEntry } from "$lib/registry/registry-particles";
	import ParticleCardContainer from "./particle-card-container.svelte";

	let {
		particle,
		class: className,
		colSpan,
	}: {
		particle: RegistryParticuleEntry;
		class?: string;
		colSpan?: number;
	} = $props();

	let drawerOpen = $state(false);
	let drawerName = $state<string>("");
	let sourceFile = $state<string | null>(null);
	//let sourceHtml = $state<string>("");
	//let sourceRaw = $state<string>("");
	//let loadingSource = $state(false);
	//let copied = $state(false);

	async function viewSource(file: string, name: string) {
		if (drawerOpen && sourceFile === file) {
			closeDrawer();
			return;
		}
		drawerName = name;
		sourceFile = file;
		drawerOpen = true;
		//	loadingSource = true;
		//	sourceHtml = "";
		//	sourceRaw = "";
		//	const res = await fetch(`/api/source/${file}`);
		//	const data = await res.json();
		//	console.log(data);
		//	sourceHtml = data.html;
		//	sourceRaw = data.raw;
		//	loadingSource = false;
	}

	function closeDrawer() {
		drawerOpen = false;
		setTimeout(() => {
			sourceFile = null;
			//	sourceHtml = "";
			//sourceRaw = "";
		}, 300);
	}
</script>

<ParticleCardContainer class={className} {colSpan}>
	{#snippet footer()}
		<p class="flex flex-1 gap-1 truncate text-muted-foreground text-xs">
			<Info class="size-3 h-lh shrink-0" strokeWidth={2} />
			<span class="truncate">{particle.description ?? ""}</span>
		</p>
		<div class="flex items-center gap-1.5">
			<Button
				class="text-sm"
				size="sm"
				variant="outline"
				onclick={() => viewSource(particle.file, particle.name)}
				>View code</Button
			>
			<Drawer
				position="right"
				open={drawerOpen}
				onOpenChange={(v) => {
					if (!v) closeDrawer();
				}}
			>
				<DrawerPopup
					class="max-w-4xl"
					showBar
					showCloseButton={false}
					variant="straight"
				>
					<div class="flex flex-1 flex-col overflow-hidden p-6">
						<!-- <div>
							<h2 class="mb-4 font-semibold text-xl">
								Installation
							</h2>
							<figure>
								<CodeBlockCommand
									__bun__={`bunx --bun shadcn@latest add @coss/${particle.name}`}
									__npm__={`npx shadcn@latest add @coss/${particle.name}`}
									__pnpm__={`pnpm dlx shadcn@latest add @coss/${particle.name}`}
									__yarn__={`yarn dlx shadcn@latest add @coss/${particle.name}`}
								/>
							</figure>
						</div> -->
						<div
							class="flex h-full flex-1 flex-col overflow-hidden"
						>
							<div
								class="flex items-center justify-between gap-2"
							>
								<h2 class="mt-6 mb-4 font-semibold text-xl">
									{drawerName}
								</h2>
								<!-- <button
									class="rounded p-1.5 opacity-70 hover:opacity-100"
									onclick={async () => {
										await navigator.clipboard.writeText(
											sourceRaw,
										);
										copied = true;
										setTimeout(
											() => (copied = false),
											2000,
										);
									}}
									type="button"
								>
									{#if copied}
										<Check class="size-4" strokeWidth={2} />
									{:else}
										<Copy class="size-4" strokeWidth={2} />
									{/if}
								</button> -->
							</div>
							<!-- {#if loadingSource}
								<div
									class="flex flex-1 items-center justify-center text-muted-foreground text-sm"
								>
									<Spinner /> Loading…
								</div>
							{:else if sourceHtml} -->
							<ComponentSource
								class="flex min-h-0 flex-1 flex-col *:data-rehype-pretty-code-figure:mt-0"
								collapsible={false}
								src={particle.file}
							/>
							<!-- {/if} -->
						</div>
					</div>
				</DrawerPopup>
			</Drawer>
		</div>
	{/snippet}

	{#snippet children()}
		<div data-particle data-slot="preview" class="flex items-center justify-center">
			{#await particle.component()}
				<Spinner/>
			{:then { default: Comp }}
				<Comp />
			{/await}
		</div>
	{/snippet}
</ParticleCardContainer>
