<script lang="ts">
  import type { Snippet } from "svelte";
  import { ContextMenu } from "bits-ui";

  interface Props extends ContextMenu.GroupProps {
    children?: Snippet;
  }

  let { children, ...restProps }: Props = $props();
</script>

<ContextMenu.Group data-slot="context-menu-group" {...restProps}>
  {@render children?.()}
</ContextMenu.Group>
