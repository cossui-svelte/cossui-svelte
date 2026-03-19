<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  interface Props extends HTMLAttributes<HTMLLIElement> {
    children?: Snippet;
  }

  let { children, ...restProps }: Props = $props();
</script>

<li data-slot="pagination-item" {...restProps}>
  {@render children?.()}
</li>
