<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAnchorAttributes } from "svelte/elements";
  import { cn } from "../../utils.js";

  interface Props extends HTMLAnchorAttributes {
    children?: Snippet;
  }

  let { class: className, children, href, ...restProps }: Props = $props();
</script>

<a
  {href}
  class={cn("transition-colors hover:text-foreground", className)}
  data-slot="breadcrumb-link"
  {...restProps}
>
  {@render children?.()}
</a>
