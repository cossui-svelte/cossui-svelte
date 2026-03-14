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
    "flex w-full min-w-0 max-w-sm flex-col items-center gap-4 text-balance text-sm",
    className,
  )}
  data-slot="empty-content"
  {...restProps}
>
  {@render children?.()}
</div>
