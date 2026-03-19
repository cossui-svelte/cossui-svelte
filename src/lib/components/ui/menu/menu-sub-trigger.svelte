<script lang="ts">
  import type { Snippet } from "svelte";
  import { DropdownMenu } from "bits-ui";
  import { ChevronRight } from "lucide-svelte";
  import { cn } from "$lib/utils.js";

  interface Props extends DropdownMenu.SubTriggerProps {
    inset?: boolean;
    children?: Snippet;
  }

  let { class: className, inset, children, ...restProps }: Props = $props();
</script>

<DropdownMenu.SubTrigger
  class={cn(
    "[&>svg:not(:last-child)]:-mx-0.5 flex min-h-8 items-center gap-2 rounded-sm px-2 py-1 text-base text-foreground outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[state=open]:bg-accent data-[highlighted]:text-accent-foreground data-[state=open]:text-accent-foreground data-[disabled]:opacity-64 sm:min-h-7 sm:text-sm",
    inset && "ps-8",
    className,
  )}
  data-slot="menu-sub-trigger"
  {...restProps}
>
  {@render children?.()}
  <ChevronRight class="-me-0.5 ms-auto opacity-80" />
</DropdownMenu.SubTrigger>
