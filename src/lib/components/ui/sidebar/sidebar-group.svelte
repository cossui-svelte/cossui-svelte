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
  class={cn("relative flex w-full min-w-0 flex-col p-2", className)}
  data-sidebar="group"
  data-slot="sidebar-group"
  {...restProps}
>
  {@render children?.()}
</div>
