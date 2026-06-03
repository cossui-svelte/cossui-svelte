<script lang="ts">
  import type { Snippet } from "svelte";
  import { DropdownMenu } from "bits-ui";
  import { cn } from "$lib/utils";

  interface Props extends DropdownMenu.GroupHeadingProps {
    children?: Snippet;
    inset?: boolean;
  }

  let { children, class: className, inset, ...restProps }: Props = $props();
</script>

<DropdownMenu.GroupHeading
  class={cn(
    "px-2 py-1.5 font-medium text-muted-foreground text-xs data-inset:ps-9 sm:data-inset:ps-8",
    className,
  )}
  data-inset={inset}
  data-slot="menu-label"
  {...restProps}
>
  {@render children?.()}
</DropdownMenu.GroupHeading>
