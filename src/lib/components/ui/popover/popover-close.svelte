<script lang="ts">
  import type { Snippet } from "svelte";
  import { Popover } from "bits-ui";

  type Props = Popover.CloseProps & { children?: Snippet };

  let { children, ...restProps }: Props = $props();
</script>

<Popover.Close data-slot="popover-close" {...restProps}>
  {@render children?.()}
</Popover.Close>
