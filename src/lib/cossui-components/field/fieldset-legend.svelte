<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../utils.js";

  interface Props extends HTMLAttributes<HTMLLegendElement> {
    children?: Snippet;
  }

  let { class: className, children, ...restProps }: Props = $props();
</script>

<legend
  class={cn("font-semibold text-foreground", className)}
  data-slot="fieldset-legend"
  {...restProps}
>
  {@render children?.()}
</legend>
