<script lang="ts">
  import { ContextMenu } from "bits-ui";
  import type { Snippet } from "svelte";

  interface Props extends ContextMenu.GroupProps {
    children?: Snippet;
  }

  let { children, ...restProps }: Props = $props();
</script>

<ContextMenu.Group data-slot="context-menu-group" {...restProps}>
  {@render children?.()}
</ContextMenu.Group>
