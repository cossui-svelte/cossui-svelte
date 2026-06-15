<script lang="ts">
  import type { Snippet } from "svelte";
  import { ContextMenu } from "bits-ui";

  interface Props extends ContextMenu.TriggerProps {
    children?: Snippet;
  }

  let { children, class: className, ...restProps }: Props = $props();
</script>

<ContextMenu.Trigger class={className} data-slot="context-menu-trigger" {...restProps}>
  {@render children?.()}
</ContextMenu.Trigger>
