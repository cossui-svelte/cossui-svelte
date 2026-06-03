<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/utils";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    children?: Snippet;
  }

  let { class: className, children, ...restProps }: Props = $props();
</script>

<div
  class={cn(
    "not-empty:p-2 text-center text-base text-muted-foreground sm:text-sm",
    className,
  )}
  data-slot="autocomplete-empty"
  {...restProps}
>
  {@render children?.()}
</div>
