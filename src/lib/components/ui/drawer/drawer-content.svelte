<script lang="ts">
	import XIcon from "@lucide/svelte/icons/x";
	import { Dialog } from "bits-ui";
	import { type ComponentProps, getContext } from "svelte";
	import { buttonVariants } from "$lib/components/ui/button/button-variants";
	import { cn, type WithoutChildrenOrChild } from "$lib/utils";
	import { getCtx } from "./ctx.js";
	import DrawerBar from "./drawer-bar.svelte";
	import DrawerClose from "./drawer-close.svelte";
	import DrawerOverlay from "./drawer-overlay.svelte";
	import DrawerPortal from "./drawer-portal.svelte";
	import DrawerViewport from "./drawer-viewport.svelte";
	import DrawerVisible from "./drawer-visible.svelte";

	type DrawerPosition = "right" | "left" | "top" | "bottom";

	let {
		ref = $bindable(null),
		style = "",
		class: className,
		portalProps,
		children,
		showCloseButton = false,
		position: positionProp,
		variant = "default",
		showBar = false,
		...restProps
	}: Dialog.ContentProps & {
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

	const {
		refs: { drawerRef },
		states: { visible },
		helpers: { getContentStyle },
		methods: { onPress, onDrag, onRelease },
		options: { direction },
	} = getCtx();

	$effect(() => {
		if (ref) drawerRef.set(ref as HTMLDivElement);
	});

	let contentStyle = $derived($getContentStyle(style));
</script>

<DrawerPortal {...portalProps}>
	<DrawerOverlay />
	<DrawerViewport {position} {variant}>
		<Dialog.Content
			bind:ref
			style={contentStyle}
			onpointerdown={(e) => {
				onPress(e);
			}}
			onpointerup={(e) => {
				onRelease(e);
			}}
			onpointermove={(e) => {
				onDrag(e);
			}}
			ontouchend={(e) => {
				onRelease(e);
			}}
			ontouchmove={(e) => {
				onDrag(e);
			}}
			interactOutsideBehavior="ignore"
			escapeKeydownBehavior="ignore"
			preventScroll={false}
			trapFocus={false}
			data-slot="drawer-popup"
			data-vaul-drawer=""
			data-vaul-drawer-direction={$direction}
			data-vaul-drawer-visible={$visible ? "true" : "false"}
			class={cn(
				"relative flex max-h-full min-h-0 w-full min-w-0 flex-col pointer-events-auto bg-popover not-dark:bg-clip-padding text-popover-foreground shadow-lg/5 outline-none will-change-transform",
				"before:pointer-events-none before:absolute before:inset-0 before:shadow-[0_1px_--theme(--color-black/4%)] dark:before:shadow-[0_-1px_--theme(--color-white/6%)]",
				"transition-[transform,opacity] duration-450 ease-[cubic-bezier(0.32,0.72,0,1)]",
				position === "bottom" &&
					"row-start-2 border-t pb-[env(safe-area-inset-bottom,0px)] has-data-[slot=drawer-bar]:pt-2",
				position === "top" &&
					"border-b has-data-[slot=drawer-bar]:pb-2",
				position === "left" &&
					"w-[calc(100%-(--spacing(12)))] max-w-md border-e has-data-[slot=drawer-bar]:pe-2",
				position === "right" &&
					"w-[calc(100%-(--spacing(12)))] max-w-md border-s has-data-[slot=drawer-bar]:ps-2",
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
					"before:hidden sm:rounded-2xl sm:border sm:after:bg-transparent! sm:before:rounded-[calc(var(--radius-2xl)-1px)] sm:**:data-[slot=drawer-footer]:rounded-b-[calc(var(--radius-2xl)-1px)]",
				variant === "straight" && "[--stack-step:0]",
				className,
			)}
			{...restProps}
		>
			<DrawerVisible />
			{@render children?.()}
			{#if showCloseButton}
				<DrawerClose
					aria-label="Close"
					class={cn(
						buttonVariants({size: "icon",  variant: "ghost" }),
						"absolute inset-e-2 top-2",
					)}
				>
					<XIcon />
				</DrawerClose>
			{/if}
			{#if showBar}
				<DrawerBar />
			{/if}
		</Dialog.Content>
	</DrawerViewport>
</DrawerPortal>
