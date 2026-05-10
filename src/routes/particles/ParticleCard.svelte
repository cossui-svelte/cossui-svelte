<script lang="ts">
	import { Info } from "@lucide/svelte";
	import { Button } from "$lib/components/ui/button";
	import {
		Drawer,
		DrawerPopup,
		DrawerTrigger,
	} from "$lib/components/ui/drawer.old";
	import CodeBlockCommand from "$lib/components/app/code-block-command.svelte";
	import CopyRegistry from "$lib/components/app/copy-registry.svelte";
	import type { Particle } from "$lib/registry/registry-particles.js";
	import ParticleCardContainer from "./ParticleCardContainer.svelte";

	interface Props {
		particle: Particle;
		class?: string;
		colSpan?: number;
	}

	let { particle, class: className, colSpan }: Props = $props();

	const cossuiUrl = "https://coss.ui/";
</script>

<ParticleCardContainer class={className} {colSpan}>
	{#snippet children()}
		<div
			data-particle
			data-slot="preview"
			class="flex items-center justify-center p-4"
		>
			<p class="text-muted-foreground text-sm">{particle.name}</p>
		</div>
	{/snippet}

	{#snippet footer()}
		<p class="flex flex-1 gap-1 truncate text-muted-foreground text-xs">
			<Info class="size-3 h-lh shrink-0" strokeWidth={2} />
			<span class="truncate">{particle.description ?? ""}</span>
		</p>
		<div class="flex items-center gap-1.5">
			<CopyRegistry
				value="{cossuiUrl}/r/{particle.name}.json"
				variant="outline"
			/>
			<Drawer position="right">
				<DrawerTrigger>
					{#snippet child({ props })}
						<Button
							{...props}
							class="text-sm"
							size="sm"
							variant="outline">View code</Button
						>
					{/snippet}
				</DrawerTrigger>
				<DrawerPopup
					class="max-w-4xl"
					showBar
					showCloseButton={false}
					variant="straight"
				>
					<div class="flex flex-1 flex-col overflow-hidden p-6">
						<div>
							<h2 class="mb-4 font-semibold text-xl">
								Installation
							</h2>
							<figure>
								<CodeBlockCommand
									__bun__="bunx --bun shadcn@latest add @coss/{particle.name}"
									__npm__="npx shadcn@latest add @coss/{particle.name}"
									__pnpm__="pnpm dlx shadcn@latest add @coss/{particle.name}"
									__yarn__="yarn dlx shadcn@latest add @coss/{particle.name}"
								/>
							</figure>
						</div>
						<div
							class="flex h-full flex-1 flex-col overflow-hidden"
						>
							<div
								class="flex items-center justify-between gap-2"
							>
								<h2 class="mt-6 mb-4 font-semibold text-xl">
									Code
								</h2>
								<Button
									href="https://v0.dev/chat/api/open?url={encodeURIComponent(
										`${cossuiUrl}/r/${particle.name}.json`,
									)}"
									variant="outline"
									target="_blank"
									rel="noopener noreferrer"
								>
									Open in v0
								</Button>
							</div>
						</div>
					</div>
				</DrawerPopup>
			</Drawer>
		</div>
	{/snippet}
</ParticleCardContainer>
