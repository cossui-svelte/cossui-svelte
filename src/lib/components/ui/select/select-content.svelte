<script lang="ts">
  import { Select as SelectPrimitive } from '@shardsui/svelte/select';
  import type { ComponentProps, Snippet } from 'svelte';
  import { cn, type WithoutChildren } from '$lib/utils';
  import SelectScrollDownButton from './select-scroll-down-button.svelte';
  import SelectScrollUpButton from './select-scroll-up-button.svelte';

  type Props = Omit<ComponentProps<typeof SelectPrimitive.Popup>, 'children'> & {
    children?: Snippet;
    side?: ComponentProps<typeof SelectPrimitive.Positioner>['side'];
    align?: ComponentProps<typeof SelectPrimitive.Positioner>['align'];
    sideOffset?: ComponentProps<typeof SelectPrimitive.Positioner>['sideOffset'];
    alignOffset?: ComponentProps<typeof SelectPrimitive.Positioner>['alignOffset'];
    portalProps?: WithoutChildren<ComponentProps<typeof SelectPrimitive.Portal>>;
  };

  let {
    ref = $bindable(null),
    class: className,
    children,
    side = 'bottom',
    align = 'center',
    sideOffset = 4,
    alignOffset = 0,
    portalProps,
    ...restProps
  }: Props = $props();
</script>

<SelectPrimitive.Portal {...portalProps}>
  <SelectPrimitive.Positioner {side} {align} {sideOffset} {alignOffset} class="z-50 select-none">
    <SelectPrimitive.Popup
      bind:ref
      class="origin-(--transform-origin) text-popover-foreground outline-none transition-[scale,opacity] data-starting-style:scale-95 data-starting-style:opacity-0 data-ending-style:scale-95 data-ending-style:opacity-0"
      data-slot="select-popup"
      {...restProps}
    >
      <SelectScrollUpButton />
      <div
        class={cn(
          'relative max-h-[min(24rem,var(--available-height))] min-w-(--anchor-width,8rem) overflow-clip rounded-lg border border-input bg-popover shadow-black/5 shadow-lg **:[[role=group]]:py-1',
          className
        )}
      >
        <SelectPrimitive.List
          class="max-h-[min(24rem,var(--available-height))] overflow-y-auto p-1"
          data-slot="select-list"
        >
          {@render children?.()}
        </SelectPrimitive.List>
      </div>
      <SelectScrollDownButton />
    </SelectPrimitive.Popup>
  </SelectPrimitive.Positioner>
</SelectPrimitive.Portal>
