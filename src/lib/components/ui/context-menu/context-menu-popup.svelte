<script lang="ts">
  import { ContextMenu as ContextMenuPrimitive } from '@shardsui/svelte/context-menu';
  import type { ComponentProps, Snippet } from 'svelte';
  import { cn, type WithoutChildren } from '$lib/utils';

  type Props = Omit<ComponentProps<typeof ContextMenuPrimitive.Popup>, 'children'> & {
    children?: Snippet;
    side?: ComponentProps<typeof ContextMenuPrimitive.Positioner>['side'];
    align?: ComponentProps<typeof ContextMenuPrimitive.Positioner>['align'];
    sideOffset?: ComponentProps<typeof ContextMenuPrimitive.Positioner>['sideOffset'];
    alignOffset?: ComponentProps<typeof ContextMenuPrimitive.Positioner>['alignOffset'];
    portalProps?: WithoutChildren<ComponentProps<typeof ContextMenuPrimitive.Portal>>;
  };

  let {
    ref = $bindable(null),
    class: className,
    children,
    side,
    align,
    sideOffset,
    alignOffset,
    portalProps,
    ...restProps
  }: Props = $props();
</script>

<ContextMenuPrimitive.Portal {...portalProps}>
  <ContextMenuPrimitive.Positioner {side} {align} {sideOffset} {alignOffset} class="z-50">
    <ContextMenuPrimitive.Popup
      bind:ref
      class={cn(
        "relative z-50 flex not-[class*='w-']:min-w-32 origin-(--transform-origin) rounded-lg border bg-popover not-dark:bg-clip-padding shadow-lg/5 outline-none before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] focus:outline-none dark:before:shadow-[0_-1px_--theme(--color-white/6%)]",
        className
      )}
      data-slot="context-menu-popup"
      {...restProps}
    >
      <div class="max-h-(--available-height) w-full overflow-y-auto p-1">
        {@render children?.()}
      </div>
    </ContextMenuPrimitive.Popup>
  </ContextMenuPrimitive.Positioner>
</ContextMenuPrimitive.Portal>
