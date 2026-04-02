<script lang="ts">
	import type { Snippet } from "svelte";

	import { DialogBackdrop } from ".";
	import { cn } from "$lib/utils.js";

	import { X } from "lucide-svelte";
	import { Dialog as DialogPrimitive, type WithoutChild } from "bits-ui";
	import Button from "../button/button.svelte";

	let {
		children,
		class: className,
		showCloseButton = true,
		bottomStickOnMobile = true,
		portalProps,
		ref = $bindable(null),
		...restProps
	}: WithoutChild<DialogPrimitive.ContentProps> & {
		children: Snippet;
		showCloseButton?: boolean;
		bottomStickOnMobile?: boolean;
		portalProps?: DialogPrimitive.PortalProps;
	} = $props();
</script>

<DialogPrimitive.Portal {...portalProps}>
	<DialogBackdrop />
	<div
		class={cn(
			"fixed inset-0 z-50 grid grid-rows-[1fr_auto_3fr] justify-items-center p-4",
			className,
		)}
		data-slot="dialog-viewport"
	>
		<DialogPrimitive.Content
			bind:ref
			class={cn(
				"relative row-start-2 flex max-h-full min-h-0 w-full min-w-0 max-w-lg origin-center flex-col rounded-2xl border bg-popover not-dark:bg-clip-padding text-popover-foreground opacity-[calc(1-var(--nested-dialogs))] shadow-lg/5 transition-[scale,opacity,translate] duration-200 ease-in-out will-change-transform before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-2xl)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] data-ending-style:opacity-0 data-starting-style:opacity-0 sm:scale-[calc(1-0.1*var(--nested-dialogs))] sm:data-ending-style:scale-98 sm:data-starting-style:scale-98 dark:before:shadow-[0_-1px_--theme(--color-white/6%)]",
				bottomStickOnMobile &&
					"max-sm:max-w-none max-sm:origin-bottom max-sm:rounded-none max-sm:border-x-0 max-sm:border-t max-sm:border-b-0 max-sm:data-ending-style:translate-y-4 max-sm:data-starting-style:translate-y-4 max-sm:before:hidden max-sm:before:rounded-none",
				className,
			)}
			data-slot="dialog-popup"
			{...restProps}
		>
			{@render children?.()}
			<DialogPrimitive.Close
				aria-label="Close"
				class="absolute end-2 top-2"
			>
				<Button size="icon" variant="ghost">
					<X />
				</Button>
			</DialogPrimitive.Close>
		</DialogPrimitive.Content>
	</div>
</DialogPrimitive.Portal>
