<script lang="ts">
  import { Popover as PopoverPrimitive } from '@shardsui/svelte/popover';
  import type { ComponentProps, Snippet } from 'svelte';
  import { cn, type WithoutChildren } from '#lib/utils.js';
  import { useComposerEditorContext } from './composer-editor.svelte.js';

  type Props = Omit<ComponentProps<typeof PopoverPrimitive.Popup>, 'children'> & {
    children?: Snippet;
    /** Defaults to the surrounding composer frame. */
    anchor?: ComponentProps<typeof PopoverPrimitive.Positioner>['anchor'];
    side?: ComponentProps<typeof PopoverPrimitive.Positioner>['side'];
    align?: ComponentProps<typeof PopoverPrimitive.Positioner>['align'];
    sideOffset?: ComponentProps<typeof PopoverPrimitive.Positioner>['sideOffset'];
    alignOffset?: ComponentProps<typeof PopoverPrimitive.Positioner>['alignOffset'];
    positionerClass?: string;
    portalProps?: WithoutChildren<ComponentProps<typeof PopoverPrimitive.Portal>>;
  };

  let {
    ref = $bindable(null),
    class: className,
    anchor,
    side = 'top',
    align = 'start',
    sideOffset = 4,
    alignOffset = 0,
    positionerClass,
    portalProps,
    children,
    ...restProps
  }: Props = $props();

  const editor = useComposerEditorContext();
</script>

<PopoverPrimitive.Portal {...portalProps}>
  <PopoverPrimitive.Positioner
    anchor={anchor ?? editor?.rootElement ?? undefined}
    collisionAvoidance={{ fallbackAxisSide: 'none' }}
    {side}
    {align}
    {sideOffset}
    {alignOffset}
    class={cn('z-50 w-(--anchor-width)', positionerClass)}
    data-slot="composer-positioner"
  >
    <PopoverPrimitive.Popup
      bind:ref
      class={cn(
        'relative flex max-h-(--available-height) w-(--anchor-width) max-w-(--available-width) flex-col rounded-lg border bg-popover not-dark:bg-clip-padding text-popover-foreground shadow-lg/5 outline-none transition-opacity before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] data-ending-style:invisible data-starting-style:opacity-0 dark:before:shadow-[0_-1px_--theme(--color-white/6%)]',
        className
      )}
      data-slot="composer-popup"
      role={editor ? 'presentation' : undefined}
      initialFocus={editor ? false : undefined}
      finalFocus={editor ? false : undefined}
      {...restProps}
    >
      {@render children?.()}
    </PopoverPrimitive.Popup>
  </PopoverPrimitive.Positioner>
</PopoverPrimitive.Portal>
