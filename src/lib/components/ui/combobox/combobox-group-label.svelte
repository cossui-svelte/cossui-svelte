<script lang="ts">
  import { Combobox } from "bits-ui";
  import type { Snippet } from "svelte";
  import { cn } from "$lib/utils";

  type Props = Combobox.GroupHeadingProps & { children?: Snippet };

  let { class: className, children, ...restProps }: Props = $props();
</script>

<Combobox.GroupHeading
  class={cn("px-2 py-1.5 font-medium text-muted-foreground text-xs", className)}
  data-slot="combobox-group-label"
  {...restProps}
>
  {@render children?.()}
</Combobox.GroupHeading>
