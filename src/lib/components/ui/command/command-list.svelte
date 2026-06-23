<script lang="ts">
  import { Command } from "bits-ui";
  import type { Snippet } from "svelte";
  import { cn } from "$lib/utils";

  type Props = Command.ListProps & { children?: Snippet };

  let { class: className, children, ...restProps }: Props = $props();
</script>

<Command.List
  class={cn("not-empty:scroll-py-2 not-empty:p-2", className)}
  data-slot="command-list"
  {...restProps}
>
  <Command.Viewport>
    {@render children?.()}
  </Command.Viewport>
</Command.List>
