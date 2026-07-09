<script lang="ts">
  import type { ComponentProps } from "svelte";
  import { Separator } from "$lib/components/ui/separator";
  import { cn } from "$lib/utils";

  let {
    class: className,
    ...restProps
  }: ComponentProps<typeof Separator> = $props();
</script>

<Separator
  class={cn("mx-2 w-auto bg-sidebar-border", className)}
  data-sidebar="separator"
  data-slot="sidebar-separator"
  {...restProps}
/>
