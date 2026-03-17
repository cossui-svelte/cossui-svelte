<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/utils.js";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    children?: Snippet;
  }

  let { class: className, children, ...restProps }: Props = $props();
</script>

<div
  class={cn(
    "relative flex flex-col px-6 py-4 grid auto-rows-min grid-rows-[auto_auto] items-start gap-x-4 has-data-[slot=card-frame-action]:grid-cols-[1fr_auto]",
    className,
  )}
  data-slot="card-fram-header"
  {...restProps}
>
  {@render children?.()}
</div>
