<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "$lib/utils.js";

  interface Props {
    class?: string;
    children?: Snippet;
    [key: string]: unknown;
  }

  let { class: className, children, ...restProps }: Props = $props();
</script>

<div
  class={cn("font-semibold text-lg leading-none", className)}
  data-slot="popover-title"
  {...restProps}
>
  {@render children?.()}
</div>
