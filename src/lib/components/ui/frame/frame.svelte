<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/utils";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    children?: Snippet;
  }

  let { class: className, children, ...restProps }: Props = $props();
</script>

<div
  class={cn(
    "relative flex flex-col rounded-2xl bg-muted/72 p-1",
    "*:[[data-slot=frame-panel]+[data-slot=frame-panel]]:mt-1",
    className,
  )}
  data-slot="frame"
  {...restProps}
>
  {@render children?.()}
</div>
