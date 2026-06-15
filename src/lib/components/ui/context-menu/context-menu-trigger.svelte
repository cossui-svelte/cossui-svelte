<script lang="ts">
  import { ContextMenu } from "bits-ui";

  let { ref = $bindable(null), ...restProps }: ContextMenu.TriggerProps = $props();
</script>

<ContextMenu.Trigger bind:ref data-slot="context-menu-trigger" {...restProps} />
