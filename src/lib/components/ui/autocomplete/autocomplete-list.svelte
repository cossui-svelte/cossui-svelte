<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/utils";

  interface Props extends HTMLAttributes<HTMLUListElement> {
    children?: Snippet;
  }

  let { class: className, children, ...restProps }: Props = $props();
</script>

<ul
  class={cn(
    "not-empty:scroll-py-1 not-empty:p-1 in-data-has-overflow-y:pe-3",
    className,
  )}
  data-slot="autocomplete-list"
  {...restProps}
>
  {@render children?.()}
</ul>
