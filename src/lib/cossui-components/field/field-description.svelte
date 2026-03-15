<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../utils.js";

  interface Props extends HTMLAttributes<HTMLParagraphElement> {
    children?: Snippet;
  }

  let { class: className, children, ...restProps }: Props = $props();
</script>

<p
  class={cn("text-muted-foreground text-xs", className)}
  data-slot="field-description"
  {...restProps}
>
  {@render children?.()}
</p>
