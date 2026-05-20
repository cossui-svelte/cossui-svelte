<script lang="ts">
  import { Command } from "bits-ui";
  import { cn } from "$lib/utils.js";

  type Props = Command.SeparatorProps;

  let { class: className, ...restProps }: Props = $props();
</script>

<Command.Separator
  class={cn("my-2 h-px bg-border", className)}
  data-slot="command-separator"
  {...restProps}
/>
