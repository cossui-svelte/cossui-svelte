<script lang="ts">
  import type { Snippet } from "svelte";
  import { ContextMenu } from "bits-ui";

  interface Props extends ContextMenu.SubProps {
    children?: Snippet;
  }

  let { children, ...restProps }: Props = $props();
</script>

<ContextMenu.Sub {...restProps}>
  {@render children?.()}
</ContextMenu.Sub>
