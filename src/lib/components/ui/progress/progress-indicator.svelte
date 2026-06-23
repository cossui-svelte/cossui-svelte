<script lang="ts">
  import { getContext } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/utils";
  import {
    PROGRESS_CONTEXT_KEY,
    type ProgressContext,
  } from "./progress.svelte";

  type Props = HTMLAttributes<HTMLDivElement>;

  let { class: className, ...restProps }: Props = $props();

  const ctx = getContext<ProgressContext>(PROGRESS_CONTEXT_KEY);
</script>

<div
  class={cn(
    "h-full bg-primary transition-all duration-500",
    ctx.indeterminate && "animate-indeterminate-progress w-full",
    className,
  )}
  data-slot="progress-indicator"
  style={ctx.indeterminate ? undefined : `width: ${ctx.percentage}%`}
  {...restProps}
></div>
