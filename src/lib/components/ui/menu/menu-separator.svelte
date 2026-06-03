<script lang="ts">
  import { DropdownMenu } from "bits-ui";
  import { cn } from "$lib/utils";

  let { class: className, ...restProps }: DropdownMenu.SeparatorProps =
    $props();
</script>

<DropdownMenu.Separator
  class={cn("mx-2 my-1 h-px bg-border", className)}
  data-slot="menu-separator"
  {...restProps}
/>
