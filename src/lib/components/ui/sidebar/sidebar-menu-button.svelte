<script lang="ts" module>
  import { tv, type VariantProps } from 'tailwind-variants';

  export const sidebarMenuButtonVariants = tv({
    base: "peer/menu-button group/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md px-3 py-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] group-has-data-[sidebar=menu-action]/menu-item:pe-8 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-64 aria-disabled:pointer-events-none aria-disabled:opacity-64 data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground data-active:bg-sidebar-accent data-active:font-medium data-active:text-sidebar-accent-foreground [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 [&>span:last-child]:truncate",
    variants: {
      variant: {
        default: 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        outline:
          'bg-background shadow-[0_0_0_1px_var(--sidebar-border)] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_var(--sidebar-accent)]'
      },
      size: {
        default: 'h-9 text-sm',
        sm: 'h-8 text-xs',
        lg: 'h-14 px-3 text-sm group-data-[collapsible=icon]:p-0!'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  });

  export type SidebarMenuButtonVariant = VariantProps<typeof sidebarMenuButtonVariants>['variant'];
  export type SidebarMenuButtonSize = VariantProps<typeof sidebarMenuButtonVariants>['size'];
</script>

<script lang="ts">
  import { mergeProps } from 'bits-ui';
  import { Tooltip, TooltipContent } from '$lib/components/ui/tooltip/';
  import { cn, type WithElementRef, type WithoutChildrenOrChild } from '$lib/utils.js';
  import { useSidebar } from './context.svelte.js';
  import type { ComponentProps, Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  let {
    ref = $bindable(null),
    class: className,
    children,
    child,
    variant = 'default',
    size = 'default',
    isActive = false,
    tooltipContent,
    tooltipContentProps,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    isActive?: boolean;
    variant?: SidebarMenuButtonVariant;
    size?: SidebarMenuButtonSize;
    tooltipContent?: Snippet | string;
    tooltipContentProps?: WithoutChildrenOrChild<ComponentProps<typeof TooltipContent>>;
    child?: Snippet<[{ props: Record<string, unknown> }]>;
  } = $props();

  const sidebar = useSidebar();

  let tipOpen = $state(false);

  const buttonProps = $derived(
    mergeProps(
      {
        class: cn(sidebarMenuButtonVariants({ variant, size }), className),
        'data-slot': 'sidebar-menu-button',
        'data-sidebar': 'menu-button',
        'data-size': size,
        // Emitted only when active: the `data-active:` variant matches on attribute
        // presence, so `data-active="false"` would still apply the active styles.
        'data-active': isActive || undefined,
        ...restProps
      },
      {
        onpointerenter: tooltipContent ? () => (tipOpen = true) : undefined,
        onpointerleave: tooltipContent ? () => (tipOpen = false) : undefined,
        onfocus: tooltipContent ? () => (tipOpen = true) : undefined,
        onblur: tooltipContent ? () => (tipOpen = false) : undefined
      }
    )
  );
</script>

{#snippet Button()}
  {#if child}
    {@render child({ props: buttonProps })}
  {:else}
    <button bind:this={ref} {...buttonProps}>
      {@render children?.()}
    </button>
  {/if}
{/snippet}

{#if !tooltipContent}
  {@render Button()}
{:else}
  <Tooltip bind:open={tipOpen}>
    {@render Button()}
    <TooltipContent
      customAnchor={ref}
      side="right"
      align="center"
      hidden={sidebar.state !== 'collapsed' || sidebar.isMobile}
      {...tooltipContentProps}
    >
      {#if typeof tooltipContent === 'string'}
        {tooltipContent}
      {:else if tooltipContent}
        {@render tooltipContent()}
      {/if}
    </TooltipContent>
  </Tooltip>
{/if}
