<script lang="ts">
  import { ContextMenu as ContextMenuPrimitive } from '@shardsui/svelte/context-menu';
  import type { ComponentProps, Snippet } from 'svelte';
  import { cn, type WithoutChildren } from '$lib/utils';

  type Props = Omit<ComponentProps<typeof ContextMenuPrimitive.Popup>, 'children'> & {
    children?: Snippet;
    align?: ComponentProps<typeof ContextMenuPrimitive.Positioner>['align'];
    sideOffset?: ComponentProps<typeof ContextMenuPrimitive.Positioner>['sideOffset'];
    alignOffset?: ComponentProps<typeof ContextMenuPrimitive.Positioner>['alignOffset'];
    portalProps?: WithoutChildren<ComponentProps<typeof ContextMenuPrimitive.Portal>>;
  };

  let {
    ref = $bindable(null),
    class: className,
    children,
    sideOffset = 0,
    align = 'start',
    alignOffset,
    portalProps,
    ...restProps
  }: Props = $props();

  const defaultAlignOffset = align !== 'center' ? -5 : undefined;
</script>

<ContextMenuPrimitive.Portal {...portalProps}>
  <ContextMenuPrimitive.Positioner
    {align}
    alignOffset={alignOffset ?? defaultAlignOffset}
    {sideOffset}
    side="inline-end"
    class="z-50"
    data-slot="context-menu-positioner"
  >
    <ContextMenuPrimitive.Popup
      bind:ref
      class={cn(
        "relative z-50 flex not-[class*='w-']:min-w-32 origin-(--transform-origin) rounded-lg border bg-popover not-dark:bg-clip-padding shadow-lg/5 outline-none before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] focus:outline-none dark:before:shadow-[0_-1px_--theme(--color-white/6%)]",
        className
      )}
      data-slot="context-menu-sub-content"
      {...restProps}
    >
      <div class="max-h-(--available-height) w-full overflow-y-auto p-1">
        {@render children?.()}
      </div>
    </ContextMenuPrimitive.Popup>
  </ContextMenuPrimitive.Positioner>
</ContextMenuPrimitive.Portal>
