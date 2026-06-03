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
    "block h-1.5 w-full overflow-hidden rounded-full bg-input",
    className,
  )}
  data-slot="progress-track"
  {...restProps}
>
  {@render children?.()}
</div>
