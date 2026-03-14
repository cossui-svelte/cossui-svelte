<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../utils.js";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    children?: Snippet;
  }

  let { class: className, children, ...restProps }: Props = $props();
</script>

<div
  class={cn(
    "flex items-center p-6 in-[[data-slot=card]:has(>[data-slot=card-panel])]:pt-4",
    className,
  )}
  data-slot="card-footer"
  {...restProps}
>
  {@render children?.()}
</div>
