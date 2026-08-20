<script lang="ts">
  import { Menu as MenuPrimitive } from '@shardsui/svelte/menu';
  import type { ComponentProps, Snippet } from 'svelte';
  import { cn, type WithoutChildren } from '$lib/utils';

  type Props = Omit<ComponentProps<typeof MenuPrimitive.Popup>, 'children'> & {
    children?: Snippet;
    side?: ComponentProps<typeof MenuPrimitive.Positioner>['side'];
    align?: ComponentProps<typeof MenuPrimitive.Positioner>['align'];
    sideOffset?: ComponentProps<typeof MenuPrimitive.Positioner>['sideOffset'];
    alignOffset?: ComponentProps<typeof MenuPrimitive.Positioner>['alignOffset'];
    portalProps?: WithoutChildren<ComponentProps<typeof MenuPrimitive.Portal>>;
  };

  let {
    ref = $bindable(null),
    class: className,
    children,
    side = 'bottom',
    align = 'center',
    sideOffset = 4,
    alignOffset,
    portalProps,
    ...restProps
  }: Props = $props();
</script>

<MenuPrimitive.Portal {...portalProps}>
  <MenuPrimitive.Positioner
    {side}
    {align}
    {sideOffset}
    {alignOffset}
    class="z-50"
    data-slot="menu-positioner"
  >
    <MenuPrimitive.Popup
      bind:ref
      class={cn(
        "relative z-50 flex not-[class*='w-']:min-w-32 origin-(--transform-origin) rounded-lg border bg-popover not-dark:bg-clip-padding shadow-lg/5 outline-none before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] focus:outline-none dark:before:shadow-[0_-1px_--theme(--color-white/6%)]",
        className
      )}
      data-slot="menu-popup"
      {...restProps}
    >
      <div class="max-h-(--available-height) w-full overflow-y-auto p-1">
        {@render children?.()}
      </div>
    </MenuPrimitive.Popup>
  </MenuPrimitive.Positioner>
</MenuPrimitive.Portal>
