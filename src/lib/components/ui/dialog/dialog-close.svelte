<script lang="ts">
  import type { Snippet } from "svelte";
  import { Dialog } from "bits-ui";

  type Props = Dialog.CloseProps & { children?: Snippet };

  let { children, ...restProps }: Props = $props();
</script>

<Dialog.Close data-slot="dialog-close" {...restProps}>
  {@render children?.()}
</Dialog.Close>
