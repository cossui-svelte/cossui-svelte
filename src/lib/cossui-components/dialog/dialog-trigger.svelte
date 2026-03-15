<script lang="ts">
  import type { Snippet } from "svelte";
  import { Dialog } from "bits-ui";

  type Props = Dialog.TriggerProps & { children?: Snippet };

  let { children, ...restProps }: Props = $props();
</script>

<Dialog.Trigger data-slot="dialog-trigger" {...restProps}>
  {@render children?.()}
</Dialog.Trigger>
