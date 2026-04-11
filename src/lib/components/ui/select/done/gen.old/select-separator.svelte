<script lang="ts">
  import { cn } from "$lib/utils.js";

  let { class: className, ...restProps }: { class?: string; [key: string]: unknown } = $props();
</script>

<div
  class={cn("mx-2 my-1 h-px bg-border", className)}
  data-slot="select-separator"
  role="separator"
  {...restProps}
></div>
