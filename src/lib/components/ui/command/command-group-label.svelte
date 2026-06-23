<script lang="ts">
  import { Command } from "bits-ui";
  import type { Snippet } from "svelte";
  import { cn } from "$lib/utils";

  type Props = Command.GroupHeadingProps & { children?: Snippet };

  let { class: className, children, ...restProps }: Props = $props();
</script>

<Command.GroupHeading
  class={cn("px-2 py-1.5 font-medium text-muted-foreground text-xs", className)}
  data-slot="command-group-label"
  {...restProps}
>
  {@render children?.()}
</Command.GroupHeading>
