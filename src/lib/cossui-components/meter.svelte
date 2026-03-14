<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../utils.js";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    value?: number;
    min?: number;
    max?: number;
    children?: Snippet;
  }

  let { class: className, value = 0, min = 0, max = 100, children, ...restProps }: Props =
    $props();

  const percentage = $derived(((value - min) / (max - min)) * 100);
</script>

<div
  aria-valuenow={value}
  aria-valuemin={min}
  aria-valuemax={max}
  class={cn("flex w-full flex-col gap-2", className)}
  role="meter"
  {...restProps}
>
  {#if children}
    {@render children()}
  {:else}
    <div
      class="block h-2 w-full overflow-hidden bg-input"
      data-slot="meter-track"
    >
      <div
        class="bg-primary transition-all duration-500"
        data-slot="meter-indicator"
        style="width: {percentage}%"
      ></div>
    </div>
  {/if}
</div>
