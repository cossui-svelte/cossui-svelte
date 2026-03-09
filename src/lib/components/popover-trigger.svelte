<script lang="ts">
  import type { Snippet } from "svelte";
  import { Popover } from "bits-ui";

  type Props = Popover.TriggerProps & { children?: Snippet };

  let { class: className, children, ...restProps }: Props = $props();
</script>

<Popover.Trigger class={className} data-slot="popover-trigger" {...restProps}>
  {@render children?.()}
</Popover.Trigger>
