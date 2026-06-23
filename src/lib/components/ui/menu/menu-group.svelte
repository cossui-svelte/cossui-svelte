<script lang="ts">
  import { DropdownMenu } from "bits-ui";
  import type { Snippet } from "svelte";

  interface Props extends DropdownMenu.GroupProps {
    children?: Snippet;
  }

  let { children, ...restProps }: Props = $props();
</script>

<DropdownMenu.Group data-slot="menu-group" {...restProps}>
  {@render children?.()}
</DropdownMenu.Group>
