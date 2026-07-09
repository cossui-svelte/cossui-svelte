<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/utils";

  let {
    class: className,
    value,
    ...restProps
  }: HTMLAttributes<HTMLSpanElement> & {
    value?: number | number[];
  } = $props();
</script>

<span
  class={cn("flex justify-end text-sm", className)}
  data-slot="slider-value"
  {...restProps}
>
  {#if Array.isArray(value)}
    {value.join(" – ")}
  {:else}
    {value ?? ""}
  {/if}
</span>
