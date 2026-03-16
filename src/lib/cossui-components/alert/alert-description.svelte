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
    "flex flex-col gap-2.5 text-muted-foreground [svg~&]:col-start-2",
    className,
  )}
  data-slot="alert-description"
  {...restProps}
>
  {@render children?.()}
</div>
