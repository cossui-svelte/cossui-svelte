<script lang="ts">
	import {
		Dialog as DialogPrimitive,
		type WithoutChildrenOrChild,
	} from "bits-ui";
	import type { Snippet, ComponentProps } from "svelte";
	import { Button } from "$lib/components/ui/button";
	import XIcon from "@lucide/svelte/icons/x";

	import DialogPortal from "./dialog-portal.svelte";
	import DialogOverlay from "./dialog-backdrop.svelte";

	import { cn } from "$lib/utils";

	let {
		ref = $bindable(null),
		class: className,
		bottomStickOnMobile = true,
		size = "default",
		portalProps,
		children,
		showCloseButton = true,
		...restProps
	}: WithoutChildrenOrChild<DialogPrimitive.ContentProps> & {
		size?: "default" | "sm";
		bottomStickOnMobile?: boolean;
		portalProps?: WithoutChildrenOrChild<
			ComponentProps<typeof DialogPortal>
		>;
		children: Snippet;
		showCloseButton?: boolean;
	} = $props();
</script>

<DialogPortal {...portalProps}>
	<DialogOverlay />
	<DialogPrimitive.Content
		bind:ref
		data-slot="dialog-popup"
		data-size={size}
		class={cn(
			// Fixed full-screen layer
			"fixed z-50 w-full flex flex-col gap-0 p-0 outline-none group/dialog-content",
			// Appearance
			"bg-popover text-popover-foreground ring-1 ring-foreground/10",
			// Animation: tw-animate-css enter/exit
			"duration-200 fill-mode-both will-change-transform",
			"data-[state=open]:animate-in data-[state=closed]:animate-out",
			"data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
			// Desktop (sm+): centered dialog with zoom
			"sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2",
			"sm:rounded-xl",
			"data-[size=default]:sm:max-w-lg data-[size=sm]:sm:max-w-xs",
			"sm:data-[state=open]:zoom-in-95 sm:data-[state=closed]:zoom-out-95",
			// Mobile: bottom sheet (when bottomStickOnMobile)
			bottomStickOnMobile && [
				"max-sm:bottom-0 max-sm:inset-x-0 max-sm:max-w-none",
				"max-sm:border-t",
				"max-sm:data-[state=open]:slide-in-from-bottom max-sm:data-[state=closed]:slide-out-to-bottom",
			],
			// Mobile: centered (when not bottom-sticky)
			!bottomStickOnMobile && [
				"max-sm:top-1/2 max-sm:left-1/2 max-sm:-translate-x-1/2 max-sm:-translate-y-1/2",
				"max-sm:rounded-xl",
				"data-[size=default]:max-sm:max-w-xs",
				"max-sm:data-[state=open]:zoom-in-95 max-sm:data-[state=closed]:zoom-out-95",
			],
			className,
		)}
		{...restProps}
	>
		{@render children?.()}
		{#if showCloseButton}
			<DialogPrimitive.Close data-slot="dialog-close">
				{#snippet child({ props })}
					<Button
						variant="ghost"
						aria-label="Close"
						class="absolute end-2 top-2"
						size="icon-sm"
						{...props}
					>
						<XIcon />
						<span class="sr-only">Close</span>
					</Button>
				{/snippet}
			</DialogPrimitive.Close>
		{/if}
	</DialogPrimitive.Content>
</DialogPortal>
