<script lang="ts">
  import type { Snippet } from "svelte";
  import { Command } from "bits-ui";

  type Props = Command.RootProps & { children?: Snippet };

  let { children, ...restProps }: Props = $props();
</script>

<Command.Root data-slot="command" {...restProps}>
  {@render children?.()}
</Command.Root>
