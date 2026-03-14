<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../utils.js";

  interface Props extends HTMLAttributes<HTMLTableSectionElement> {
    children?: Snippet;
  }

  let { class: className, children, ...restProps }: Props = $props();
</script>

<thead
  class={cn("[&_tr]:border-b", className)}
  data-slot="table-header"
  {...restProps}
>
  {@render children?.()}
</thead>
