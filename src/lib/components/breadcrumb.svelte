<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  interface Props extends HTMLAttributes<HTMLElement> {
    children?: Snippet;
  }

  let { children, ...restProps }: Props = $props();
</script>

<nav aria-label="breadcrumb" data-slot="breadcrumb" {...restProps}>
  {@render children?.()}
</nav>
