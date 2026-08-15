<script lang="ts">
  import PipetteIcon from '@lucide/svelte/icons/pipette';
  import { type HueyColor } from '@hueycolor/core';
  import {
    AlphaInput,
    AlphaSlider,
    BlueInput,
    ColorDropper,
    GreenInput,
    HexInput,
    HueInput,
    HueSlider,
    HueyRoot,
    LightnessInput,
    RedInput,
    SaturationArea,
    SaturationInput
  } from '@hueycolor/svelte';
  import { Popover, PopoverPopup, PopoverTrigger } from '$lib/components/ui/popover';
  import ColorPickerSwatches from './color-picker-swatches.svelte';

  let {
    color = $bindable(),
    swatches = $bindable(),
    showSaturationArea = true,
    showInputs = true,
    showColorDropper = true,
    showColorSliders = true,
    swatchesEditable = true
  }: {
    color: string | HueyColor;
    swatches?: string[];
    showSaturationArea?: boolean;
    showInputs?: boolean;
    showColorDropper?: boolean;
    showColorSliders?: boolean;
    swatchesEditable?: boolean;
  } = $props();

  // let color = $state(hueyColor("#acff00"));
  let colorFormat = $state<'hex' | 'hsl' | 'rgb'>('hex');

  const inputBase = 'text-center h-6 text-xs px-1 min-w-0 w-full border-0 bg-muted text-foreground';
  const inputFirst = `${inputBase} rounded-l`;
  const inputMiddle = `${inputBase} border-l-2 border-l-popover`;
  const inputAlpha = `${inputBase} border-l-2 border-l-popover rounded-r w-12 shrink-0`;
</script>

{#snippet marker(selectedColor)}
  <span
    class="inline-block size-4 shrink-0 rounded-full ring-2 ring-offset-2 ring-offset-background transition duration-200 hover:ring-[--marker-ring-color]"
    style:background={selectedColor.toString()}
    style:--marker-ring-color={selectedColor.toString()}
  ></span>
{/snippet}

{#snippet child()}
  {#if showSaturationArea}
    <div class="p-4">
      <SaturationArea
        colorFormat="hex"
        class="w-full! h-36! rounded-lg! shadow-[0_0_1px_1px_var(--border)]"
      />
    </div>
  {/if}
  {#if showColorDropper || showColorSliders}
    <div class={[showInputs || swatches ? 'px-4' : 'px-4 py-4', 'flex gap-2']}>
      {#if showColorDropper}
        <ColorDropper
          class="text-muted-foreground hover:text-foreground bg-transparent border-0 p-0 transition-colors"
        >
          <PipetteIcon />
        </ColorDropper>
      {/if}
      {#if showColorSliders}
        <div class="flex flex-col gap-2 px-2 flex-1">
          <HueSlider class="[--huey-slider-track-width:100%]! [--huey-slider-track-height:24px]!" />
          <AlphaSlider
            class="[--huey-slider-track-width:100%]! [--huey-slider-track-height:24px]!"
          />
        </div>
      {/if}
    </div>
  {/if}
  {#if showInputs}
    <div class="flex gap-2 p-4">
      <label for="color-format" class="flex">
        <span class="sr-only">Color Format</span>
        <select
          id="color-format"
          bind:value={colorFormat}
          name="color-format"
          class="bg-transparent border border-input rounded text-foreground text-xs h-6 pl-1"
        >
          <option value="hex">Hex</option>
          <option value="rgb">RGB</option>
          <option value="hsl">HSL</option>
        </select>
      </label>
      <div class="flex-1 flex">
        {#if colorFormat === 'hex'}
          <label for="hex-input" class="flex">
            <span class="sr-only">Hex</span>
            <HexInput id="hex-input" alpha={false} class={inputFirst} />
          </label>
        {/if}
        {#if colorFormat === 'hsl'}
          <label for="hue" class="flex">
            <span class="sr-only">Hue</span>
            <HueInput id="hue" class={inputFirst} />
          </label>
          <label for="saturation" class="flex">
            <span class="sr-only">Saturation</span>
            <SaturationInput id="saturation" class={inputMiddle} />
          </label>
          <label for="lightness" class="flex">
            <span class="sr-only">Lightness</span>
            <LightnessInput id="lightness" class={inputMiddle} />
          </label>
        {/if}
        {#if colorFormat === 'rgb'}
          <label for="red" class="flex">
            <span class="sr-only">Red</span>
            <RedInput id="red" class={inputFirst} />
          </label>
          <label for="green" class="flex">
            <span class="sr-only">Green</span>
            <GreenInput id="green" class={inputMiddle} />
          </label>
          <label for="blue" class="flex">
            <span class="sr-only">Blue</span>
            <BlueInput id="blue" class={inputMiddle} />
          </label>
        {/if}
        <label for="alpha" class="flex">
          <span class="sr-only">Alpha</span>
          <AlphaInput id="alpha" class={inputAlpha} />
        </label>
      </div>
    </div>
  {/if}
  {#if swatches}
    <div class={[ (showInputs||showColorDropper||showColorSliders||showSaturationArea) && "border-t border-border", "p-4"]}>
      <ColorPickerSwatches bind:swatches editable={swatchesEditable} />
    </div>
  {/if}
{/snippet}

<Popover>
  <PopoverTrigger>
    {@render marker(color)}
  </PopoverTrigger>
  <PopoverPopup class="w-70 p-0">
    <HueyRoot bind:color>
      {@render child()}
    </HueyRoot>
  </PopoverPopup>
</Popover>
