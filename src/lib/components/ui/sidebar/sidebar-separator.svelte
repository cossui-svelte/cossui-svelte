<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { Separator } from "$lib/components/ui/separator";
  import { cn } from "$lib/utils";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    orientation?: "horizontal" | "vertical";
    decorative?: boolean;
  }

  let { class: className, ...restProps }: Props = $props();
</script>

<Separator
  class={cn("mx-2 w-auto bg-sidebar-border", className)}
  data-sidebar="separator"
  data-slot="sidebar-separator"
  {...restProps}
/>
