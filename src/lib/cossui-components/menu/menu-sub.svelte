<script lang="ts">
  import type { Snippet } from "svelte";
  import { DropdownMenu } from "bits-ui";

  type Props = DropdownMenu.SubProps & { children?: Snippet };

  let { children, ...restProps }: Props = $props();
</script>

<DropdownMenu.Sub data-slot="menu-sub" {...restProps}>
  {@render children?.()}
</DropdownMenu.Sub>
