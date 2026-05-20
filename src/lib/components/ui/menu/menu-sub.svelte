<script lang="ts">
  import type { Snippet } from "svelte";
  import { DropdownMenu } from "bits-ui";

  interface Props extends DropdownMenu.SubProps {
    children?: Snippet;
  }

  let { children, ...restProps }: Props = $props();
</script>

<DropdownMenu.Sub {...restProps}>
  {@render children?.()}
</DropdownMenu.Sub>
