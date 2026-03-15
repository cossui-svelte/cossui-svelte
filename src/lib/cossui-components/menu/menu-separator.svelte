<script lang="ts">
  import { DropdownMenu } from "bits-ui";
  import { cn } from "../../utils.js";

  type Props = DropdownMenu.SeparatorProps;

  let { class: className, ...restProps }: Props = $props();
</script>

<DropdownMenu.Separator
  class={cn("mx-2 my-1 h-px bg-border", className)}
  data-slot="menu-separator"
  {...restProps}
/>
