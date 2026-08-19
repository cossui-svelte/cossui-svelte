<script lang="ts">
  import { Combobox as ComboboxPrimitive } from '@shardsui/svelte/combobox';
  import type { ComponentProps, Snippet } from 'svelte';
  import { cn, type WithoutChildren } from '$lib/utils';

  type Props = Omit<ComponentProps<typeof ComboboxPrimitive.Popup>, 'children'> & {
    children?: Snippet;
    side?: ComponentProps<typeof ComboboxPrimitive.Positioner>['side'];
    align?: ComponentProps<typeof ComboboxPrimitive.Positioner>['align'];
    sideOffset?: ComponentProps<typeof ComboboxPrimitive.Positioner>['sideOffset'];
    alignOffset?: ComponentProps<typeof ComboboxPrimitive.Positioner>['alignOffset'];
    portalProps?: WithoutChildren<ComponentProps<typeof ComboboxPrimitive.Portal>>;
  };

  let {
    ref = $bindable(null),
    class: className,
    children,
    side = 'bottom',
    sideOffset = 4,
    alignOffset = 0,
    align = 'start',
    portalProps,
    ...restProps
  }: Props = $props();
</script>

<ComboboxPrimitive.Portal {...portalProps}>
  <ComboboxPrimitive.Positioner {side} {align} {sideOffset} {alignOffset} class="z-50 select-none">
    <ComboboxPrimitive.Popup
      bind:ref
      class={cn(
        'relative flex max-h-full min-w-(--anchor-width) max-w-(--available-width) origin-(--transform-origin) flex-col rounded-lg border bg-popover not-dark:bg-clip-padding text-foreground shadow-lg/5 outline-none transition-[scale,opacity] before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] data-starting-style:scale-98 data-starting-style:opacity-0 data-ending-style:scale-98 data-ending-style:opacity-0 dark:before:shadow-[0_-1px_--theme(--color-white/6%)]',
        className
      )}
      data-slot="combobox-popup"
      {...restProps}
    >
      {@render children?.()}
    </ComboboxPrimitive.Popup>
  </ComboboxPrimitive.Positioner>
</ComboboxPrimitive.Portal>
