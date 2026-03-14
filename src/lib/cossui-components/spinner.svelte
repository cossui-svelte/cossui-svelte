<script lang="ts">
  import { Loader2 } from "lucide-svelte";
  import type { ComponentProps } from "svelte";
  import { cn } from "../utils.js";

  interface Props extends ComponentProps<typeof Loader2> {}

  let { class: className, ...restProps }: Props = $props();
</script>

<Loader2
  aria-label="Loading"
  class={cn("animate-spin", className)}
  role="status"
  {...restProps}
/>
