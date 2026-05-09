<script lang="ts">
	import {
		Dialog as DialogPrimitive,
		type WithoutChildrenOrChild,
	} from "bits-ui";
	import type { Snippet, ComponentProps } from "svelte";
	import { Button } from "$lib/components/ui/button";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { DialogOverlay, DialogPortal } from ".";
	import { cn } from "$lib/utils";

	let {
		ref = $bindable(null),
		class: className,
		bottomStickOnMobile = true,
		portalProps,
		children,
		showCloseButton = true,
		...restProps
	}: WithoutChildrenOrChild<DialogPrimitive.ContentProps> & {
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
		data-slot="dialog-content"
		class={cn(
			// Fixed full-screen layer
			"fixed z-50 w-full flex flex-col gap-0 p-0 outline-none group/alert-dialog-content",
			// Appearance
			"bg-popover text-popover-foreground ring-1 ring-foreground/10",
			// Animation base — split by breakpoint so resize doesn't trigger cross-layout transitions
			"sm:transition-[scale,opacity] max-sm:transition-[translate,opacity] duration-200 ease-in-out will-change-transform",
			"data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0",
			"data-starting-style:opacity-0 data-ending-style:opacity-0",
			// Desktop (sm+): centered dialog
			"sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2",
			"sm:rounded-xl",
			"data-[size=default]:sm:max-w-lg data-[size=sm]:sm:max-w-xs",
			"sm:data-closed:zoom-out-95 sm:data-open:zoom-in-95",
			"sm:data-starting-style:scale-98 sm:data-ending-style:scale-98",
			// Mobile: bottom sheet (when bottomStickOnMobile)
			bottomStickOnMobile && [
				"max-sm:bottom-0 max-sm:inset-x-0 max-sm:max-w-none",
				"max-sm:border-t",
				"max-sm:origin-bottom",
				"max-sm:data-starting-style:translate-y-full max-sm:data-ending-style:translate-y-full",
			],
			// Mobile: centered (when not bottom-sticky)
			!bottomStickOnMobile && [
				"max-sm:top-1/2 max-sm:left-1/2 max-sm:-translate-x-1/2 max-sm:-translate-y-1/2",
				"max-sm:rounded-xl",
				"data-[size=default]:max-sm:max-w-xs",
				"max-sm:data-closed:zoom-out-95 max-sm:data-open:zoom-in-95",
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
						class="cn-dialog-close"
						size="icon-sm"
						{...props}
					>
						<IconPlaceholder
							lucide="XIcon"
							tabler="IconX"
							hugeicons="Cancel01Icon"
							phosphor="XIcon"
							remixicon="RiCloseLine"
						/>
						<span class="sr-only">Close</span>
					</Button>
				{/snippet}
			</DialogPrimitive.Close>
		{/if}
	</DialogPrimitive.Content>
</DialogPortal>
