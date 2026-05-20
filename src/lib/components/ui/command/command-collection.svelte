<script lang="ts">
  import type { Snippet } from "svelte";
  import { Command } from "bits-ui";

  type Props = Command.GroupItemsProps & { children?: Snippet };

  let { children, ...restProps }: Props = $props();
</script>

<Command.GroupItems data-slot="command-collection" {...restProps}>
  {@render children?.()}
</Command.GroupItems>
