<script lang="ts">
	import { getComponentDialogCtx } from "./component-dialog-context.svelte";
	import Content from "./content.svelte";
	import {
		Dialog,
		DialogContent,
		DialogOverlay,
		DialogPortal,
	} from "$lib/components/ui/dialog";
	import { Drawer, DrawerContent } from "$lib/components/ui/drawer";

	import { pushState, replaceState } from "$app/navigation";
	import { page } from "$app/state";
	import { untrack } from "svelte";
	import { MediaQuery } from "svelte/reactivity";

	const screen = new MediaQuery("(min-width: 768px)");
	const componentDialogCtx = getComponentDialogCtx();
	const originalPath = page.url.pathname;

	let open = $derived(!!componentDialogCtx.component);
	let statePushed = $state(false);

	const targetPath = $derived.by(
		() => `${page.url.pathname}/${componentDialogCtx.component?.name}`,
	);
	$effect(() => {
		open;
		untrack(() => {
			if (open && page.url.pathname !== targetPath) {
				pushState(targetPath, {});
				statePushed = true;
			}
		});
	});

	function handleOpenChange(open: boolean) {
		if (!open && statePushed) {
			replaceState(originalPath, {});
			statePushed = false;
		}
	}
</script>

{#if screen.current}
	<Dialog bind:open onOpenChange={handleOpenChange}>
		<DialogPortal>
			<DialogOverlay />
			<DialogContent
				class="block h-auto max-h-[calc(80svh)] max-w-[calc(100svw-5rem)] overflow-y-auto sm:max-w-2xl"
			>
				<Content
					component={componentDialogCtx.component!}
					onGotoComponent={() => {
						open = false;
						replaceState(originalPath, {});
					}}
				/>
			</DialogContent>
		</DialogPortal>
	</Dialog>
{:else}
	<Drawer bind:open onOpenChange={handleOpenChange}>
		<DrawerContent class="overflow-hidden after:[all:unset]!">
			<div
				class="block h-auto max-h-[calc(80svh)] overflow-y-auto sm:max-w-2xl"
			>
				<Content
					component={componentDialogCtx.component!}
					onGotoComponent={() => {
						open = false;
						replaceState(originalPath, {});
					}}
				/>
			</div>
		</DrawerContent>
	</Drawer>
{/if}
