<script lang="ts">
  import { Tooltip } from "bits-ui";
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { tv, type VariantProps } from "tailwind-variants";
  import { getSidebarContext } from "./sidebar-context.js";

  const sidebarMenuButtonVariants = tv({
    base: "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-lg p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pe-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg:not([class*='size-'])]:size-4 [&>svg]:shrink-0",
    defaultVariants: {
      size: "default",
      variant: "default",
    },
    variants: {
      size: {
        default: "h-8 text-sm",
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!",
        sm: "h-7 text-xs",
      },
      variant: {
        default:
          "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
    },
  });

  type ButtonVariants = VariantProps<typeof sidebarMenuButtonVariants>;

  // Intentionally loose to support both Tooltip.Trigger and svelte:element spreading
  interface Props extends Omit<HTMLButtonAttributes, "size"> {
    children?: Snippet;
    href?: string;
    isActive?: boolean;
    size?: ButtonVariants["size"];
    tooltip?: string | Record<string, unknown>;
    variant?: ButtonVariants["variant"];
  }

  let {
    class: className,
    href,
    isActive = false,
    variant = "default",
    size = "default",
    tooltip,
    children,
    ...restProps
  }: Props = $props();

  const ctx = getSidebarContext();

  const buttonClass = $derived(
    sidebarMenuButtonVariants({ class: className as string | undefined, size, variant }),
  );
  const tooltipText = $derived(
    typeof tooltip === "string" ? tooltip : undefined,
  );
  const tooltipExtraProps = $derived(
    typeof tooltip === "object" && tooltip !== null ? tooltip : {},
  );
</script>

{#if tooltip !== undefined}
  <Tooltip.Root>
    <Tooltip.Trigger
      class={buttonClass}
      data-active={isActive}
      data-sidebar="menu-button"
      data-size={size}
      data-slot="sidebar-menu-button"
      {...restProps as Tooltip.TriggerProps}
    >
      {@render children?.()}
    </Tooltip.Trigger>
    {#if ctx.state === "collapsed" && !ctx.isMobile}
      <Tooltip.Portal>
        <Tooltip.Content
          align="center"
          side="right"
          sideOffset={4}
          class="relative flex origin-[--bits-tooltip-content-transform-origin] text-balance rounded-md border bg-popover not-dark:bg-clip-padding text-popover-foreground text-xs shadow-md/5 transition-[scale,opacity] before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-md)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] data-[state=closed]:scale-98 data-[state=closed]:opacity-0 data-[state=open]:scale-100 data-[state=open]:opacity-100 dark:before:shadow-[0_-1px_--theme(--color-white/6%)]"
          data-slot="tooltip-popup"
          {...tooltipExtraProps}
        >
          <div
            class="relative size-full overflow-clip px-2 py-1"
            data-slot="tooltip-viewport"
          >
            {tooltipText ?? ""}
          </div>
        </Tooltip.Content>
      </Tooltip.Portal>
    {/if}
  </Tooltip.Root>
{:else}
  <svelte:element
    this={href ? "a" : "button"}
    {href}
    type={!href ? "button" : undefined}
    class={buttonClass}
    data-active={isActive}
    data-sidebar="menu-button"
    data-size={size}
    data-slot="sidebar-menu-button"
    {...restProps}
  >
    {@render children?.()}
  </svelte:element>
{/if}
