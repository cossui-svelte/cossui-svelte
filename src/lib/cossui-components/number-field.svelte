<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../utils.js";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    size?: "sm" | "default" | "lg";
    children?: Snippet;
  }

  let { class: className, size = "default", children, ...restProps }: Props = $props();
</script>

<div
  class={cn("flex w-full flex-col items-start gap-2", className)}
  data-size={size}
  data-slot="number-field"
  {...restProps}
>
  {@render children?.()}
</div>
