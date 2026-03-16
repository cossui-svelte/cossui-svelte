<script lang="ts">
  import { Select } from "bits-ui";
  import { cn } from "$lib/utils.js";

  type Props = Select.SeparatorProps;

  let { class: className, ...restProps }: Props = $props();
</script>

<Select.Separator
  class={cn("mx-2 my-1 h-px bg-border", className)}
  data-slot="select-separator"
  {...restProps}
/>
