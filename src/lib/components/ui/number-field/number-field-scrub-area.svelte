<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { getContext } from "svelte";
  import { Label } from "$lib/components/ui/label/index.js";
  import { cn } from "$lib/utils.js";
  import { NUMBER_FIELD_CONTEXT_KEY, type NumberFieldContext } from "./number-field.svelte";

  interface Props extends HTMLAttributes<HTMLSpanElement> {
    label: string;
    children?: Snippet;
  }

  let { label, class: className, children, ...restProps }: Props = $props();

  const ctx = getContext<NumberFieldContext>(NUMBER_FIELD_CONTEXT_KEY);

  if (!ctx) {
    throw new Error(
      "NumberFieldScrubArea must be used within a NumberField component for accessibility.",
    );
  }

  let scrubEl = $state<HTMLSpanElement | null>(null);
  let isScrubbing = $state(false);
  let lastX = $state(0);
  let showCursor = $state(false);
  let cursorX = $state(0);
  let cursorY = $state(0);

  function handlePointerDown(e: PointerEvent) {
    if (ctx.disabled) return;
    isScrubbing = true;
    lastX = e.clientX;
    showCursor = true;
    cursorX = e.clientX;
    cursorY = e.clientY;
    scrubEl?.setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: PointerEvent) {
    if (!isScrubbing) return;
    cursorX = e.clientX;
    cursorY = e.clientY;
    const delta = e.clientX - lastX;
    lastX = e.clientX;
    if (delta !== 0) {
      const change = delta * ctx.step;
      ctx.setValue((ctx.value ?? 0) + change);
    }
  }

  function handlePointerUp(e: PointerEvent) {
    isScrubbing = false;
    showCursor = false;
    scrubEl?.releasePointerCapture(e.pointerId);
  }
</script>

<span
  bind:this={scrubEl}
  class={cn("flex cursor-ew-resize select-none", className)}
  data-slot="number-field-scrub-area"
  role="presentation"
  onpointerdown={handlePointerDown}
  onpointermove={handlePointerMove}
  onpointerup={handlePointerUp}
  {...restProps}
>
  <Label class="cursor-ew-resize" for={ctx.fieldId}>
    {label}
  </Label>
  {#if children}
    {@render children()}
  {/if}
</span>

{#if showCursor && isScrubbing}
  <span
    class="pointer-events-none fixed z-50 drop-shadow-[0_1px_1px_#0008] filter"
    style="left:{cursorX}px;top:{cursorY}px;transform:translate(-50%,-50%)"
    aria-hidden="true"
  >
    <svg
      fill="black"
      height="14"
      stroke="white"
      viewBox="0 0 24 14"
      width="26"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19.5 5.5L6.49737 5.51844V2L1 6.9999L6.5 12L6.49737 8.5L19.5 8.5V12L25 6.9999L19.5 2V5.5Z" />
    </svg>
  </span>
{/if}
