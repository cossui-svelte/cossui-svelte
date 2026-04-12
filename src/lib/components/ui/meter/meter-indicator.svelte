<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { getContext } from "svelte";
  import { cn } from "$lib/utils.js";
  import { METER_CONTEXT_KEY, type MeterContext } from "./meter.svelte";

  type Props = HTMLAttributes<HTMLDivElement>;

  let { class: className, ...restProps }: Props = $props();

  const ctx = getContext<MeterContext>(METER_CONTEXT_KEY);
</script>

<div
  class={cn("h-full bg-primary transition-all duration-500", className)}
  data-slot="meter-indicator"
  style="width: {ctx.percentage}%"
  {...restProps}
></div>
