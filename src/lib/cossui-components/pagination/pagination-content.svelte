<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/utils.js";

  interface Props extends HTMLAttributes<HTMLUListElement> {
    children?: Snippet;
  }

  let { class: className, children, ...restProps }: Props = $props();
</script>

<ul
  class={cn("flex flex-row items-center gap-1", className)}
  data-slot="pagination-content"
  {...restProps}
>
  {@render children?.()}
</ul>
