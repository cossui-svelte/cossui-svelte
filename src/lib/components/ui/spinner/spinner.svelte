<script lang="ts">
  import { LoaderCircle } from "lucide-svelte";
  import { cn } from "$lib/utils.js";

  let { class: className, ...restProps }: { class?: string } = $props();
</script>

<LoaderCircle
  aria-label="Loading"
  class={cn("animate-spin", className)}
  role="status"
  {...restProps}
/>
