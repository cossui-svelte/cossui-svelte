<script lang="ts">
  import { Separator } from "bits-ui";
  import { cn } from "$lib/utils";

  type Props = Separator.RootProps;

  let { class: className, ...restProps }: Props = $props();
</script>

<Separator.Root
  class={cn("mx-2 my-1 h-px bg-border last:hidden", className)}
  data-slot="combobox-separator"
  {...restProps}
/>
