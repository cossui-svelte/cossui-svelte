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
  class={cn("font-semibold text-lg leading-none", className)}
  data-slot="card-title"
  {...restProps}
>
  {@render children?.()}
</div>
