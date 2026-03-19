<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/utils.js";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    children?: Snippet;
  }

  let { class: className, children, ...restProps }: Props = $props();
</script>

<div
  class={cn(
    "col-start-2 row-span-2 row-start-1 self-center justify-self-end inline-flex",
    className,
  )}
  data-slot="card-frame-action"
  {...restProps}
>
  {@render children?.()}
</div>
