<script lang="ts">
  import { ContextMenu } from "bits-ui";
  import type { Snippet } from "svelte";

  interface Props extends ContextMenu.RadioGroupProps {
    children?: Snippet;
  }

  let { children, value = $bindable(undefined), ...restProps }: Props = $props();
</script>

<ContextMenu.RadioGroup bind:value data-slot="context-menu-radio-group" {...restProps}>
  {@render children?.()}
</ContextMenu.RadioGroup>
