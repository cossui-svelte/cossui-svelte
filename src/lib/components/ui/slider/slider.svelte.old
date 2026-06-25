<script lang="ts">
  import {
    Slider as SliderPrimitive,
    type WithoutChildrenOrChild,
  } from "bits-ui";
  import { on } from "svelte/events";
  import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "$lib/components/ui/tooltip";
  import { cn } from "$lib/utils";

  let {
    class: className,
    orientation = "horizontal",
    ref = $bindable(null),
    showTooltip = false,
    tooltipContent,
    value = $bindable(),
    ...restProps
  }: WithoutChildrenOrChild<
    SliderPrimitive.RootProps & {
      showTooltip?: boolean;
      tooltipContent?: (value: number) => number | string;
    }
  > = $props();

  let tooltipOpen = $state(false);

  function handlePointerUp() {
    tooltipOpen = false;
  }

  function handlePointerDown() {
    tooltipOpen = true;
  }

  $effect(() => {
    if (showTooltip) {
      const cleanup = on(document, "pointerup", handlePointerUp);
      return cleanup;
    }
  });
</script>

{#snippet thumb(props: SliderPrimitive.ThumbProps)}
  <SliderPrimitive.Thumb
    class="block size-5 shrink-0 select-none rounded-full border border-input bg-white not-dark:bg-clip-padding shadow-xs/5 outline-none transition-[box-shadow,scale] before:absolute before:inset-0 before:rounded-full before:shadow-[0_1px_--theme(--color-black/4%)] has-focus-visible:ring-[3px] has-focus-visible:ring-ring/24 data-active:scale-120 sm:size-4 dark:border-background dark:has-focus-visible:ring-ring/48 [:has(*:focus-visible),[data-active]]:shadow-none"
    data-slot="slider-thumb"
    {...props}
  />
{/snippet}

<SliderPrimitive.Root
  bind:ref
  bind:value={value as never}
  {orientation}
  class={cn(
    "data-[orientation=horizontal]:w-full",
    "relative flex w-full touch-none items-center select-none disabled:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
    "flex touch-none select-none data-disabled:pointer-events-none data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=horizontal]:w-full data-[orientation=horizontal]:min-w-44 data-[orientation=vertical]:flex-col data-disabled:opacity-64",

    className,
  )}
  {...restProps}
>
  {#snippet children({ thumbItems })}
    <span
      data-orientation={orientation}
      class="bg-secondary relative grow select-none before:absolute before:rounded-full before:bg-input data-[orientation=horizontal]:h-1 data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-1 data-[orientation=horizontal]:before:inset-x-0.5 data-[orientation=vertical]:before:inset-x-0 data-[orientation=horizontal]:before:inset-y-0 data-[orientation=vertical]:before:inset-y-0.5"
      // class="bg-secondary relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-2 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2"
      data-slot="slider-track"
    >
      <SliderPrimitive.Range
        data-orientation={orientation}
        class="bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
        // class="select-none rounded-full bg-primary data-[orientation=horizontal]:ms-0.5 data-[orientation=vertical]:mb-0.5"
        data-slot="slider-indicator"
      />
    </span>
    {#each thumbItems as thumbItem (thumbItem.index)}
      {#if !showTooltip}
        {@render thumb({ index: thumbItem.index })}
      {:else}
        <TooltipProvider>
          <Tooltip bind:open={tooltipOpen}>
            <TooltipTrigger>
              {#snippet child({ props })}
                {@render thumb({
                  index: thumbItem.index,
                  ...props,
                  onpointerdown: handlePointerDown,
                })}
              {/snippet}
            </TooltipTrigger>
            <TooltipContent
              side={orientation === "vertical" ? "right" : "top"}
              sideOffset={8}
              class="border-input bg-popover text-muted-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 overflow-hidden rounded-md border px-2 py-1 text-xs outline-hidden"
            >
              {#if Array.isArray(value)}
                {tooltipContent
                  ? tooltipContent(value[thumbItem.index]!)
                  : value[thumbItem.index]!}
              {:else}
                {tooltipContent ? tooltipContent(value!) : value!}
              {/if}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      {/if}
    {/each}
  {/snippet}
</SliderPrimitive.Root>
