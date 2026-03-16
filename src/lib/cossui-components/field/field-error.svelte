<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/utils.js";

  interface Props extends HTMLAttributes<HTMLParagraphElement> {
    children?: Snippet;
  }

  let { class: className, children, ...restProps }: Props = $props();
</script>

<p
  class={cn("text-destructive-foreground text-xs", className)}
  data-slot="field-error"
  role="alert"
  {...restProps}
>
  {@render children?.()}
</p>
