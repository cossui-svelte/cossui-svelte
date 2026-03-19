<script lang="ts">
  import type { Snippet } from "svelte";
  import { Tooltip } from "bits-ui";

  type Props = Tooltip.TriggerProps & { children?: Snippet };

  let { children, ...restProps }: Props = $props();
</script>

<Tooltip.Trigger data-slot="tooltip-trigger" {...restProps}>
  {@render children?.()}
</Tooltip.Trigger>
