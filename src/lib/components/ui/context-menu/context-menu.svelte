<script lang="ts">
  import type { Snippet } from "svelte";
  import { ContextMenu } from "bits-ui";

  type Props = ContextMenu.RootProps & { children?: Snippet };

  let { children, ...restProps }: Props = $props();
</script>

<ContextMenu.Root {...restProps}>
  {@render children?.()}
</ContextMenu.Root>
