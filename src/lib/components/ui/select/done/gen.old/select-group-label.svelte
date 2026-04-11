<script lang="ts">
  import type { Snippet } from "svelte";
  import { Select } from "bits-ui";
  import { cn } from "$lib/utils.js";

  type Props = Select.GroupHeadingProps & { children?: Snippet };

  let { class: className, children, ...restProps }: Props = $props();
</script>

<Select.GroupHeading
  class={cn("px-2 py-1.5 font-medium text-muted-foreground text-xs", className)}
  data-slot="select-group-label"
  {...restProps}
>
  {@render children?.()}
</Select.GroupHeading>
