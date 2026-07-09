<script lang="ts">
  import { Command } from "bits-ui";
  import type { Snippet } from "svelte";
  import { cn } from "$lib/utils";

  type Props = Command.RootProps & { children?: Snippet };

  let { class: className, children, ...restProps }: Props = $props();
</script>

<Command.Root
  class={cn("flex min-h-0 flex-col", className)}
  data-slot="command"
  {...restProps}
>
  {@render children?.()}
</Command.Root>
