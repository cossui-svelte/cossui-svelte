<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/utils.js";

  interface Props extends HTMLAttributes<HTMLTableCaptionElement> {
    children?: Snippet;
  }

  let { class: className, children, ...restProps }: Props = $props();
</script>

<caption
  class={cn("mt-4 text-muted-foreground text-sm", className)}
  data-slot="table-caption"
  {...restProps}
>
  {@render children?.()}
</caption>
