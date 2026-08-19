<script lang="ts">
  import { Slider as SliderPrimitive } from '@shardsui/svelte/slider';
  import { on } from 'svelte/events';
  import { Tooltip, TooltipContent } from '$lib/components/ui/tooltip';
  import { cn } from '$lib/utils';

  let {
    class: className,
    orientation = 'horizontal',
    ref = $bindable(null),
    showTooltip = false,
    thumbCollisionBehavior = 'swap',
    tooltipContent,
    value = $bindable(),
    ...restProps
  }: {
    class?: string;
    orientation?: 'horizontal' | 'vertical';
    ref?: HTMLElement | null;
    showTooltip?: boolean;
    /** Whether thumbs swap position (push past one another) or can overlap/cross when dragged into each other. */
    thumbCollisionBehavior?: 'swap' | 'none';
    tooltipContent?: (value: number) => number | string;
    value?: number | number[];
    [key: string]: unknown;
  } = $props();

  let tooltipOpen = $state(false);
  let thumbRefs = $state<Record<number, HTMLElement | null>>(
    Object.fromEntries(
      Array.from({ length: Array.isArray(value) ? value.length : 1 }, (_, i) => [i, null])
    )
  );

  function handlePointerUp() {
    tooltipOpen = false;
  }

  function handlePointerDown() {
    tooltipOpen = true;
  }

  $effect(() => {
    if (showTooltip) {
      return on(document, 'pointerup', handlePointerUp);
    }
  });

  // `bind:ref` requires an already-`null` (not `undefined`) slot, so every thumb index needs
  // an entry before its first render.
  $effect.pre(() => {
    const count = Array.isArray(value) ? value.length : 1;
    for (let i = 0; i < count; i++) {
      if (!(i in thumbRefs)) thumbRefs[i] = null;
    }
  });
</script>

{#snippet thumb(index: number, extra?: Record<string, unknown>)}
  <SliderPrimitive.Thumb
    {index}
    bind:ref={thumbRefs[index]}
    class="block size-5 shrink-0 select-none rounded-full border border-input bg-white not-dark:bg-clip-padding shadow-xs/5 outline-none transition-[box-shadow,scale] before:absolute before:inset-0 before:rounded-full before:shadow-[0_1px_--theme(--color-black/4%)] has-focus-visible:ring-[3px] has-focus-visible:ring-ring/24 data-dragging:scale-120 sm:size-4 dark:border-background dark:has-focus-visible:ring-ring/48 [:has(*:focus-visible),[data-dragging]]:shadow-none"
    data-slot="slider-thumb"
    {...extra}
  />
{/snippet}

<SliderPrimitive.Root
  bind:ref
  bind:value
  thumbCollisionBehavior={thumbCollisionBehavior === 'none' ? 'none' : 'push'}
  {orientation}
  class={cn('data-[orientation=horizontal]:w-full', className)}
  data-slot="slider"
  {...restProps as Record<string, unknown>}
>
  {#snippet children(state)}
    <SliderPrimitive.Control
      class="flex touch-none select-none data-disabled:pointer-events-none data-[orientation=horizontal]:w-full data-[orientation=horizontal]:min-w-44 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:flex-col data-disabled:opacity-64"
      data-slot="slider-control"
    >
      <SliderPrimitive.Track
        class="grow select-none before:absolute before:rounded-full before:bg-input data-[orientation=horizontal]:h-1 data-[orientation=horizontal]:w-full data-[orientation=horizontal]:before:inset-x-0.5 data-[orientation=horizontal]:before:inset-y-0 data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1 data-[orientation=vertical]:before:inset-x-0 data-[orientation=vertical]:before:inset-y-0.5"
        data-slot="slider-track"
      >
        <SliderPrimitive.Indicator
          class="select-none rounded-full bg-primary data-[orientation=horizontal]:ms-0.5 data-[orientation=vertical]:mb-0.5"
          data-slot="slider-indicator"
        />
        {#each state.values as _thumbValue, index (index)}
          {#if !showTooltip}
            {@render thumb(index)}
          {:else}
            <Tooltip bind:open={tooltipOpen}>
              {@render thumb(index, { onpointerdown: handlePointerDown })}
              <TooltipContent
                customAnchor={thumbRefs[index]}
                side={orientation === 'vertical' ? 'right' : 'top'}
                sideOffset={8}
                class="border-input bg-popover text-muted-foreground"
              >
                {@const v = Array.isArray(value) ? (value[index] ?? 0) : (value ?? 0)}
                {tooltipContent ? tooltipContent(v) : v}
              </TooltipContent>
            </Tooltip>
          {/if}
        {/each}
      </SliderPrimitive.Track>
    </SliderPrimitive.Control>
  {/snippet}
</SliderPrimitive.Root>
