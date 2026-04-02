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
				"bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-1/2 left-1/2 z-50 grid max-h-[calc(100%-2rem)] w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 overflow-y-auto rounded-xl border p-6 shadow-lg duration-200 sm:max-w-100",
				bottomStickOnMobile &&
					"max-sm:grid-rows-[1fr_auto] max-sm:p-0 max-sm:pt-12",
			)}
			{...restProps}
		>
			{@render children?.()}
			<DialogPrimitive.Close
				aria-label="Close"
				class="group focus-visible:border-ring focus-visible:ring-ring/50 absolute top-3 right-3 flex size-7 items-center justify-center rounded transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:pointer-events-none"
			>
				<Button size="icon" variant="ghost">
					<X />
				</Button>
			</DialogPrimitive.Close>
		</DialogPrimitive.Content>
	</div>
</DialogPrimitive.Portal>
