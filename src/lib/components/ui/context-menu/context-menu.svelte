<script lang="ts">
  import { ContextMenu } from "bits-ui";
  import type { Snippet } from "svelte";

  type Props = ContextMenu.RootProps & { children?: Snippet };

  let { children, ...restProps }: Props = $props();
</script>

<ContextMenu.Root {...restProps}>
  {@render children?.()}
</ContextMenu.Root>
