<script lang="ts">
  import { Popover } from "bits-ui";
  import type { Snippet } from "svelte";

  type Props = Popover.RootProps & { children?: Snippet };

  let { children, ...restProps }: Props = $props();
</script>

<Popover.Root {...restProps}>
  {@render children?.()}
</Popover.Root>
