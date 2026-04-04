<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/utils.js";

  let { class: className, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div
  class={cn("mx-2 my-1 h-px bg-border", className)}
  data-slot="drawer-menu-separator"
  {...restProps}
/>
