<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../utils.js";

  interface Props extends HTMLAttributes<HTMLSpanElement> {
    children?: Snippet;
  }

  let { class: className, children, ...restProps }: Props = $props();
</script>

<span
  aria-current="page"
  aria-disabled="true"
  class={cn("font-normal text-foreground", className)}
  data-slot="breadcrumb-page"
  role="link"
  {...restProps}
>
  {@render children?.()}
</span>
