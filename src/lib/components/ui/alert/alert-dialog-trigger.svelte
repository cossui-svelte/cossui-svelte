<script lang="ts">
  import type { Snippet } from "svelte";
  import { AlertDialog } from "bits-ui";

  type Props = AlertDialog.TriggerProps & { children?: Snippet };

  let { children, ...restProps }: Props = $props();
</script>

<AlertDialog.Trigger data-slot="alert-dialog-trigger" {...restProps}>
  {@render children?.()}
</AlertDialog.Trigger>
