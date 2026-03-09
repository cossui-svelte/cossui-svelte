<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLLabelAttributes } from "svelte/elements";
  import { cn } from "../utils.js";

  interface Props extends HTMLLabelAttributes {
    children?: Snippet;
  }

  let { class: className, children, ...restProps }: Props = $props();
</script>

<label
  class={cn(
    "inline-flex items-center gap-2 text-base/4.5 sm:text-sm/4 font-medium text-foreground",
    className,
  )}
  data-slot="label"
  {...restProps}
>
  {@render children?.()}
</label>
