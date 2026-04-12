<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { getContext } from "svelte";
  import { cn } from "$lib/utils.js";
  import { METER_CONTEXT_KEY, type MeterContext } from "./meter.svelte";

  type Props = HTMLAttributes<HTMLSpanElement>;

  let { class: className, ...restProps }: Props = $props();

  const ctx = getContext<MeterContext>(METER_CONTEXT_KEY);
</script>

<span
  class={cn("text-foreground text-sm tabular-nums", className)}
  data-slot="meter-value"
  {...restProps}
>{Math.round(ctx.percentage)}%</span>
