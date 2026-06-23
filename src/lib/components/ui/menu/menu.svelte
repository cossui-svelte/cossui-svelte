<script lang="ts">
  import { DropdownMenu } from "bits-ui";
  import type { Snippet } from "svelte";

  type Props = DropdownMenu.RootProps & { children?: Snippet };

  let { children, ...restProps }: Props = $props();
</script>

<DropdownMenu.Root {...restProps}>
  {@render children?.()}
</DropdownMenu.Root>
