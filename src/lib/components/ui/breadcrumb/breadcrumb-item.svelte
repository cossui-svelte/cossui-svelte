<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/utils.js";

  interface Props extends HTMLAttributes<HTMLLIElement> {
    children?: Snippet;
  }

  let { class: className, children, ...restProps }: Props = $props();
</script>

<li
  class={cn("inline-flex items-center gap-1.5", className)}
  data-slot="breadcrumb-item"
  {...restProps}
>
  {@render children?.()}
</li>
