<script lang="ts">
  import { Popover } from "bits-ui";
  import type { Snippet } from "svelte";

  type Props = Popover.TriggerProps & { children?: Snippet };

  let { class: className, children, ...restProps }: Props = $props();
</script>

<Popover.Trigger class={className} data-slot="popover-trigger" {...restProps}>
  {@render children?.()}
</Popover.Trigger>
