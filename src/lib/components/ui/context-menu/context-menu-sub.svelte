<script lang="ts">
  import { ContextMenu } from "bits-ui";
  import type { Snippet } from "svelte";

  interface Props extends ContextMenu.SubProps {
    children?: Snippet;
  }

  let { children, ...restProps }: Props = $props();
</script>

<ContextMenu.Sub {...restProps}>
  {@render children?.()}
</ContextMenu.Sub>
