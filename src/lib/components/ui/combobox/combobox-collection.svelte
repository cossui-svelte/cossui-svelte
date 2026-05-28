<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    children?: Snippet;
  }

  let { children, ...restProps }: Props = $props();
</script>

<div data-slot="combobox-collection" {...restProps}>
  {@render children?.()}
</div>
