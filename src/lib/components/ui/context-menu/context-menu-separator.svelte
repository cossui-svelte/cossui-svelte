<script lang="ts">
  import { ContextMenu } from "bits-ui";
  import { cn } from "$lib/utils";

  let { class: className, ...restProps }: ContextMenu.SeparatorProps = $props();
</script>

<ContextMenu.Separator
  class={cn("mx-2 my-1 h-px bg-border", className)}
  data-slot="context-menu-separator"
  {...restProps}
/>
