<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/utils.js";

  interface Props extends HTMLAttributes<HTMLDivElement> {}

  let { class: className, ...restProps }: Props = $props();
</script>

<div
  class={cn(
    "animate-skeleton rounded-sm [--skeleton-highlight:--alpha(var(--color-white)/64%)] [background:linear-gradient(120deg,transparent_40%,var(--skeleton-highlight),transparent_60%)_var(--color-muted)_0_0/200%_100%_fixed] dark:[--skeleton-highlight:--alpha(var(--color-white)/4%)]",
    className,
  )}
  data-slot="skeleton"
  {...restProps}
></div>
