<script lang="ts">
  import type { Snippet } from "svelte";
  import { DropdownMenu } from "bits-ui";

  interface Props extends DropdownMenu.GroupProps {
    children?: Snippet;
  }

  let { children, ...restProps }: Props = $props();
</script>

<DropdownMenu.Group data-slot="menu-group" {...restProps}>
  {@render children?.()}
</DropdownMenu.Group>
