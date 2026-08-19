<script lang="ts">
  import { PreviewCard as PreviewCardPrimitive } from '@shardsui/svelte/preview-card';
  import type { ComponentProps, Snippet } from 'svelte';
  import { cn, type WithoutChildren } from '$lib/utils';

  type Props = Omit<ComponentProps<typeof PreviewCardPrimitive.Popup>, 'children'> & {
    children?: Snippet;
    side?: ComponentProps<typeof PreviewCardPrimitive.Positioner>['side'];
    align?: ComponentProps<typeof PreviewCardPrimitive.Positioner>['align'];
    sideOffset?: ComponentProps<typeof PreviewCardPrimitive.Positioner>['sideOffset'];
    alignOffset?: ComponentProps<typeof PreviewCardPrimitive.Positioner>['alignOffset'];
    showArrow?: boolean;
    portalProps?: WithoutChildren<ComponentProps<typeof PreviewCardPrimitive.Portal>>;
  };

  let {
    ref = $bindable(null),
    class: className,
    children,
    side = 'bottom',
    align = 'center',
    sideOffset = 4,
    alignOffset,
    showArrow = false,
    portalProps,
    ...restProps
  }: Props = $props();
</script>

<PreviewCardPrimitive.Portal {...portalProps}>
  <PreviewCardPrimitive.Positioner {side} {align} {sideOffset} {alignOffset} class="z-50">
    <PreviewCardPrimitive.Popup
      bind:ref
      class={cn(
        'origin-(--transform-origin) z-50 w-64 rounded-lg border border-border bg-popover p-4 text-popover-foreground shadow-black/5 shadow-lg outline-hidden transition-[scale,opacity] duration-150 ease-out data-starting-style:scale-98 data-starting-style:opacity-0 data-ending-style:scale-98 data-ending-style:opacity-0',
        className
      )}
      data-slot="link-preview-content"
      {...restProps}
    >
      {@render children?.()}
      {#if showArrow}
        <PreviewCardPrimitive.Arrow
          class="text-popover -my-px drop-shadow-[0_1px_0_hsl(var(--border))]"
        />
      {/if}
    </PreviewCardPrimitive.Popup>
  </PreviewCardPrimitive.Positioner>
</PreviewCardPrimitive.Portal>
