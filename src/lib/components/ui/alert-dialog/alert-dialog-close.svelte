<script lang="ts">
  import type { Snippet } from "svelte";
  import { AlertDialog } from "bits-ui";

  type Props = AlertDialog.CancelProps & { children?: Snippet };

  let { children, ...restProps }: Props = $props();
</script>

<AlertDialog.Cancel data-slot="alert-dialog-close" {...restProps}>
  {@render children?.()}
</AlertDialog.Cancel>
