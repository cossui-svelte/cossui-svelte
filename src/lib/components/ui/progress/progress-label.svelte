<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/utils";

  interface Props extends HTMLAttributes<HTMLSpanElement> {
    children?: Snippet;
  }

  let { class: className, children, ...restProps }: Props = $props();
</script>

<span
  class={cn("font-medium text-foreground text-sm", className)}
  data-slot="progress-label"
  {...restProps}
>
  {@render children?.()}
</span>
