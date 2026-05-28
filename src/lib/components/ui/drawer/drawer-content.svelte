<script lang="ts">
	import { Drawer as DrawerPrimitive } from "$lib/vaul";
	import { cn } from "$lib/utils.js";
	import { getContext, type ComponentProps } from "svelte";
	import type { WithoutChildrenOrChild } from "$lib/utils.js";
	import DrawerViewport from "./drawer-viewport.svelte";
	import DrawerOverlay from "./drawer-overlay.svelte";
	import DrawerPortal from "./drawer-portal.svelte";

	type DrawerPosition = "right" | "left" | "top" | "bottom";

	let {
		ref = $bindable(null),
		class: className,
		portalProps,
		children,
		showCloseButton = false,
		position: positionProp,
		variant = "default",
		showBar = false,
		...restProps
	}: DrawerPrimitive.ContentProps & {
		showCloseButton?: boolean;
		position?: DrawerPosition;
		variant?: "default" | "straight" | "inset";
		showBar?: boolean;
		portalProps?: WithoutChildrenOrChild<
			ComponentProps<typeof DrawerPortal>
		>;
	} = $props();

	const ctx = getContext<{ position: () => DrawerPosition } | undefined>(
		"drawer-position",
	);
	const position = $derived(positionProp ?? ctx?.position() ?? "bottom");

	// const handle =
	// "bg-muted mx-auto mt-4 hidden h-1.5 w-[100px] shrink-0 rounded-full group-data-[vaul-drawer-direction=bottom]/drawer-content:block";
</script>

<DrawerPortal {...portalProps}>
	<DrawerOverlay />
	<DrawerViewport {position} {variant}>
		<DrawerPrimitive.Content
			bind:ref
			data-slot="drawer-content"
			class={cn(
				"bg-popover text-popover-foreground flex h-auto flex-col text-sm z-50",
				" data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:rounded-t-xl data-[vaul-drawer-direction=bottom]:border-t data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:rounded-r-xl data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:rounded-l-xl data-[vaul-drawer-direction=right]:border-l data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-b-xl data-[vaul-drawer-direction=top]:border-b data-[vaul-drawer-direction=left]:sm:max-w-sm data-[vaul-drawer-direction=right]:sm:max-w-sm fixed",
				// // "relative flex",
				"max-h-full min-h-0 w-full min-w-0 flex-col bg-popover not-dark:bg-clip-padding text-popover-foreground shadow-lg/5 outline-none will-change-transform",
				"before:pointer-events-none before:absolute before:inset-0 before:shadow-[0_1px_--theme(--color-black/4%)] dark:before:shadow-[0_-1px_--theme(--color-white/6%)]",
				"transition-[transform,opacity] duration-450 ease-[cubic-bezier(0.32,0.72,0,1)]",
				position === "bottom" &&
					"row-start-2 border-t pb-[env(safe-area-inset-bottom,0px)] data-[state=open]:translate-y-0 data-[state=closed]:translate-y-full has-data-[slot=drawer-bar]:pt-2",
				position === "top" &&
					"border-b data-[state=open]:translate-y-0 data-[state=closed]:-translate-y-full has-data-[slot=drawer-bar]:pb-2",
				position === "left" &&
					"w-[calc(100%--(--spacing(12)))] max-w-md border-e data-[state=open]:translate-x-0 data-[state=closed]:-translate-x-full has-data-[slot=drawer-bar]:pe-2",
				position === "right" &&
					"w-[calc(100%--(--spacing(12)))] max-w-md border-s data-[state=open]:translate-x-0 data-[state=closed]:translate-x-full has-data-[slot=drawer-bar]:ps-2",
				variant !== "straight" &&
					cn(
						position === "bottom" &&
							"rounded-t-2xl before:rounded-t-[calc(var(--radius-2xl)-1px)]",
						position === "top" &&
							"rounded-b-2xl before:rounded-b-[calc(var(--radius-2xl)-1px)] **:data-[slot=drawer-footer]:rounded-b-[calc(var(--radius-2xl)-1px)]",
						position === "left" &&
							"rounded-e-2xl before:rounded-e-[calc(var(--radius-2xl)-1px)] **:data-[slot=drawer-footer]:rounded-ee-[calc(var(--radius-2xl)-1px)]",
						position === "right" &&
							"rounded-s-2xl before:rounded-s-[calc(var(--radius-2xl)-1px)] **:data-[slot=drawer-footer]:rounded-es-[calc(var(--radius-2xl)-1px)]",
					),
				variant === "inset" &&
					"before:hidden sm:rounded-2xl sm:border sm:before:rounded-[calc(var(--radius-2xl)-1px)] sm:**:data-[slot=drawer-footer]:rounded-b-[calc(var(--radius-2xl)-1px)]",

				className,
			)}
			{...restProps}
		>
			{@render children?.()}
		</DrawerPrimitive.Content>
	</DrawerViewport>
</DrawerPortal>
