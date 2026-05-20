<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { getContext } from "svelte";
  import { cn } from "$lib/utils.js";
  import { PROGRESS_CONTEXT_KEY, type ProgressContext } from "./progress.svelte";

  type Props = HTMLAttributes<HTMLSpanElement>;

  let { class: className, ...restProps }: Props = $props();

  const ctx = getContext<ProgressContext>(PROGRESS_CONTEXT_KEY);
</script>

<span
  class={cn("text-foreground text-sm tabular-nums", className)}
  data-slot="progress-value"
  {...restProps}
>
  {#if ctx.indeterminate}
    &mdash;
  {:else}
    {Math.round(ctx.percentage)}%
  {/if}
</span>
