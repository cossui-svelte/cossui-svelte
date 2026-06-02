<script lang="ts">
	import { AlertDialog as AlertDialogPrimitive } from "bits-ui";
	import AlertDialogPortal from "./alert-dialog-portal.svelte";
	import AlertDialogOverlay from "./alert-dialog-overlay.svelte";
	import {
		cn,
		type WithoutChild,
		type WithoutChildrenOrChild,
	} from "$lib/utils.js";
	import type { ComponentProps } from "svelte";

	let {
		ref = $bindable(null),
		class: className,
		bottomStickOnMobile = true,
		size = "default",
		portalProps,
		...restProps
	}: WithoutChild<AlertDialogPrimitive.ContentProps> & {
		size?: "default" | "sm";
		bottomStickOnMobile?: boolean;
		portalProps?: WithoutChildrenOrChild<
			ComponentProps<typeof AlertDialogPortal>
		>;
	} = $props();
</script>

<AlertDialogPortal {...portalProps}>
	<AlertDialogOverlay />

	<AlertDialogPrimitive.Content
		bind:ref
		data-slot="alert-dialog-popup"
		data-size={size}
		class={cn(
			// Fixed full-screen layer
			"fixed z-50 w-full flex flex-col gap-0 p-0 outline-none group/alert-dialog-content",
			// Appearance
			"bg-popover text-popover-foreground ring-1 ring-foreground/10",
			// Animation base
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
	/>
</AlertDialogPortal>
