<script lang="ts">
  import type { Snippet } from "svelte";
  import { DropdownMenu } from "bits-ui";
  import { cn } from "../utils.js";

  interface Props extends DropdownMenu.GroupHeadingProps {
    inset?: boolean;
    children?: Snippet;
  }

  let { class: className, inset, children, ...restProps }: Props = $props();
</script>

<DropdownMenu.GroupHeading
  class={cn(
    "px-2 py-1.5 font-medium text-muted-foreground text-xs",
    inset && "ps-9 sm:ps-8",
    className,
  )}
  data-slot="menu-label"
  {...restProps}
>
  {@render children?.()}
</DropdownMenu.GroupHeading>
