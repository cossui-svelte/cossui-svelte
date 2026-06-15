<script lang="ts">
  import type { Snippet } from "svelte";
  import { ContextMenu } from "bits-ui";

  interface Props extends ContextMenu.RadioGroupProps {
    children?: Snippet;
  }

  let { children, ...restProps }: Props = $props();
</script>

<ContextMenu.RadioGroup data-slot="context-menu-radio-group" {...restProps}>
  {@render children?.()}
</ContextMenu.RadioGroup>
