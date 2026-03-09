<script lang="ts">
  import type { Snippet } from "svelte";
  import { DropdownMenu } from "bits-ui";

  type Props = DropdownMenu.RootProps & { children?: Snippet };

  let { children, ...restProps }: Props = $props();
</script>

<DropdownMenu.Root {...restProps}>
  {@render children?.()}
</DropdownMenu.Root>
