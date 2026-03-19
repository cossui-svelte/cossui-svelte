<script lang="ts">
  import type { Snippet } from "svelte";
  import { Tooltip } from "bits-ui";

  type Props = Tooltip.RootProps & { children?: Snippet };

  let { children, ...restProps }: Props = $props();
</script>

<Tooltip.Root {...restProps}>
  {@render children?.()}
</Tooltip.Root>
