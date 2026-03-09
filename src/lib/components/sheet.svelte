<script lang="ts">
  import type { Snippet } from "svelte";
  import { Dialog } from "bits-ui";

  type Props = Dialog.RootProps & { children?: Snippet };

  let { children, ...restProps }: Props = $props();
</script>

<Dialog.Root {...restProps}>
  {@render children?.()}
</Dialog.Root>
