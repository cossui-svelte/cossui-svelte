<script lang="ts">
  import type { Snippet } from "svelte";
  import { Popover } from "bits-ui";

  type Props = Popover.RootProps & { children?: Snippet };

  let { children, ...restProps }: Props = $props();
</script>

<Popover.Root {...restProps}>
  {@render children?.()}
</Popover.Root>
